import '../../../assets/css/authentication_page.css';

import AuthTabs from './AuthTabs';
import xMarkIcon from '../../../assets/images/logo&icon/xmark-solid.svg';

const AuthenticationPage = (props) => {
  const handleDisable = () => {
    props.setIsAuthOpen(false); // Call the function passed through props to set isAuthOpen to false
    window.history.replaceState(null, null, window.location.pathname); // Remove the query string from the URL
  };

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
