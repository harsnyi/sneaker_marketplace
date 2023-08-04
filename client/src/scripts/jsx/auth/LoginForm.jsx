import {useEffect, useState} from 'react';

import Input from '../other/Input';

import facebookLogo from '../../../assets/images/logo&icon/facebook-f.svg';
import googleLogo from '../../../assets/images/logo&icon/google-plus-g.svg';
import instagramLogo from '../../../assets/images/logo&icon/instagram.svg';

const EMAIL_REGEX = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;

const LoginForm = () => {
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

  const handleFormSubmit = (event) => {
    event.preventDefault();
    // Perform login logic here
    // Access the 'email' and 'password' state variables to handle the login process
    // You can implement your login logic here, e.g., send a login request to the server
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
          required
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
          required
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
