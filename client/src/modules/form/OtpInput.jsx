import '../../assets/css/input.css';
import React, {useState, useRef, useEffect} from 'react';
import {useDebounce} from '../../hooks/useDebounce';

const OtpInput = ({numberOfDigits, correctOTP, className}) => {
  const [otp, setOtp] = useState(new Array(numberOfDigits).fill(''));
  const [error, setError] = useState(null);
  const otpBoxReference = useRef([]);

  useEffect(() => {
    if (otpBoxReference.current[0]) {
      otpBoxReference.current[0].focus();
    }
  }, []);

  useDebounce(
    () => {
      // Validate OTP
      if (otp.join('') !== '' && otp.join('') !== correctOTP) {
        setError('Hibás kód!');
      } else {
        setError(null);
      }
    },
    500,
    [otp]
  );

  function handleChange(value, index) {
    let newArr = [...otp];
    newArr[index] = value;
    setOtp(newArr);

    if (value && index < numberOfDigits - 1) {
      otpBoxReference.current[index + 1].focus();
    }
  }

  function handleBackspaceAndEnter(e, index) {
    if (e.key === 'Backspace' && !e.target.value && index > 0) {
      otpBoxReference.current[index - 1].focus();
    }
    if (e.key === 'Enter' && e.target.value && index < numberOfDigits - 1) {
      otpBoxReference.current[index + 1].focus();
    }
  }

  const inputClassName = (className ? className : '') + (error ? ' error' : '');

  return (
    <div className="input_wrapper">
      <div className="otp_group">
        {otp.map((digit, index) => (
          <input key={index} value={digit} maxLength={1} placeholder="" onChange={(e) => handleChange(e.target.value, index)} onKeyUp={(e) => handleBackspaceAndEnter(e, index)} ref={(reference) => (otpBoxReference.current[index] = reference)} className={`input_field ${inputClassName}`} />
        ))}
      </div>
      {error && <p className="error_msg">{error}</p>}
    </div>
  );
};

export default OtpInput;
