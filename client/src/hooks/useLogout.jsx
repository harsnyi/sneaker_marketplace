import axios from '../setup/Axios';
import {useAuth} from './useAuth';
import {useToast} from './useToast';

const LOGOUT_URL = '/api/v1/token/logout';

export const useLogout = () => {
  const {setAuth} = useAuth();
  const {addToast} = useToast();

  const logout = async () => {
    setAuth(null);
    try {
      await axios.post(
        LOGOUT_URL,
        {},
        {
          withCredentials: true,
        }
      );
    } catch (error) {
      addToast('error', error.message);
    }
  };

  return logout;
};
