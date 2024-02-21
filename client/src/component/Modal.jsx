import '../assets/css/modal.css';

import React, {useRef, useEffect} from 'react';
import Button from './Button';

import {MdClose} from 'react-icons/md';

const Modal = ({children, isOpen, close, title}) => {
  const modalRef = useRef();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        close();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, close]);

  return isOpen ? (
    <section className="modal_wrapper">
      <div className="modal" ref={modalRef}>
        <Button className="secondary close" onClick={close}>
          <MdClose />
        </Button>
        <p className="link" onClick={close}>
          Vissza
        </p>
        <h1 className="modal_title"> {title}</h1>
        {children}
      </div>
    </section>
  ) : null;
};

export default Modal;
