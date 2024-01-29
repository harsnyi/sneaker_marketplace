import React, {useState} from 'react';
import '../assets/css/button.css';
import {ImSpinner8} from 'react-icons/im';
//import {useLoading} from '../hooks/useLoading';

const Spinner = () => (
  <span className="spinner">
    <ImSpinner8 />
  </span>
);

const Button = ({children, className, loading, text, ...attributes}) => {
  const classN = className ? `btn ${className}` : 'btn';
  //const {loading} = useLoading();
  const isTertiaryButton = className && className.includes('tertiary');

  return (
    <button type="button" className={classN} disabled={!isTertiaryButton && loading} {...attributes}>
      {loading && !isTertiaryButton ? (
        <Spinner />
      ) : (
        <>
          {children}
          <span>{text}</span>
        </>
      )}
    </button>
  );
};

export default Button;
