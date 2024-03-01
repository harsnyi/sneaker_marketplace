import '../../assets/css/multi-step-form.css';

import React from 'react';

import axios from '../../setup/Axios';
import {useRef, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {useMultiStepForm} from '../../hooks/useMultiStepForm';

import {useToast} from '../../hooks/useToast';

import {IoMdArrowBack} from 'react-icons/io';
import {IoMdArrowForward} from 'react-icons/io';
import {FaCheck} from 'react-icons/fa6';
import {MdAccountBox, MdDoneAll} from 'react-icons/md';
import {FaIdCard} from 'react-icons/fa';
import Button from '../form/Button';
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
  const navigate = useNavigate();
  const accountRef = useRef();
  const personalRef = useRef();
  const {addToast} = useToast();

  const [data, setData] = useState(INITIAL_DATA);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

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
      label: 'Fiók információ',
      svg: <MdAccountBox />,
      component: <AccountForm ref={accountRef} {...data} updateData={updateData} err={errors} />,
    },
    {
      label: 'Személyes adatok',
      svg: <FaIdCard />,
      component: <PersonalForm ref={personalRef} {...data} updateData={updateData} err={errors} />,
    },
  ]);

  const onSubmit = async (e) => {
    e.preventDefault();

    if (loading) return;

    const isValid = personalRef.current.isValid();
    if (isValid) {
      setLoading(true);
      try {
        await axios.post(
          REGISTER_URL,
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

        addToast('success', 'Sikeres regisztráció! Kérjük jelentkezz be!');
        setData(INITIAL_DATA);
        navigate('/auth?tab=log');
      } catch (error) {
        addToast('error', 'Kérjük javítsd a hibás mezőket!');
        console.log(error.response.data);
        Object.entries(error.response.data.message).forEach(([field, messages]) => {
          setErrors((prevErrors) => ({
            ...prevErrors,
            [field]: messages[0],
          }));
        });
        // If the error is for the email or username field, navigate to the first step
        if (error.response.data.message.email || error.response.data.message.username) {
          goTo(0);
        }
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <form className="multi_step_form" onSubmit={(e) => onSubmit(e)}>
      <div className="form_header">
        {steps.map((step, index) => (
          <React.Fragment key={index}>
            <div className={index < currentStepIndex ? 'from_step valid' : index === currentStepIndex ? 'from_step active' : 'from_step'} onClick={() => goTo(index)}>
              {index < currentStepIndex ? (
                <h3>
                  <FaCheck />
                </h3>
              ) : (
                <h3>{step.svg}</h3>
              )}
              <h4>{step.label}</h4>
            </div>
            <span className={index < steps.length - 1 ? 'form_divider' : ''}></span>
          </React.Fragment>
        ))}
      </div>
      <div className="from_body">
        <div>{steps[currentStepIndex].component}</div>
        <div className="from_buttons">
          {!isFirstStep && (
            <Button type="button" text="Vissza" className="tertiary" onClick={prev}>
              <IoMdArrowBack />
            </Button>
          )}

          {!isLastStep ? (
            <Button type="button" text="Következő" className="tertiary" onClick={(e) => next(e)}>
              <IoMdArrowForward />
            </Button>
          ) : (
            <Button type="submit" text="Regisztráció" className="primary" loading={loading}>
              <MdDoneAll />
            </Button>
          )}
        </div>
      </div>
    </form>
  );
};

export default MultiStepForm;
