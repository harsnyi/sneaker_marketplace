import {useState, useEffect} from 'react';
import axios from '../../setup/Axios';

import Input from '../../common/Input';
import Button from '../../common/Button';

import angleDown from '../../assets/icons/angle-down-solid.svg';
import facebookLogo from '../../assets/icons/facebook-f.svg';
import googleLogo from '../../assets/icons/google-plus-g.svg';
import instagramLogo from '../../assets/icons/instagram.svg';

const NAME_REGEX = /^[A-ZÁÉÍÓÖŐÚÜŰ][a-záéíóöőúüű]+([ -][A-ZÁÉÍÓÖŐÚÜŰ][a-záéíóöőúüű]+)*$/;
const EMAIL_REGEX = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
const USERNAME_REGEX = /^(?!.*\s{2})[a-z0-9_. ]+(?<!\s)$/i;
const PHONE_REGEX = /(\()?(\+36|0036|06)?(\))?(-| )?(1|20|2[2-9]|3[0-7]|40|42|4[4-9]|5[2-7]|59|60|62|63|66|68|69|70|7[2-9]|80|8[2-5]|8[7-9]]|90|9[2-9])([\\/ ])?(\d{6,7}|\d{3}(-| )\d{3,4}|\d{3,4}(-| )\d{3})/;
const REGISTER_URL = '/api/v1/register/';

const SignupForm = () => {
  const [errors, setErrors] = useState({}); // Store input errors
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [gender, setGender] = useState('');

  useEffect(() => {
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
  }, [firstName, lastName]);

  useEffect(() => {
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
  }, [email]);

  useEffect(() => {
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
  }, [username]);

  useEffect(() => {
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
  }, [password]);

  useEffect(() => {
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
  }, [password, passwordConfirmation]);

  useEffect(() => {
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
  }, [phoneNumber]);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
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
  };

  return (
    <>
      <h1>Még nem vagy tag?</h1>
      <form onSubmit={handleFormSubmit}>
        <div className="field-wrapper">
          <Input
            type="text"
            value={lastName}
            label="Vezetéknév * "
            onChange={(value) => {
              setLastName(value);
            }}
            className="input-field"
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
            className="input-field"
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
          className="input-field"
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
          className="input-field"
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
            className="input-field"
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
            className="input-field"
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
          className="input-field"
          name="reg-phone"
          error={errors.phoneNumber}
        />
        <div className="select-wrapper">
          <select onChange={(e) => setGender(e.target.value)} defaultValue={gender} className="select-menu">
            <option value="" disabled></option>
            <option value="1">Férfi</option>
            <option value="2">Nő</option>
            <option value="3">Egyéb</option>
            <option value="4">Most nem</option>
          </select>
          <label>Nem</label>
          <img className="select-icon-down" src={angleDown} alt=" " />
        </div>
        <Button type="submit" text="Regisztráció" className="btn-dark" />

        <div className="bg-line">
          <h3>vagy</h3>
        </div>
        <div className="social-icons-wrapper">
          <span className="social-icon facebook-icon">
            <img src={facebookLogo} alt="Regisztráció Facebook-al" title="Regisztráció Facebook-al." />
          </span>
          <span className="social-icon google-icon">
            <img src={googleLogo} alt="Regisztráció Google-al" title="Regisztráció Google-al." />
          </span>
          <span className="social-icon instagram-icon">
            <img src={instagramLogo} alt="Regisztráció Instagram-al" title="Regisztráció Instagram-al." />
          </span>
        </div>
      </form>
    </>
  );
};

export default SignupForm;
