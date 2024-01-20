import React from 'react';
import Input from '../../common/Input';
import Button from '../../common/Button';

import {Link} from 'react-router-dom';

import axios from 'axios';
import {BiLogIn} from 'react-icons/bi';
import {useState} from 'react';
import {useDebounce} from '../../hooks/useDebounce';
import {useLoader} from '../../hooks/useLoader';
import {useToast} from '../../hooks/useToast';
import {useAuth} from '../../hooks/useAuth';

import {ImFacebook} from 'react-icons/im';
import {FaGoogle} from 'react-icons/fa';

const EMAIL_REGEX = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
const LOGIN_URL = '/api/v1/token/authenticate';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});

  const {setAuth} = useAuth();
  const {showLoader, hideLoader} = useLoader();
  const {addToast} = useToast();

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

    if (!email || !password) {
      addToast('error', 'A csillaggal jelölt mezők kitöltése kötelező!');
      hideLoader();
      return;
    }

    if (Object.values(errors).some((error) => error)) {
      addToast('error', 'Kérem javítsa a hibás mezőket!');
      hideLoader();
      return;
    }

    showLoader();
    try {
      const response = await axios.post('http://localhost:8000' + LOGIN_URL, JSON.stringify({username: email, password}), {
        headers: {'Content-Type': 'application/json'},
        withCredentials: true,
      });

      console.log(JSON.stringify(response?.data));

      const accessToken = response?.data?.access_token;
      const tokenParts = accessToken.split('.');
      const payload = JSON.parse(atob(tokenParts[1]));

      const role = payload.role;
      console.log(role);
      setAuth({email, role, accessToken});
      addToast('success', 'Sikeresen bejelentkeztél!');
    } catch (error) {
      addToast('error', error.message);
    } finally {
      hideLoader();
    }
  };

  return (
    <>
      <h1>Üdv Újra!</h1>
      <div className="social-signup">
        <h4>Lépj be meglévő fiókoddal,</h4>
        <Button text="via Facebook" className="secondary light">
          <ImFacebook />
        </Button>
        <Button text="via Google" className="secondary light">
          <FaGoogle />
        </Button>
      </div>
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
          className="input-field dark"
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
          className="input-field dark"
          name="lgn-pass"
          error={errors.password}
        />

        <span className="forgot-pass">
          Elfelejtetted a jelszavadat? Állítsd vissza <Link to="">itt</Link>.
        </span>
        <Button type="submit" text="Bejelentkezés" className="primary light">
          <BiLogIn />
        </Button>
      </form>
    </>
  );
};

export default Login;
