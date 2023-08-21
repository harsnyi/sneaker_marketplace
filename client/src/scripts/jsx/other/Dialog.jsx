import '../../../assets/css/dialog.css';

import successIcon from '../../../assets/images/logo&icon/circle-check-regular.svg';
import warningIcon from '../../../assets/images/logo&icon/circle-exclamation-solid.svg';
import errorIcon from '../../../assets/images/logo&icon/circle-xmark-regular.svg';
import questionIcon from '../../../assets/images/logo&icon/circle-question-regular.svg';

import {useEffect, useState} from 'react';

const Dialog = ({type, message}) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 3000); // Adjust the time (in milliseconds) as needed
    return () => clearTimeout(timer);
  }, [message]);

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

  const dialogClassName = `dialog ${isVisible ? 'visible' : 'visible'} ${type}`;

  return (
    <div className={dialogClassName}>
      <img src={icon} alt={type} />
      <p>{message}</p>
    </div>
  );
};

export default Dialog;
