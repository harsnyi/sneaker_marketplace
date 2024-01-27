import Input from '../../common/Input';

import {forwardRef, useImperativeHandle, useState} from 'react';
import {useDebounce} from '../../hooks/useDebounce';
import {useToast} from '../../hooks/useToast';

const EMAIL_REGEX = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
const USERNAME_REGEX = /^(?!.*\s{2})[a-z0-9_. ]+(?<!\s)$/i;

const AccountForm = forwardRef(({email, username, password, passwordConfirmation, updateData}, ref) => {
  const [errors, setErrors] = useState({});
  const {addToast} = useToast();

  useImperativeHandle(ref, () => ({
    isValid,
  }));

  const isValid = () => {
    const inputFields = {
      email,
      username,
      password,
      passwordConfirmation,
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

      addToast('error', 'Kérjük, töltse ki a csillaggal jelölt mezőket!');
      return false;
    }

    // Check for other errors
    if (Object.values(errors).every((x) => x === '')) {
      return true;
    } else {
      addToast('error', 'Kérjük, javítsa a hibás mezőket!');
      return false;
    }
  };

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
    },
    500,
    [username]
  );

  useDebounce(
    () => {
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
      } else {
        setErrors((prevErrors) => ({
          ...prevErrors,
          password: '',
        }));
      }
    },
    500,
    [password]
  );

  useDebounce(
    () => {
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
    },
    0,
    [password, passwordConfirmation]
  );

  return (
    <div className="form-inputs">
      <Input
        type="email"
        value={email}
        label="E-Mail * "
        onChange={(value) => {
          updateData({email: value});
        }}
        className="input-field"
        error={errors.email}
        autoFocus
      />
      <Input
        type="text"
        value={username}
        label="Felhasználónév * "
        onChange={(value) => {
          updateData({username: value});
        }}
        className="input-field"
        error={errors.username}
      />
      <div className="field-wrapper">
        <Input
          type="password"
          value={password}
          label="Jelszó * "
          onChange={(value) => {
            updateData({password: value});
          }}
          className="input-field"
          error={errors.password}
        />
        <Input
          type="password"
          value={passwordConfirmation}
          label="Jelszó újra * "
          onChange={(value) => {
            updateData({passwordConfirmation: value});
          }}
          className="input-field"
          error={errors.passwordConfirmation}
        />
      </div>
    </div>
  );
});

export default AccountForm;
