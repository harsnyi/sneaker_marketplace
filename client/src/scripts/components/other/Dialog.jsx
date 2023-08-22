import React, {useEffect, useState, useContext} from 'react';
import {DialogContext} from '../../bin/DialogProvider.js';
import successIcon from '../../../assets/images/logo&icon/circle-check-regular.svg';
import warningIcon from '../../../assets/images/logo&icon/circle-exclamation-solid.svg';
import errorIcon from '../../../assets/images/logo&icon/circle-xmark-regular.svg';
import questionIcon from '../../../assets/images/logo&icon/circle-question-regular.svg';
import '../../../assets/css/dialog.css';

const Dialog = () => {
  const dialogCtx = useContext(DialogContext);
  const [isVisible, setIsVisible] = useState(false); // Manage dialog visibility
  const [animationClass, setAnimationClass] = useState('');

  var icon = null;

  useEffect(() => {
    if (dialogCtx.type) {
      setIsVisible(true);
      const showTimeout = setTimeout(() => {
        setAnimationClass('visible');
      }, 100);

      const hideTimeout = setTimeout(() => {
        setAnimationClass('hidden');
        handleExitAnimationEnd();
      }, 5000);

      return () => {
        clearTimeout(showTimeout);
        clearTimeout(hideTimeout);
      };
    }
  }, [dialogCtx.type, dialogCtx.message]);

  const handleExitAnimationEnd = () => {
    setTimeout(() => {
      dialogCtx.clear(); // Hide the dialog after the exit animation
      setIsVisible(false);
      setAnimationClass('');
    }, 200);
  };

  switch (dialogCtx.type) {
    case 'success':
      icon = successIcon;
      break;
    case 'warning':
      icon = warningIcon;
      break;
    case 'error':
      icon = errorIcon;
      break;
    case 'info':
      icon = questionIcon;
      break;
    default:
      icon = null;
  }

  return (
    isVisible && (
      <div className={`dialog ${animationClass} ${dialogCtx.type}`}>
        <img src={icon} alt={dialogCtx.type} />
        <p>{dialogCtx.message}</p>
      </div>
    )
  );
};

export default Dialog;
