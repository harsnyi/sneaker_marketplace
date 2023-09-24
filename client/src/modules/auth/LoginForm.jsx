import {useEffect, useState, useContext} from 'react';
import useAuth from '../../hooks/useAuth';
import Input from '../../common/Input';
import Button from '../../common/Button';
import {DialogContext} from '../../setup/DialogProvider.jsx';
import {LoaderContext} from '../../setup/LoaderProvider.jsx';

import facebookLogo from '../../assets/icons/facebook-f.svg';
import googleLogo from '../../assets/icons/google-plus-g.svg';
import instagramLogo from '../../assets/icons/instagram.svg';
import axios from '../../setup/Axios';

const EMAIL_REGEX = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
const LOGIN_URL = '/api/v1/token/authenticate';

const LoginForm = () => {
  const dialogCtx = useContext(DialogContext);
  const loaderCtx = useContext(LoaderContext);
  const {setAuth} = useAuth();

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
    loaderCtx.show();
    try {
      const response = await axios.post(LOGIN_URL, JSON.stringify({username: email, password}), {
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

      dialogCtx.success('Sikeresen bejelentkeztél!');
      setTimeout(() => {
        loaderCtx.hide();
        window.location.href = '/home';
      }, 1000);
    } catch (error) {
      //console.log(error.response.status);

      dialogCtx.error('Hibás e-mail cím vagy jelszó!');
      loaderCtx.hide();
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
        <Button type="submit" text="Bejelentkezés" className="btn-dark" />
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
