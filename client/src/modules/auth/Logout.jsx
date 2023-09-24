import '../../assets/css/logout.css';

import {useContext} from 'react';

import Button from '../../common/Button';

import {DialogContext} from '../../setup/DialogProvider';
import {LoaderContext} from '../../setup/LoaderProvider';

import axios from '../../setup/Axios';

const LOGOUT_URL = '/api/v1/token/logout';

const Logout = () => {
  const dialogCtx = useContext(DialogContext);
  const loaderCtx = useContext(LoaderContext);

  const handleLogOut = () => {
    loaderCtx.show();

    axios.post(LOGOUT_URL).then(() => {
      loaderCtx.hide();
      dialogCtx.info('Kijelentkeztél!');
      window.location.href = '/home';
    });
  };

  return (
    <div className="logout">
      <p>Biztosan kijelentkezel?</p>
      <Button text="OK" className="btn-dark" onClick={handleLogOut} />
    </div>
  );
};

export default Logout;
