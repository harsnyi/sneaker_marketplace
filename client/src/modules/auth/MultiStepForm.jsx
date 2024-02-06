import '../../assets/css/multi-step-form.css';

import React from 'react';

import axios from '../../setup/Axios';
import {useRef, useState} from 'react';
import {useMultiStepForm} from '../../hooks/useMultiStepForm';

import {useLoader} from '../../hooks/useLoader';
import {useLoading} from '../../hooks/useLoading';
import {useToast} from '../../hooks/useToast';

import {IoMdArrowBack} from 'react-icons/io';
import {IoMdArrowForward} from 'react-icons/io';
import {FaCheck} from 'react-icons/fa6';
import {HiPencilSquare} from 'react-icons/hi2';
import {MdAccountBox} from 'react-icons/md';
import {FaIdCard} from 'react-icons/fa';

import Button from '../../component/Button';
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

  //const {showLoader, hideLoader} = useLoader();
  const {loading, setLoading} = useLoading();
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
      label: 'Fiók információ',
      svg: <MdAccountBox />,
      component: <AccountForm ref={accountRef} {...data} updateData={updateData} />,
    },
    {
      label: 'Személyes adatok',
      svg: <FaIdCard />,
      component: <PersonalForm ref={personalRef} {...data} updateData={updateData} />,
    },
  ]);

  const onSubmit = async (e) => {
    e.preventDefault();

    if (loading) return;

    const isValid = personalRef.current.isValid();
    if (isValid) {
      //showLoader();
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

        addToast('success', 'Sikeres regisztráció! Kérjük, jelentkezz be!');
        setData(INITIAL_DATA);
        goTo(0);
      } catch (error) {
        console.log(error);
        addToast('error', error.message);
      } finally {
        //hideLoader();
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
              <HiPencilSquare />
            </Button>
          )}
        </div>
      </div>
    </form>
  );
};

export default MultiStepForm;
