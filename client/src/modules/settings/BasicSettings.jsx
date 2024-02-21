import {useEffect, useState} from 'react';
import {useAxiosPrivate} from '../../hooks/useAxiosPrivate';
import {useToast} from '../../hooks/useToast';
import {motion} from 'framer-motion';

import BsProfilePicForm from './BsProfilePicForm';
import BsUserForm from './BsUserForm';
import BsAddressForm from './BsAddressForm';

import Button from '../../component/Button';
import Spinner from '../../component/Spinner';
//import Modal from '../../component/Modal';

import {IoSettings} from 'react-icons/io5';
import {AiOutlineEdit} from 'react-icons/ai';

const InfoBox = ({label, value}) => (
  <div className="info_box">
    <span className="info_label">{label}</span>
    <span className="info_value">{value}</span>
  </div>
);

const InfoRow = ({data, span}) => (
  <div className={`info_row ${span ? 'full_row' : ''}`}>
    {data.map((item, index) => (
      <InfoBox key={index} label={item.label} value={item.value} />
    ))}
  </div>
);

const SettingsBox = ({title, edit, data}) => (
  <article className="settings_box">
    <h3>{title}</h3>
    <Button className="secondary" onClick={edit}>
      <AiOutlineEdit />
    </Button>

    <div className="user_info">
      {data.map((row, index) => (
        <InfoRow key={index} data={row} span={row[0].span} />
      ))}
    </div>
  </article>
);

const INITIAL_DATA = {
  username: '',
  firstname: '',
  lastname: '',
  bio: '',
  phoneNumber: '',
  address: '',
};

const BasicSettings = () => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState(INITIAL_DATA);
  const [initialLoad, setInitialLoad] = useState(true);

  const [isBsProfilePicFormOpen, setIsBsProfilePicFormOpen] = useState(false);
  const [isBsUserFormOpen, setIsBsUserFormOpen] = useState(false);
  const [isBsAddressFormOpen, setIsBsAddressFormOpen] = useState(false);

  const axiosPrivate = useAxiosPrivate();
  const {addToast} = useToast();

  useEffect(() => {
    setInitialLoad(false);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      await axiosPrivate
        .get(`/api/v1/get_user_data`)
        .then((response) => {
          setFormData({
            username: response.data.username,
            firstname: response.data.first_name,
            lastname: response.data.last_name,
            bio: response.data.bio,
            phoneNumber: response.data.phone_number,
            address: response.data.location,
          });
        })
        .catch((error) => {
          addToast('error', error.message);
        })
        .finally(() => {
          setLoading(false);
        });
    };

    /*
    if (!isFormOpen) {
      fetchData();

      [isFormOpen]
    }
    */

    fetchData();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const toggleBsProfilePicForm = () => {
    setIsBsProfilePicFormOpen(!isBsProfilePicFormOpen);
  };

  const toggleBsUserForm = () => {
    setIsBsUserFormOpen(!isBsUserFormOpen);
  };

  const toggleBsAddressForm = () => {
    setIsBsAddressFormOpen(!isBsAddressFormOpen);
  };

  return (
    <>
      {!isBsProfilePicFormOpen && !isBsUserFormOpen && !isBsAddressFormOpen ? (
        <motion.div initial={initialLoad ? false : {x: isBsProfilePicFormOpen || isBsUserFormOpen || isBsAddressFormOpen ? '100%' : '-100%'}} animate={{x: '0'}} exit={{x: isBsProfilePicFormOpen || isBsUserFormOpen || isBsAddressFormOpen ? '-100%' : '100%'}} transition={{duration: 0.2, ease: [0.25, 0.46, 0.45, 0.94]}} className="settings_wrapper">
          <h1 className="page_title">
            <IoSettings /> Személyes adatok
          </h1>
          <p className="page_desc">Ezen az oldalon módosíthatod a profiloddal kapcsolatos információkat és a személyes adataidat is.</p>

          {loading ? (
            <Spinner />
          ) : (
            <>
              <article className="settings_box image_box">
                <Button className="secondary" onClick={toggleBsProfilePicForm}>
                  <AiOutlineEdit />
                </Button>
                <img src="https://via.placeholder.com/150" alt="Profilkép" />
                <div>
                  <span className="image_box_name">tesztelek</span>
                  <span className="image_box_rank">Contributor</span>
                  <span className="image_box_address">Szentes, Magyarország</span>
                </div>
              </article>

              {/*
            <Modal isOpen={isFormOpen} close={toggleForm} title="Adatok szerkesztése">
              <BsUserForm formData={formData} setFormData={setFormData} />
              </Modal>
               */}
              <SettingsBox
                title="Adatok"
                edit={toggleBsUserForm}
                data={[
                  [
                    {label: 'Vezetéknév', value: formData.lastname || 'Nincs megadva'},
                    {label: 'Keresztnév', value: formData.firstname || 'Nincs megadva'},
                  ],
                  [
                    {label: 'Felhasználónév', value: formData.username || 'Nincs megadva'},
                    {label: 'Telefonszám', value: formData.phoneNumber || 'Nincs megadva'},
                  ],
                  [{label: 'Bemutatkozás', value: formData.bio || 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maxime, aliquam?', span: true}],
                ]}
              />

              <SettingsBox
                title="Cím"
                edit={toggleBsAddressForm}
                data={[
                  [
                    {label: 'Ország', value: 'Magyarország'},
                    {label: 'Város', value: 'Szentes'},
                  ],
                  [
                    {label: 'Irányítószám', value: '6600'},
                    {label: 'Utca, házszám', value: 'Dózsa Gy. u 168.'},
                  ],
                ]}
              />
            </>
          )}
        </motion.div>
      ) : null}

      {isBsProfilePicFormOpen ? <BsProfilePicForm formData={formData} setFormData={setFormData} toggleForm={toggleBsProfilePicForm} /> : null}
      {isBsUserFormOpen ? <BsUserForm formData={formData} setFormData={setFormData} toggleForm={toggleBsUserForm} /> : null}
      {isBsAddressFormOpen ? <BsAddressForm formData={formData} setFormData={setFormData} toggleForm={toggleBsAddressForm} /> : null}
    </>
  );
};

export default BasicSettings;
