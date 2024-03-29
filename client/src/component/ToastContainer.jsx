import React from 'react';
import {useToast} from '../hooks/useToast';
import Toast from './Toast';

const ToastContainer = () => {
  const {toasts, removeToast} = useToast();

  return (
    <div className="toast_container">
      {toasts.map((toast) => (
        <Toast key={toast.id} id={toast.id} type={toast.type} message={toast.message} onClose={removeToast} />
      ))}
    </div>
  );
};

export default ToastContainer;
