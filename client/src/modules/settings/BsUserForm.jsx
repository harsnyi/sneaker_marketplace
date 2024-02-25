import {useState} from 'react';
import {useDebounce} from '../../hooks/useDebounce';
import {useAuth} from '../../hooks/useAuth';
import {useAxiosPrivate} from '../../hooks/useAxiosPrivate';
import {useToast} from '../../hooks/useToast';
import {motion} from 'framer-motion';

import Input from '../../component/Input';
import Button from '../../component/Button';

import {GiSaveArrow} from 'react-icons/gi';

const USERNAME_REGEX = /^(?!.*\s{2})[a-z0-9_. ]+(?<!\s)$/i;
const NAME_REGEX = /^[A-ZÁÉÍÓÖŐÚÜŰ][a-záéíóöőúüű]+([ -][A-ZÁÉÍÓÖŐÚÜŰ][a-záéíóöőúüű]+)*$/;
const PHONE_REGEX = /^\+36\d{2}-\d{3}-\d{4}$/;

const BsUserForm = ({formData, setFormData, toggleForm}) => {
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const {setAuth} = useAuth();
  const axiosPrivate = useAxiosPrivate();
  const {addToast} = useToast();

  useDebounce(
    () => {
      // Validate username
      if (formData.username && !USERNAME_REGEX.test(formData.username)) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          username: 'Hibás felhasználónév formátum.',
        }));
      } else if (formData.username && formData.username.length < 4) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          username: 'A felhasználónévnek legalább 4 karakter hosszúnak kell lennie.',
        }));
      } else if (formData.username && formData.username.length > 16) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          username: 'A felhasználónév legfeljebb 16 karakter hosszú lehet.',
        }));
      } else {
        setErrors((prevErrors) => ({
          ...prevErrors,
          username: '',
        }));
      }
    },
    500,
    [formData.username]
  );

  useDebounce(
    () => {
      // Validate first name and last name
      if (formData.firstname && !NAME_REGEX.test(formData.firstname)) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          firstname: 'Hibás keresztnév formátum.',
        }));
      } else {
        setErrors((prevErrors) => ({
          ...prevErrors,
          firstname: '',
        }));
      }

      if (formData.lastname && !NAME_REGEX.test(formData.lastname)) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          lastname: 'Hibás vezetéknév formátum.',
        }));
      } else {
        setErrors((prevErrors) => ({
          ...prevErrors,
          lastname: '',
        }));
      }
    },
    500,
    [formData.firstname, formData.lastname]
  );

  useDebounce(
    () => {
      // Validate phone number
      if (formData.phoneNumber && !PHONE_REGEX.test(formData.phoneNumber)) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          phoneNumber: 'Hibás telefonszám. Formátum: +3630-123-4567',
        }));
      } else {
        setErrors((prevErrors) => ({
          ...prevErrors,
          phoneNumber: '',
        }));
      }
    },
    500,
    [formData.phoneNumber]
  );

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (loading) return;

    const inputFields = {
      username: formData.username,
      firstname: formData.firstname,
      lastname: formData.lastname,
      phoneNumber: formData.phoneNumber,
    };

    const emptyInputs = Object.keys(inputFields).filter((key) => inputFields[key] === '');

    if (emptyInputs.length > 0) {
      emptyInputs.forEach((input) => {
        setErrors((prevErrors) => ({
          ...prevErrors,
          [input]: 'A mező kitöltése kötelező.',
        }));
      });
    }

    if (Object.values(errors).some((error) => error)) {
      addToast('error', 'Kérjük javítsd a hibás mezőket!');
      return;
    }

    setLoading(true);
    axiosPrivate
      .put('/api/v1/update_user_data', {
        username: formData.username,
        last_name: formData.lastname,
        first_name: formData.firstname,
        phone_number: formData.phoneNumber,
        bio: formData.bio,
        location: formData.address,
      })
      .then(() => {
        addToast('success', 'Módosítások mentve!');
        setFormData((prevData) => ({
          ...prevData,
          username: formData.username,
          lastname: formData.lastname,
          firstname: formData.firstname,
          phoneNumber: formData.phoneNumber,
          bio: formData.bio,
          address: formData.address,
        }));
        setAuth((prev) => ({
          ...prev,
          username: formData.username,
        }));
        toggleForm();
      })
      .catch((error) => {
        addToast('error', error.response.data.non_field_errors);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <motion.div initial={{x: '100%'}} animate={{x: '0'}} exit={{x: '100%'}} transition={{duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94]}} className="settings_edit_wrapper">
      <div className="form_box">
        <p className="link" onClick={toggleForm}>
          Vissza
        </p>
        <h1> Adatok frissítése</h1>
        <form onSubmit={handleFormSubmit}>
          <Input
            type="text"
            value={formData.username}
            label="Felhasználónév *"
            autoFocus={true}
            onChange={(value) => {
              setFormData((prevData) => ({
                ...prevData,
                username: value,
              }));
            }}
            className="input_field"
            error={errors.username}
            success={formData.username && !errors.username}
          />
          <div className="field_wrapper">
            <Input
              type="text"
              value={formData.lastname}
              label="Vezetéknév *"
              onChange={(value) => {
                setFormData((prevData) => ({
                  ...prevData,
                  lastname: value,
                }));
              }}
              className="input_field"
              error={errors.lastname}
              success={formData.lastname && !errors.lastname}
            />
            <Input
              type="text"
              value={formData.firstname}
              label="Keresztnév *"
              onChange={(value) => {
                setFormData((prevData) => ({
                  ...prevData,
                  firstname: value,
                }));
              }}
              className="input_field"
              error={errors.firstname}
              success={formData.firstname && !errors.firstname}
            />
          </div>
          <Input
            type="tel"
            value={formData.phoneNumber}
            label="Mobil telefonszám *"
            onChange={(value) => {
              setFormData((prevData) => ({
                ...prevData,
                phoneNumber: value,
              }));
            }}
            className="input_field"
            error={errors.phoneNumber}
            success={formData.phoneNumber && !errors.phoneNumber}
          />
          <Input
            type="textarea"
            value={formData.bio}
            label="Bemutatkozás"
            onChange={(value) => {
              setFormData((prevData) => ({
                ...prevData,
                bio: value,
              }));
            }}
            className="input_field"
            rows={7}
            error={errors.bio}
          />

          <Button type="submit" text="Változtatások mentése" className="primary" loading={loading}>
            <GiSaveArrow />
          </Button>
        </form>
      </div>
    </motion.div>
  );
};

export default BsUserForm;
