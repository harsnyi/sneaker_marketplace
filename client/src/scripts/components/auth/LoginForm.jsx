import {useEffect, useState, useContext} from 'react';
import AuthContext from '../context/AuthProvider';
import Input from '../other/Input';
import {DialogContext} from '../../bin/DialogProvider.js';

import facebookLogo from '../../../assets/images/logo&icon/facebook-f.svg';
import googleLogo from '../../../assets/images/logo&icon/google-plus-g.svg';
import instagramLogo from '../../../assets/images/logo&icon/instagram.svg';
import axios from '../api/axios';

const EMAIL_REGEX = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
const LOGIN_URL = '/api/v1/auth/';

const LoginForm = () => {
  const dialogCtx = useContext(DialogContext);
  const {setAuth} = useContext(AuthContext);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});

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

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    /*
    if (email && password) {
      // Simulating login logic
      if (email === 'test@example.com' && password === 'password') {
        dialogCtx.success('Sikeresen bejelentkeztél!');
      } else {
        dialogCtx.error('Hibás e-mail cím vagy jelszó!');
      }
    } else {
      dialogCtx.error('A csillaggal jelölt mezők kitöltése kötelező!');
      return;
    }

    */
    try {
      const response = await axios.post(LOGIN_URL, JSON.stringify({email, password}), {
        headers: {'Content-Type': 'application/json'},
        withCredentials: true,
      });
      console.log(JSON.stringify(response?.data));
      const accessToken = response?.data?.accessToken;
      setAuth({email, password, accessToken});
      dialogCtx.success('Sikeresen bejelentkeztél!');
    } catch (error) {
      console.log(error.response.status);
      dialogCtx.error('Hibás e-mail cím vagy jelszó!');
    }
  };

  return (
    <>
      <h1>Üdv újra!</h1>
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
        <button type="submit" className="btn-main btn-black">
          Bejelentkezés
        </button>
      </form>
      <div className="bg-line">
        <h3>vagy</h3>
      </div>
      <div className="social-icons-wrapper">
        <span className="social-icon facebook-icon">
          <img src={facebookLogo} alt="Bejelentkezés Facebook-al" title="Bejelentkezés Facebook-al." />
        </span>
        <span className="social-icon google-icon">
          <img src={googleLogo} alt="Bejelentkezés Google-al" title="Bejelentkezés Google-al." />
        </span>
        <span className="social-icon instagram-icon">
          <img src={instagramLogo} alt="Bejelentkezés Instagram-al" title="Bejelentkezés Instagram-al." />
        </span>
      </div>
    </>
  );
};

export default LoginForm;
