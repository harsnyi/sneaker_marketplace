import Input from '../../common/Input';
import Button from '../../common/Button';

import React, {useState, useEffect} from 'react';
import {useDebounce} from '../../hooks/useDebounce';
import {useToast} from '../../hooks/useToast';
import {useLoader} from '../../hooks/useLoader';

import {HiPencilSquare} from 'react-icons/hi2';
import {FaAngleDown} from 'react-icons/fa6';
import {ImFacebook} from 'react-icons/im';
import {FaGoogle} from 'react-icons/fa';

const NAME_REGEX = /^[A-ZÁÉÍÓÖŐÚÜŰ][a-záéíóöőúüű]+([ -][A-ZÁÉÍÓÖŐÚÜŰ][a-záéíóöőúüű]+)*$/;
const EMAIL_REGEX = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
const USERNAME_REGEX = /^(?!.*\s{2})[a-z0-9_. ]+(?<!\s)$/i;
const PHONE_REGEX = /((?:\+?3|0)6)(?:-|\()?(\d{1,2})(?:-|\))?(\d{3})-?(\d{3,4})/;
const REGISTER_URL = '/api/v1/registration';

const Signup = () => {
  const [errors, setErrors] = useState({}); // Store input errors
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [gender, setGender] = useState('');

  const {addToast} = useToast();
  const {showLoader, hideLoader} = useLoader();

  useDebounce(
    () => {
      // Validate first name and last name
      if (firstName && !NAME_REGEX.test(firstName)) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          firstName: 'Hibás keresztnév formátum.',
        }));
      } else {
        setErrors((prevErrors) => ({
          ...prevErrors,
          firstName: '',
        }));
      }

      if (lastName && !NAME_REGEX.test(lastName)) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          lastName: 'Hibás vezetéknév formátum.',
        }));
      } else {
        setErrors((prevErrors) => ({
          ...prevErrors,
          lastName: '',
        }));
      }
    },
    0,
    [firstName, lastName]
  );

  useDebounce(
    () => {
      // Validate email
      if (email && !EMAIL_REGEX.test(email)) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          email: 'Hibás e-mail cím formátum.',
        }));
      } else {
        setErrors((prevErrors) => ({
          ...prevErrors,
          email: '',
        }));
      }
    },
    0,
    [email]
  );

  useDebounce(
    () => {
      // Validate username
      if (username && !USERNAME_REGEX.test(username)) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          username: 'Hibás felhasználónév formátum.',
        }));
      } else if (username && username.length < 4) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          username: 'A felhasználónévnek legalább 4 karakter hosszúnak kell lennie.',
        }));
      } else if (username && username.length > 16) {
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
    0,
    [username]
  );

  useDebounce(
    () => {
      // Validate password
      if (password && password.length < 8) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          password: 'A jelszónak legalább 8 karakter hosszúnak kell lennie.',
        }));
      } else if (password && password.length > 20) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          password: 'A jelszó legfeljebb 20 karakter hosszú lehet.',
        }));
      } else if (password && !/\d/.test(password)) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          password: 'A jelszónak tartalmaznia kell legalább egy számot.',
        }));
      } else if (password && !/[a-z]/.test(password)) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          password: 'A jelszónak tartalmaznia kell legalább egy kisbetűt.',
        }));
      } else if (password && !/[A-Z]/.test(password)) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          password: 'A jelszónak tartalmaznia kell legalább egy nagybetűt.',
        }));
      } else {
        setErrors((prevErrors) => ({
          ...prevErrors,
          password: '',
        }));
      }
    },
    0,
    [password]
  );

  useDebounce(
    () => {
      // Validate password confirmation
      if (passwordConfirmation && password !== passwordConfirmation) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          passwordConfirmation: 'A jelszavak nem egyeznek.',
        }));
      } else {
        setErrors((prevErrors) => ({
          ...prevErrors,
          passwordConfirmation: '',
        }));
      }
    },
    0,
    [password, passwordConfirmation]
  );

  useDebounce(
    () => {
      // Validate phone number
      if (phoneNumber && !PHONE_REGEX.test(phoneNumber)) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          phoneNumber: 'Hibás telefonszám.',
        }));
      } else {
        setErrors((prevErrors) => ({
          ...prevErrors,
          phoneNumber: '',
        }));
      }
    },
    0,
    [phoneNumber]
  );

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    showLoader();
    setTimeout(() => {
      hideLoader();
    }, 2000);
    /*
    try {
      const response = await axios.post(
        REGISTER_URL,
        JSON.stringify({
          username: username,
          password: password,
          last_name: lastName,
          first_name: firstName,
          email,
          phone_number: phoneNumber,
          gender,
        }),
        {
          headers: {'Content-type': 'application/json'},
          withCredentials: true,
        }
      );
      console.log(response.data);
    } catch (error) {
      if (error.response?.status === 409) {
        //Username taken
      }
    }
        */
  };

  return (
    <>
      <h1>Még nem vagy tag?</h1>
      <div className="social-signup">
        <h4>Regisztrálj meglévő fiókoddal,</h4>
        <Button text="via Facebook" className="light">
          <ImFacebook />
        </Button>
        <Button text="via Google" className="light">
          <FaGoogle />
        </Button>
      </div>
      <div className="bg-line">
        <h4>vagy</h4>
      </div>
      <form onSubmit={handleFormSubmit}>
        <div className="field-wrapper">
          <Input
            type="text"
            value={lastName}
            label="Vezetéknév * "
            onChange={(value) => {
              setLastName(value);
            }}
            className="input-field dark"
            name="reg-lastname"
            error={errors.lastName}
            autoFocus
          />
          <Input
            type="text"
            value={firstName}
            label="Keresztnév * "
            onChange={(value) => {
              setFirstName(value);
            }}
            className="input-field dark"
            name="reg-firstname"
            error={errors.firstName}
          />
        </div>
        <Input
          type="email"
          value={email}
          label="E-Mail * "
          onChange={(value) => {
            setEmail(value);
          }}
          className="input-field dark"
          name="reg-email"
          error={errors.email}
        />
        <Input
          type="text"
          value={username}
          label="Felhasználónév * "
          onChange={(value) => {
            setUsername(value);
          }}
          className="input-field dark"
          name="reg-username"
          error={errors.username}
        />
        <div className="field-wrapper">
          <Input
            type="password"
            value={password}
            label="Jelszó * "
            onChange={(value) => {
              setPassword(value);
            }}
            className="input-field dark"
            name="reg-password"
            error={errors.password}
          />
          <Input
            type="password"
            value={passwordConfirmation}
            label="Jelszó újra * "
            onChange={(value) => {
              setPasswordConfirmation(value);
            }}
            className="input-field dark"
            name="reg-password-again"
            error={errors.passwordConfirmation}
          />
        </div>
        <Input
          type="tel"
          value={phoneNumber}
          label="Telefonszám * "
          onChange={(value) => {
            setPhoneNumber(value);
          }}
          className="input-field dark"
          name="reg-phone"
          error={errors.phoneNumber}
        />
        <div className="select-wrapper">
          <select onChange={(e) => setGender(e.target.value)} defaultValue={gender} className="select-menu dark">
            <option value="" disabled></option>
            <option value="1">Férfi</option>
            <option value="2">Nő</option>
            <option value="3">Egyéb</option>
            <option value="4">Most nem</option>
          </select>
          <label>Nem</label>
          <FaAngleDown className="select-icon" />
        </div>
        <Button type="submit" text="Regisztráció" className="light">
          <HiPencilSquare />
        </Button>
      </form>
    </>
  );
};

export default Signup;
