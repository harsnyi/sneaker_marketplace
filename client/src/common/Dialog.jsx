import React, {useEffect, useState, useContext} from 'react';
import {DialogContext} from '../setup/DialogProvider.jsx';
import successIcon from '../assets/icons/circle-check-regular.svg';
import warningIcon from '../assets/icons/circle-exclamation-solid.svg';
import errorIcon from '../assets/icons/circle-xmark-regular.svg';
import questionIcon from '../assets/icons/circle-question-regular.svg';
import '../assets/css/dialog.css';

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
      }, 4000);

      return () => {
        clearTimeout(showTimeout);
        clearTimeout(hideTimeout);
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dialogCtx.type, dialogCtx.message]);

  const handleExitAnimationEnd = () => {
    setTimeout(() => {
      dialogCtx.clear(); // Hide the dialog after the exit animation
      setIsVisible(false);
      setAnimationClass('');
    }, 200);
  };

  const handleDialogClick = (event) => {
    if (event.target.classList.contains('visible')) {
      setAnimationClass('hidden');
      handleExitAnimationEnd();
    }
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
      <div className={`dialog ${animationClass} ${dialogCtx.type}`} onDoubleClick={handleDialogClick}>
        <img src={icon} alt={dialogCtx.type} />
        <p>{dialogCtx.message}</p>
      </div>
    )
  );
};

export default Dialog;
