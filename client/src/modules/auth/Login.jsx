import React from 'react';
import Input from '../../common/Input';
import Button from '../../common/Button';
import SocialSignup from './SocialSignup';

import {Link} from 'react-router-dom';

import axios from '../../setup/Axios';
import {BiLogIn} from 'react-icons/bi';
import {useState} from 'react';
import {useDebounce} from '../../hooks/useDebounce';
//import {useLoader} from '../../hooks/useLoader';
//import {useLoading} from '../../hooks/useLoading';
import {useToast} from '../../hooks/useToast';
import {useAuth} from '../../hooks/useAuth';

const EMAIL_REGEX = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
const LOGIN_URL = '/api/v1/token/authenticate';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const {setAuth} = useAuth();
  const {addToast} = useToast();
  //const {showLoader, hideLoader} = useLoader();
  //const {loading, setLoading} = useLoading();

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

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const inputFields = {
      email,
      password,
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
    }

    if (!email || !password) {
      addToast('error', 'Kérjük, töltse ki a csillaggal jelölt mezőket!');
      return;
    }

    if (Object.values(errors).some((error) => error)) {
      addToast('error', 'Kérjük, javítsa a hibás mezőket!');
      return;
    }

    //showLoader();
    setLoading(true);
    await axios
      .post(LOGIN_URL, JSON.stringify({username: email, password}), {
        headers: {'Content-Type': 'application/json'},
        withCredentials: true,
      })
      .then((response) => {
        console.log(JSON.stringify(response?.data));

        const accessToken = response?.data?.access_token;
        const tokenParts = accessToken.split('.');
        const payload = JSON.parse(atob(tokenParts[1]));

        const role = payload.role;
        console.log(role);
        setAuth({email, role, accessToken});
        addToast('success', 'Sikeresen bejelentkeztél!');
      })
      .catch((error) => {
        addToast('error', error.message);
      })
      .finally(() => {
        //hideLoader();
        setLoading(false);
      });
  };

  return (
    <>
      <h1>Üdv újra!</h1>
      <SocialSignup />
      <div className="bg-line">
        <h4>vagy</h4>
      </div>
      <form onSubmit={handleFormSubmit}>
        <Input
          type="email"
          value={email}
          label="E-Mail * "
          onChange={(value) => {
            setEmail(value);
          }}
          className="input-field"
          name="lgn-email"
          error={errors.email}
        />
        <Input
          type="password"
          value={password}
          label="Jelszó * "
          onChange={(value) => {
            setPassword(value);
          }}
          className="input-field"
          name="lgn-pass"
          error={errors.password}
        />

        <span className="forgot-pass">
          Elfelejtetted a jelszavadat? Állítsd vissza <Link to="">itt</Link>.
        </span>
        <Button type="submit" text="Bejelentkezés" className="primary" loading={loading}>
          <BiLogIn />
        </Button>
      </form>
    </>
  );
};

export default Login;
