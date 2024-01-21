import Input from '../../common/Input';

import {forwardRef, useImperativeHandle, useState} from 'react';
import {useDebounce} from '../../hooks/useDebounce';
import {useToast} from '../../hooks/useToast';

import {FaAngleDown} from 'react-icons/fa';

const NAME_REGEX = /^[A-ZÁÉÍÓÖŐÚÜŰ][a-záéíóöőúüű]+([ -][A-ZÁÉÍÓÖŐÚÜŰ][a-záéíóöőúüű]+)*$/;
const PHONE_REGEX = /^\+36\d{2}-\d{3}-\d{4}$/;

const PersonalForm = forwardRef(({firstName, lastName, phoneNumber, gender, updateData}, ref) => {
  const [errors, setErrors] = useState({});
  const {addToast} = useToast();

  useImperativeHandle(ref, () => ({
    isValid,
  }));

  const isValid = () => {
    const inputFields = {
      firstName,
      lastName,
      phoneNumber,
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
      // Validate first name and last name
      if (firstName && !NAME_REGEX.test(firstName)) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          firstName: 'Hibás keresztnév formátum.',
        }));
      } else {
        setErrors((prevErrors) => ({
          ...prevErrors,
          firstName: '',
        }));
      }

      if (lastName && !NAME_REGEX.test(lastName)) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          lastName: 'Hibás vezetéknév formátum.',
        }));
      } else {
        setErrors((prevErrors) => ({
          ...prevErrors,
          lastName: '',
        }));
      }
    },
    500,
    [firstName, lastName]
  );

  useDebounce(
    () => {
      // Validate phone number
      if (phoneNumber && !PHONE_REGEX.test(phoneNumber)) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          phoneNumber: 'Hibás telefonszám. Formátum: +3630-123-4567',
        }));
      } else {
        setErrors((prevErrors) => ({
          ...prevErrors,
          phoneNumber: '',
        }));
      }
    },
    500,
    [phoneNumber]
  );

  return (
    <div className="form-inputs">
      <div className="field-wrapper">
        <Input
          type="text"
          value={lastName}
          label="Vezetéknév * "
          onChange={(value) => {
            updateData({lastName: value});
          }}
          className="input-field dark"
          error={errors.lastName}
          autoFocus
        />
        <Input
          type="text"
          value={firstName}
          label="Keresztnév * "
          onChange={(value) => {
            updateData({firstName: value});
          }}
          className="input-field dark"
          error={errors.firstName}
        />
      </div>
      <Input
        type="tel"
        value={phoneNumber}
        label="Mobil telefonszám * "
        onChange={(value) => {
          updateData({phoneNumber: value});
        }}
        className="input-field dark"
        error={errors.phoneNumber}
      />
      <div className="select-wrapper">
        <select
          onChange={(e) => {
            updateData({gender: e.target.value});
          }}
          defaultValue={gender}
          className="select-menu dark">
          <option value="" disabled></option>
          <option value="1">Férfi</option>
          <option value="2">Nő</option>
          <option value="3">Egyéb</option>
          <option value="4">Most nem</option>
        </select>
        <label>Nem</label>
        <FaAngleDown className="select-icon" />
      </div>
    </div>
  );
});

export default PersonalForm;
