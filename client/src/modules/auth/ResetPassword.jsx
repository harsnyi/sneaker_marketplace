import React from 'react';
import {useState} from 'react';

// import {useLoader} from '../../hooks/useLoader';
import {useDebounce} from '../../hooks/useDebounce';

import Input from '../../component/Input';
import Button from '../../component/Button';
import {motion} from 'framer-motion';

import {HiArrowPath} from 'react-icons/hi2';

const EMAIL_REGEX = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;

const ResetPassword = ({setShowResetPass}) => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  // const {showLoader, hideLoader} = useLoader();

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
        <p>Add meg a regisztáció során használt e-mail címed, majd a levélben kapott linkre kattintva kövesd a további instrukciókat új jelszavad beállításához.</p>
        <form onSubmit={handleFormSubmit}>
          <Input
            type="email"
            value={email}
            label="E-Mail * "
            onChange={(value) => {
              setEmail(value);
            }}
            className="input_field"
            name="lgn-email"
            error={errors.email}
          />
          <Button type="submit" text="Jelszó Helyreállítása" className="primary" loading={loading}>
            <HiArrowPath />
          </Button>
        </form>
      </div>
    </motion.div>
  );
};

export default ResetPassword;
