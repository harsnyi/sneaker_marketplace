import {motion} from 'framer-motion';
import { useState, useEffect } from 'react';

import {useAxiosPrivate} from '../../hooks/useAxiosPrivate';
import {useToast} from '../../hooks/useToast';

import Button from '../form/Button';
import Modal from '../../component/Modal';

import {MdAddCircle, MdAddCircleOutline, MdDelete, MdDeleteOutline} from 'react-icons/md';
import {AiFillEdit, AiOutlineEdit} from 'react-icons/ai';
import {FaCheck} from 'react-icons/fa';
import {TbCircleOff} from 'react-icons/tb';

const BsAddressForm = ({ formData, setFormData, toggleForm }) => {
  const [addresses, setAddresses] = useState([]);
  const [loading, setLoading] = useState(false);

  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isModifyOpen, setIsModifyOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState(null);

  const axiosPrivate = useAxiosPrivate();
  const {addToast} = useToast();

  useEffect(() => { 

    const fetchAddresses = async () => {
      await axiosPrivate.get('/api/v1/get_addresses')
        .then((response) => { 
          setAddresses(response.data.message);
        })
        .catch((error) => { 
          addToast('error', error.response.data.message);
        });
    };

    fetchAddresses();

  }, []);

  const openModifyAddress = (e, index) => {
    e.preventDefault();
    e.stopPropagation();
    setIsModifyOpen(true);
    setSelectedAddress(addresses[index]);
  };

  const handleModifyAddress = async (e) => {
    e.preventDefault();

    console.log('Modifying address...', selectedAddress);

    setIsModifyOpen(false);
  };

  const openDeleteAddress = (e, index) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDeleteOpen(true);
    setSelectedAddress(addresses[index]);
  };

  const handleDeleteAddress = async (e) => {
    e.preventDefault();

    if (!selectedAddress) return;

    //TODO: if (selectedAddress.default) return;

    setLoading(true);
    await axiosPrivate.delete(`/api/v1/delete_address/${selectedAddress.id}`)
      .then((response) => { 
        addToast('success', response.data.message);
        setAddresses((prev) => prev.filter((address) => address.id !== selectedAddress.id));
        setSelectedAddress(null);
      })
      .catch((error) => { 
        addToast('error', error.response.data.message);
      });

    setIsDeleteOpen(false);
  };

  return (
    <>
      <Modal isOpen={isAddOpen} close={() => setIsAddOpen(false)}>
        <h1 className="modal_title">
          <MdAddCircle />
          Új cím hozzáadása
        </h1>
      </Modal>

      {selectedAddress && (
        <Modal isOpen={isModifyOpen} close={() => setIsModifyOpen(false)}>
          <h1 className="modal_title">
            <AiFillEdit />
            A(z) '{selectedAddress.name}' cím szerkesztése
          </h1>
        </Modal>
      )}

      {selectedAddress && (
        <Modal isOpen={isDeleteOpen} close={() => setIsDeleteOpen(false)}>
          <h1 className="modal_title">
            <MdDelete className="icon_red" /> Biztosan törölni szeretnéd a(z) '{selectedAddress.name}' címet?
          </h1>
          <div className="modal_content">
            <p>A cím törlése véglegesen eltávolítja azt a lakcímeid közül. Ez a művelet nem vonható vissza.</p>
          </div>
          <div className="modal_actions">
            <Button className="secondary" text="Mégsem" onClick={() => setIsDeleteOpen(false)}>
              <TbCircleOff />
            </Button>
            <Button className="primary red" text="Törlés" loading={loading} onClick={(e) => handleDeleteAddress(e)}>
              <MdDeleteOutline />
            </Button>
          </div>
        </Modal>
      )}

      <motion.div initial={{x: '100%'}} animate={{x: '0'}} exit={{x: '100%'}} transition={{duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94]}} className="settings_edit_wrapper">
        <div className="form_box">
          <p className="link" onClick={toggleForm}>
            Mégsem
          </p>
          <h1 className="page_title">Címek kezelése</h1>
          <p className="page_desc">Itt kezelheted a címeidet és adhatsz hozzá újakat.</p>
          <div className="address_grid">
            <div className="address_box">
              <article className="add" onClick={() => setIsAddOpen(true)}>
                <MdAddCircleOutline />
                <h4>Új hozzáadása</h4>
              </article>
            </div>

            {addresses
              .sort((_, b) => (b.default ? 1 : -1))
              .map((address, index) => {
                return (
                  <article key={index} className="address">
                    <Button className="secondary delete" onClick={(e) => openDeleteAddress(e, index)}>
                      <MdDeleteOutline />
                    </Button>
                    <h5>Lakcím</h5>
                    <h4 className="overflow_ellipsis">{address.name}</h4>
                    <div>
                      <p className="overflow_ellipsis">{address.street}</p>
                      <p className="overflow_ellipsis">{address.zip}</p>
                      <p className="overflow_ellipsis">{address.city}</p>
                      <p className="overflow_ellipsis">{address.country}</p>
                    </div>
                    {address.default && (
                      <span className="default_address">
                        <FaCheck />
                        Alapértelmezett cím
                      </span>
                    )}
                    <Button className="secondary dark" text="Szerkesztés" onClick={(e) => openModifyAddress(e, index)}>
                      <AiOutlineEdit />
                    </Button>
                  </article>
                );
              })}
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default BsAddressForm;
