import React from 'react';
import {useState} from 'react';
import {motion} from 'framer-motion';

import Button from '../form/Button';

import {IoMdCheckmarkCircleOutline} from 'react-icons/io';
import {HiArrowPath} from 'react-icons/hi2';
import OtpInput from '../form/OtpInput';

const ValidateCodeForm = ({toggleForm}) => {
  const [loading, setLoading] = useState(false);

  const handleFormSubmit = (e) => {
    e.preventDefault();

    console.log('Validating code');
  };

  return (
    <motion.div initial={{x: '100%'}} animate={{x: '0'}} exit={{x: '100%'}} transition={{duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94]}} className="page_wrapper">
      <div className="form_box">
        <p className="link" onClick={toggleForm}>
          Vissza
        </p>
        <h1 className="page_title">Csekkold a leveleid</h1>
        <p className="page_desc mb-2">Elküldtünk egy 6 számjegyből álló kódot az általad megadott e-mail címre.</p>
        <form onSubmit={handleFormSubmit}>
          <div className="mb-2">
            <OtpInput numberOfDigits={6} correctOTP={'123456'} />
          </div>
          <Button type="submit" className="primary" text="Megerősítés" loading={loading}>
            <IoMdCheckmarkCircleOutline />
          </Button>
          <Button className="secondary" text="Kód újraküldése" loading={loading}>
            <HiArrowPath />
          </Button>
        </form>
      </div>
    </motion.div>
  );
};

export default ValidateCodeForm;
