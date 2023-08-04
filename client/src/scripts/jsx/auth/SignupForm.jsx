import {useState, useEffect} from 'react';

import Input from '../other/Input';

import facebookLogo from '../../../assets/images/logo&icon/facebook-f.svg';
import googleLogo from '../../../assets/images/logo&icon/google-plus-g.svg';
import instagramLogo from '../../../assets/images/logo&icon/instagram.svg';

const NAME_REGEX = /^[A-ZÁÉÍÓÖŐÚÜŰ][a-záéíóöőúüű]+([ -][A-ZÁÉÍÓÖŐÚÜŰ][a-záéíóöőúüű]+)*$/;
const EMAIL_REGEX = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
const USERNAME_REGEX = /^(?!.*\s{2})[a-z0-9_. ]+(?<!\s)$/i;
const PHONE_REGEX = /^\+?[0-9]{11}$/;

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
    } else if (password && !PHONE_REGEX.test(password)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        password: 'A jelszónak tartalmaznia kell legalább egy speciális karaktert.',
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
    if (phoneNumber && !/^\+?[0-9]{8,15}$/.test(phoneNumber)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        phoneNumber: 'Hibás telefonszám formátum.',
      }));
    } else {
      setErrors((prevErrors) => ({
        ...prevErrors,
        phoneNumber: '',
      }));
    }
  }, [phoneNumber]);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    // Perform signup logic here
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
            required
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
            required
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
          required
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
          required
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
            required
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
            required
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
          required
        />
        <div className="select-wrapper">
          <select onChange={(e) => setGender(e.target.value)} defaultValue={gender} className="select-menu" required>
            <option value="" disabled></option>
            <option value="1">Férfi</option>
            <option value="2">Nő</option>
            <option value="3">Egyéb</option>
            <option value="4">Most nem</option>
          </select>
          <label>Nem</label>
        </div>
        <button type="submit" className="btn-main btn-black">
          Regisztráció
        </button>
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
