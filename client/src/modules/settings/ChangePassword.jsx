import React, {useState, useEffect} from 'react';
import {useDebounce} from '../../hooks/useDebounce';
import {useToast} from '../../hooks/useToast';
import {motion} from 'framer-motion';

import ValidateCodeForm from './ValidateCodeForm';
import Input from '../form/Input';
import Button from '../form/Button';

import {AiOutlineSend} from 'react-icons/ai';
import {MdAccountCircle} from 'react-icons/md';
import {BooleanParam, useQueryParam} from 'use-query-params';

const EMAIL_REGEX = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;

const ChangePassword = () => {
  const [initialLoad, setInitialLoad] = useState(true);
  const [email, setEmail] = useState('');
  const [codeSent, setCodeSent] = useQueryParam('codesent', BooleanParam);

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const {addToast} = useToast();

  useEffect(() => {
    setInitialLoad(false);
  }, []);

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

  const toggleValidateCode = () => {
    setCodeSent(!codeSent);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (loading) return;

    const inputFields = {email};

    const emptyInputs = Object.keys(inputFields).filter((key) => inputFields[key] === '');

    if (emptyInputs.length > 0) {
      emptyInputs.forEach((input) => {
        setErrors((prevErrors) => ({
          ...prevErrors,
          [input]: 'A mező kitöltése kötelező.',
        }));
      });

      addToast('error', 'Kérjük töltsd ki a csillaggal jelölt mezőket!');
      return;
    }

    if (Object.values(errors).some((error) => error)) {
      addToast('error', 'Kérjük javítsd a hibás mezőket!');
      return;
    }

    setLoading(true);
    // TODO: Send email with code
    setCodeSent(true);
  };

  return (
    <>
      {codeSent ? (
        <ValidateCodeForm toggleForm={toggleValidateCode} />
      ) : (
        <motion.div initial={initialLoad ? false : {x: codeSent ? '100%' : '-100%'}} animate={{x: '0'}} exit={{x: codeSent ? '-100%' : '100%'}} transition={{duration: 0.3, ease: [0.5, 0.46, 0.45, 0.94]}} className="settings_edit_wrapper">
          <div className="form_box">
            <h1 className="page_title">
              <MdAccountCircle /> Jelszó csere
            </h1>
            <p className="page_desc">Küldünk egy levelet az e-mail címedre, majd a benne található 6 számjegyű kód megadásával beállíthatod az új jelszavadat.</p>

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
      )}
    </>
  );
};

export default ChangePassword;
