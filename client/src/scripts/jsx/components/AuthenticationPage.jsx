import '../../../assets/css/authentication_page.css';
import {useNavigate} from 'react-router-dom';

const AuthenticationPage = (props) => {
  const navigate = useNavigate(); // Initialize useNavigate

  const handleDisable = () => {
    props.setIsAuthOpen(false); // Call the function passed through props to set isAuthOpen to false
    navigate(-1); // Redirect to the previous page
  };

  return (
    <>
      <div className="authentication-page">
        <button onClick={handleDisable}>Disable</button>
      </div>
    </>
  );
};
export default AuthenticationPage;
