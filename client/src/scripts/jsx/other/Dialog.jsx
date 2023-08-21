import '../../../assets/css/dialog.css';

import successIcon from '../../../assets/images/logo&icon/circle-check-regular.svg';
import warningIcon from '../../../assets/images/logo&icon/circle-exclamation-solid.svg';
import errorIcon from '../../../assets/images/logo&icon/circle-xmark-regular.svg';
import questionIcon from '../../../assets/images/logo&icon/circle-question-regular.svg';

import {useEffect, useState} from 'react';

const Dialog = ({type, message}) => {
  const [animationClass, setAnimationClass] = useState('');

  useEffect(() => {
    // Show the dialog after a delay
    const showTimeout = setTimeout(() => {
      setAnimationClass('visible');

      // After another delay, trigger slide-up and fade-out animations
      const hideTimeout = setTimeout(() => {
        setAnimationClass('hidden');
      }, 5000); // 5 seconds

      return () => {
        clearTimeout(hideTimeout);
      };
    }, 0); // Initially hidden

    return () => {
      clearTimeout(showTimeout);
    };
  }, []);

  var icon = null;

  if (type !== 'success' && type !== 'warning' && type !== 'error') {
    type = 'other';
  }

  switch (type) {
    case 'success':
      icon = successIcon;
      break;
    case 'warning':
      icon = warningIcon;
      break;
    case 'error':
      icon = errorIcon;
      break;
    case 'other':
      icon = questionIcon;
      break;
    default:
      icon = questionIcon;
  }

  if (!message) {
    return null;
  }

  const dialogClassName = `dialog ${animationClass} ${type}`;

  return (
    <div className={dialogClassName}>
      <img src={icon} alt={type} />
      <p>{message}</p>
    </div>
  );
};

export default Dialog;
