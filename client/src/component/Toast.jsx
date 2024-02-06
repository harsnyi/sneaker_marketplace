import '../assets/css/toast.css';

import {motion} from 'framer-motion';
import {FaCircleCheck, FaCircleInfo, FaTriangleExclamation} from 'react-icons/fa6';
import {BiSolidErrorAlt} from 'react-icons/bi';

import React, {useEffect, useState} from 'react';

const Toast = ({id, type, message, onClose}) => {
  const [timerId, setTimerId] = useState(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      onClose(id);
    }, 5000);

    setTimerId(timer);

    return () => {
      clearTimeout(timerId);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, onClose]);

  return (
    <motion.div initial={{opacity: 0, x: '100%'}} animate={{opacity: 1, x: 0}} exit={{opacity: 0, x: '100%'}} transition={{duration: 0.2, ease: [0.25, 0.46, 0.45, 0.94]}} className={`toast ${type}`}>
      {type === 'success' && <FaCircleCheck className="toast-icon" />}
      {type === 'error' && <BiSolidErrorAlt className="toast-icon" />}
      {type === 'info' && <FaCircleInfo className="toast-icon" />}
      {type === 'warning' && <FaTriangleExclamation className="toast-icon" />}
      <h3>{message}</h3>
      <button className="toast-close" onClick={() => onClose(id)}>
        &#x2716;
      </button>
    </motion.div>
  );
};

export default Toast;
