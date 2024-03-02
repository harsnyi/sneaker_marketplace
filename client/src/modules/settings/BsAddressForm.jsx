import {motion} from 'framer-motion';
import {useState, useEffect} from 'react';

import {useAxiosPrivate} from '../../hooks/useAxiosPrivate';
import {useToast} from '../../hooks/useToast';

import Button from '../form/Button';
import Input from '../form/Input';
import Modal from '../../component/Modal';

import {MdAddCircle, MdAddCircleOutline, MdDelete, MdDeleteOutline} from 'react-icons/md';
import {AiFillEdit, AiOutlineEdit} from 'react-icons/ai';
import {FaCheck} from 'react-icons/fa';
import {TbCircleOff} from 'react-icons/tb';

const AddForm = ({toggleAddForm}) => {
  const [addAddressData, setAddAddressData] = useState({
    name: '',
    country: '',
    city: '',
    zip: '',
    street: '',
  });

  const [errors, setErrors] = useState({
    name: '',
    country: '',
    city: '',
    zip: '',
    street: '',
  });

  const [loading, setLoading] = useState(false);

  const axiosPrivate = useAxiosPrivate();
  const {addToast} = useToast();

  const handleAddAddress = async (e) => {
    e.preventDefault();

    if (loading) return;

    setErrors({
      name: '',
      country: '',
      city: '',
      zip: '',
      street: '',
    });

    const inputFields = {
      name: addAddressData.name,
      country: addAddressData.country,
      city: addAddressData.city,
      zip: addAddressData.zip,
    };

    // Check for empty inputs
    const emptyInputs = Object.keys(inputFields).filter((key) => inputFields[key] === '');

    if (emptyInputs.length > 0) {
      emptyInputs.forEach((input) => {
        setErrors((prevErrors) => ({
          ...prevErrors,
          [input]: 'A mező kitöltése kötelező.',
        }));
      });

      addToast('error', 'Kérjük töltsd ki a csillaggal jelölt mezőket!');
      return;
    }

    if (Object.values(errors).some((x) => x !== '')) {
      addToast('error', 'Kérjük javítsd a hibás mezőket!');
      return;
    }
  };

  return (
    <>
      <h1 className="modal_title">
        <MdAddCircle className="icon_green" />
        Új cím hozzáadása
      </h1>
      <div className="modal_content">
        <form onSubmit={handleAddAddress}>
          <Input
            type="text"
            value={addAddressData.name}
            label="Név *"
            onChange={(value) => {
              setAddAddressData((prev) => ({...prev, name: value}));
            }}
            className="input_field"
            autoFocus
            error={errors.name}
            success={addAddressData.name && !errors.name}
          />
          <Input
            type="text"
            value={addAddressData.country}
            label="Ország *"
            onChange={(value) => {
              setAddAddressData((prev) => ({...prev, country: value}));
            }}
            className="input_field"
            error={errors.country}
            success={addAddressData.country && !errors.country}
          />
          <div className="field_wrapper">
            <Input
              type="text"
              value={addAddressData.city}
              label="Város * "
              onChange={(value) => {
                setAddAddressData((prev) => ({...prev, city: value}));
              }}
              className="input_field"
              error={errors.city}
              success={addAddressData.city && !errors.city}
            />
            <Input
              type="text"
              value={addAddressData.zip}
              label="Irányítószám * "
              onChange={(value) => {
                setAddAddressData((prev) => ({...prev, zip: value}));
              }}
              className="input_field"
              error={errors.zip}
              success={addAddressData.zip && !errors.zip}
            />
          </div>
          <Input
            type="text"
            value={addAddressData.street}
            label="Utca, házszám"
            onChange={(value) => {
              setAddAddressData((prev) => ({...prev, street: value}));
            }}
            className="input_field"
            error={errors.street}
            success={addAddressData.street && !errors.street}
          />
        </form>
      </div>
      <div className="modal_actions">
        <Button className="secondary" text="Mégsem" onClick={toggleAddForm}>
          <TbCircleOff />
        </Button>
        <Button className="primary green" text="Hozzáadás" loading={loading} onClick={handleAddAddress}>
          <MdAddCircleOutline />
        </Button>
      </div>
    </>
  );
};

