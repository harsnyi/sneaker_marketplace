import React from 'react';
import {useState} from 'react';

import {useDebounce} from '../../hooks/useDebounce';

import Input from '../form/Input';
import Button from '../form/Button';
import {motion} from 'framer-motion';

import {AiOutlineSend} from 'react-icons/ai';

const EMAIL_REGEX = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;

const ResetPassword = ({setShowResetPass}) => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

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

    setLoading(true);

    setInterval(() => {
      setLoading(false);
    }, 3000);

    // TODO: Send reset password request
  };

  return (
    <motion.div initial={{x: '100%'}} animate={{x: '0'}} exit={{x: '100%'}} transition={{duration: 0.2, ease: [0.25, 0.46, 0.45, 0.94]}} className="reset-password_wrapper">
      <p onClick={() => setShowResetPass(false)} className="link">
        Vissza a bejelentkezéshez
      </p>
      <div className="reset-password_body">
        <h1>Elfelejtett jelszó</h1>
        <p>Küldünk egy levelet az e-mail címedre, majd a benne található 6 számjegyű kód megadásával beállíthatod az új jelszavadat.</p>
        <form onSubmit={handleFormSubmit}>
          <Input
            type="email"
            value={email}
            label="E-Mail * "
            autoFocus={true}
            onChange={(value) => {
              setEmail(value);
            }}
            error={errors.email}
            success={email && !errors.email}
          />
          <Button type="submit" text="Kód küldése" className="primary" loading={loading}>
            <AiOutlineSend />
          </Button>
        </form>
      </div>
    </motion.div>
  );
};

export default ResetPassword;
