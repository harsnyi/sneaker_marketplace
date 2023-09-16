import '../../../assets/css/authentication_page.css';

import AuthTabs from './AuthTabs';
import xMarkIcon from '../../../assets/icons/xmark-solid.svg';
import {useEffect} from 'react';
import {disableBodyScroll, enableBodyScroll} from 'body-scroll-lock';

const AuthenticationPage = (props) => {
  const handleDisable = () => {
    props.setIsAuthOpen(false); // Call the function passed through props to set isAuthOpen to false
    window.history.replaceState(null, null, window.location.pathname); // Remove the query string from the URL
  };

  useEffect(() => {
    // Disable body scroll when the form is active
    if (props.isAuthOpen) {
      const targetElement = document.querySelector('.authentication-page');
      disableBodyScroll(targetElement);
    } else {
      // Enable body scroll when the form is not active
      enableBodyScroll(document.body);
    }

    // Clean up the effect
    return () => {
      enableBodyScroll(document.body);
    };
  }, [props.isAuthOpen]);

  return (
    <>
      <div className="authentication-page">
        <div className="form-container">
          <button onClick={handleDisable} className="btn-close-form">
            <img src={xMarkIcon} alt="Bezár" />
          </button>
          <AuthTabs />
        </div>
      </div>
    </>
  );
};
export default AuthenticationPage;
