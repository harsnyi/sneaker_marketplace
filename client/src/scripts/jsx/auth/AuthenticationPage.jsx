import '../../../assets/css/authentication_page.css';
import {useNavigate} from 'react-router-dom';

import AuthTabs from './AuthTabs';

import xMarkIcon from '../../../assets/images/logo&icon/xmark-solid.svg';

const AuthenticationPage = (props) => {
  const navigate = useNavigate(); // Initialize useNavigate

  const handleDisable = () => {
    props.setIsAuthOpen(false); // Call the function passed through props to set isAuthOpen to false
    navigate(-1); // Redirect to the previous page
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
