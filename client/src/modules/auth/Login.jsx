import React from 'react';
import Input from '../../component/Input';
import Button from '../../component/Button';
import SocialSignup from './SocialSignup';

import {jwtDecode} from 'jwt-decode';

import axios from '../../setup/Axios';
import {useNavigate, useLocation} from 'react-router-dom';
import {useState} from 'react';
import {useDebounce} from '../../hooks/useDebounce';
import {useToast} from '../../hooks/useToast';
import {useAuth} from '../../hooks/useAuth';

import {BiLogIn} from 'react-icons/bi';

const EMAIL_REGEX = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
const LOGIN_URL = '/api/v1/token/authenticate';

const Login = ({setShowResetPass}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const from = location?.state?.from?.pathname || '/';

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const {setAuth} = useAuth();
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
    500,
    [email]
  );

  useDebounce(
    () => {
      // clear password errors
      setErrors((prevErrors) => ({
        ...prevErrors,
        password: '',
      }));
    },
    0,
    [password]
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
      addToast('error', 'Kérjük, töltsd ki a csillaggal jelölt mezőket!');
      return;
    }

    if (Object.values(errors).some((error) => error)) {
      addToast('error', 'Kérjük, javítsd a hibás mezőket!');
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(LOGIN_URL, JSON.stringify({email: email, password}), {
        headers: {'Content-Type': 'application/json'},
        withCredentials: true,
      });

      const accessToken = response?.data?.access_token;
      const roles = jwtDecode(accessToken).roles;
      const username = jwtDecode(accessToken).username;

      setAuth({username, roles, accessToken});
      setEmail('');
      setPassword('');

      navigate(from, {replace: true});
    } catch (error) {
      addToast('error', error.message);
    } finally {
      setLoading(false);
    }
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
          autoFocus={true}
          onChange={(value) => {
            setEmail(value);
          }}
          className="input_field"
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
          className="input_field"
          name="lgn-pass"
          error={errors.password}
        />

        <p onClick={() => setShowResetPass(true)} className="link">
          Elfelejtetted a jelszavadat?
        </p>
        <Button type="submit" text="Bejelentkezés" className="primary" loading={loading}>
          <BiLogIn />
        </Button>
      </form>
    </>
  );
};

export default Login;
