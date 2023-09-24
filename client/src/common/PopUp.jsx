import '../assets/css/pop_up.css';

import xMarkIcon from '../assets/icons/xmark-solid.svg';
import {useEffect} from 'react';
import {disableBodyScroll, enableBodyScroll} from 'body-scroll-lock';

const PopUp = (props) => {
  const handleDisable = () => {
    if (props.isAuthOpen) {
      props.setIsAuthOpen(false);
    } else if (props.isLogoutOpen) {
      props.setIsLogoutOpen(false);
    }

    window.history.replaceState(null, null, window.location.pathname);
  };

  useEffect(() => {
    // Disable body scroll when the form is active
    if (props.isAuthOpen || props.isLogoutOpen) {
      const targetElement = document.querySelector('.pop-up-page');
      disableBodyScroll(targetElement);
    } else {
      // Enable body scroll when the form is not active
      enableBodyScroll(document.body);
    }

    // Clean up the effect
    return () => {
      enableBodyScroll(document.body);
    };
  }, [props.isAuthOpen, props.isLogoutOpen]);

  return (
    <>
      <div className="pop-up-page">
        <div className="pop-up-container">
          <button onClick={handleDisable} className="btn-close-form">
            <img src={xMarkIcon} alt="Bezár" />
          </button>
          {props.children}
        </div>
      </div>
    </>
  );
};

export default PopUp;