const ModifyForm = ({selectedAddress, setSelectedAddress, setAddresses, toggleModifyForm}) => {
  const [modifyAddressData, setModifyAddressData] = useState({
    name: selectedAddress.name,
    country: selectedAddress.country,
    city: selectedAddress.city,
    zip: selectedAddress.zip,
    street: selectedAddress.street,
    // default: selectedAddress.default,
  });

  const [errors, setErrors] = useState({
    name: '',
    country: '',
    city: '',
    zip: '',
    street: '',
  });

  const [loading, setLoading] = useState(false);

  const axiosPrivate = useAxiosPrivate();
  const {addToast} = useToast();

  const handleModifyAddress = async (e) => {
    e.preventDefault();

    console.log('Modifying address...', selectedAddress);

    toggleModifyForm();
  };

  return (
    <>
      <h1 className="modal_title">
        <AiFillEdit />
        A(z) '{selectedAddress.name}' cím szerkesztése
      </h1>
      <div className="modal_content"></div>
      <div className="modal_actions">
        <Button className="secondary" text="Mégsem" onClick={toggleModifyForm}>
          <TbCircleOff />
        </Button>
        <Button className="primary" text="Módosítás" loading={loading} onClick={(e) => handleModifyAddress(e)}>
          <AiOutlineEdit />
        </Button>
      </div>
    </>
  );
};

const DeleteForm = ({selectedAddress, setSelectedAddress, setAddresses, toggleDeleteForm}) => {
  const [loading, setLoading] = useState(false);

  const axiosPrivate = useAxiosPrivate();
  const {addToast} = useToast();

  const handleDeleteAddress = async (e) => {
    e.preventDefault();

    if (!selectedAddress) return;

    //TODO: if (selectedAddress.default) return;

    setLoading(true);
    await axiosPrivate
      .delete(`/api/v1/delete_address/${selectedAddress.id}`)
      .then((response) => {
        addToast('success', response.data.message);
        setAddresses((prev) => prev.filter((address) => address.id !== selectedAddress.id));
        setSelectedAddress(null);
      })
      .catch((error) => {
        addToast('error', error.response.data.message);
      });

    toggleDeleteForm();
  };

  return (
    <>
      <h1 className="modal_title">
        <MdDelete className="icon_red" /> Biztosan törölni szeretnéd a(z) '{selectedAddress.name}' címet?
      </h1>
      <div className="modal_content">
        <p>A cím törlése véglegesen eltávolítja azt a lakcímeid közül. Ez a művelet nem vonható vissza.</p>
      </div>
      <div className="modal_actions">
        <Button className="secondary" text="Mégsem" onClick={toggleDeleteForm}>
          <TbCircleOff />
        </Button>
        <Button className="primary red" text="Törlés" loading={loading} onClick={(e) => handleDeleteAddress(e)}>
          <MdDeleteOutline />
        </Button>
      </div>
    </>
  );
};

const BsAddressForm = ({formData, setFormData, toggleForm}) => {
  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);

  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isModifyOpen, setIsModifyOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const axiosPrivate = useAxiosPrivate();
  const {addToast} = useToast();

  useEffect(() => {
    const fetchAddresses = async () => {
      await axiosPrivate
        .get('/api/v1/get_addresses')
        .then((response) => {
          setAddresses(response.data.message);
        })
        .catch((error) => {
          addToast('error', error.response.data.message);
        });
    };

    fetchAddresses();
  }, []);

  const toggleAddForm = () => {
    setIsAddOpen(!isAddOpen);
  };

  const toggleModifyForm = () => {
    setIsModifyOpen(!isModifyOpen);
  };

  const toggleDeleteForm = () => {
    setIsDeleteOpen(!isDeleteOpen);
  };

  const openModifyAddress = (e, index) => {
    e.preventDefault();
    toggleModifyForm();
    setSelectedAddress(addresses[index]);
  };

  const openDeleteAddress = (e, index) => {
    e.preventDefault();
    toggleDeleteForm();
    setSelectedAddress(addresses[index]);
  };

  return (
    <>
      <Modal isOpen={isAddOpen} close={toggleAddForm}>
        <AddForm toggleAddForm={toggleAddForm} />
      </Modal>

      {selectedAddress && (
        <Modal isOpen={isModifyOpen} close={toggleModifyForm}>
          <ModifyForm toggleModifyForm={toggleModifyForm} selectedAddress={selectedAddress} setAddresses={setAddresses} setSelectedAddress={setSelectedAddress} />
        </Modal>
      )}

      {selectedAddress && (
        <Modal isOpen={isDeleteOpen} close={toggleDeleteForm}>
          <DeleteForm selectedAddress={selectedAddress} setSelectedAddress={setSelectedAddress} setAddresses={setAddresses} toggleDeleteForm={toggleDeleteForm} />
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
              <article className="add" onClick={toggleAddForm}>
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
