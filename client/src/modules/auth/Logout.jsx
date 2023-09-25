import '../../assets/css/logout.css';

import Button from '../../common/Button';

import axios from '../../setup/Axios';

const LOGOUT_URL = '/api/v1/token/logout';

const Logout = () => {
  const handleLogOut = () => {
    try {
      const response = axios.post(
        LOGOUT_URL,
        {},
        {
          withCredentials: true,
        }
      );

      console.log(response.data);
    } catch (error) {
      console.log(error.response.status);
    }
  };

  return (
    <div className="logout">
      <p>Biztosan kijelentkezel?</p>
      <Button text="OK" className="btn-dark" onClick={handleLogOut} />
    </div>
  );
};

export default Logout;
