import '../../assets/css/multi-step-form.css';

import React from 'react';

import axios from 'axios';
import {useRef, useState} from 'react';
import {useMultiStepForm} from '../../hooks/useMultiStepForm';

import {useLoader} from '../../hooks/useLoader';
import {useToast} from '../../hooks/useToast';

import {IoMdArrowBack} from 'react-icons/io';
import {IoMdArrowForward} from 'react-icons/io';
import {BsCheckLg} from 'react-icons/bs';
import {HiPencilSquare} from 'react-icons/hi2';

import Button from '../../common/Button';
import AccountForm from './AccountForm';
import PersonalForm from './PersonalForm';

const INITIAL_DATA = {
  username: '',
  email: '',
  password: '',
  passwordConfirmation: '',
  firstName: '',
  lastName: '',
  phoneNumber: '',
  gender: '',
};

const REGISTER_URL = '/api/v1/registration';

const MultiStepForm = () => {
  const accountRef = useRef();
  const personalRef = useRef();

  const {showLoader, hideLoader} = useLoader();
  const {addToast} = useToast();

  const [data, setData] = useState(INITIAL_DATA);
  const updateData = (fields) => {
    setData((prev) => {
      return {
        ...prev,
        ...fields,
      };
    });
  };

  const {steps, currentStepIndex, isFirstStep, isLastStep, prev, next, goTo} = useMultiStepForm([
    {
      label: 'Fiók',
      component: <AccountForm ref={accountRef} {...data} updateData={updateData} />,
    },
    {
      label: 'Adatok',
      component: <PersonalForm ref={personalRef} {...data} updateData={updateData} />,
    },
  ]);

  const onSubmit = async (e) => {
    e.preventDefault();

    const isValid = personalRef.current.isValid();
    if (isValid) {
      showLoader();
      try {
        const response = await axios.post(
          'http://localhost:8000' + REGISTER_URL,
          JSON.stringify({
            username: data.username,
            password: data.password,
            last_name: data.lastName,
            first_name: data.firstName,
            email: data.email,
            phone_number: data.phoneNumber,
            gender: data.gender,
          }),
          {
            headers: {'Content-type': 'application/json'},
            withCredentials: true,
          }
        );
        console.log(response.data);
      } catch (error) {
        if (error.response?.status === 409) {
          //Username taken
        }
      } finally {
        hideLoader();
      }
    }
  };

  return (
    <form className="multi-step-form" onSubmit={(e) => onSubmit(e)}>
      <div className="form-header">
        {steps.map((step, index) => (
          <div key={index} className={index < currentStepIndex ? 'form-step valid' : index === currentStepIndex ? 'form-step active' : 'form-step'}>
            {index < currentStepIndex ? (
              <h3>
                <BsCheckLg />
              </h3>
            ) : (
              <h3>{index + 1}</h3>
            )}
            <h4>{step.label}</h4>
          </div>
        ))}
      </div>
      <div className="form-body">
        <div>{steps[currentStepIndex].component}</div>
        <div className="form-buttons">
          {!isFirstStep && (
            <Button type="button" text="Vissza" className="light" onClick={prev}>
              <IoMdArrowBack />
            </Button>
          )}

          {!isLastStep ? (
            <Button type="button" text="Következő" className="light" onClick={(e) => next(e)}>
              <IoMdArrowForward />
            </Button>
          ) : (
            <Button type="submit" text="Regisztráció" className="light">
              <HiPencilSquare />
            </Button>
          )}
        </div>
      </div>
    </form>
  );
};

export default MultiStepForm;
