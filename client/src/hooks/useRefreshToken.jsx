import {jwtDecode} from 'jwt-decode';
import axios from '../setup/Axios';
import {useAuth} from './useAuth';

const REFRESH_URL = '/api/v1/token/refresh';

export const useRefreshToken = () => {
  const {setAuth} = useAuth();

  const refresh = async () => {
    const response = await axios.get(REFRESH_URL, {
      withCredentials: true,
    });
    setAuth((prev) => {
      return {
        ...prev,
        username: jwtDecode(response.data.access_token).username,
        roles: jwtDecode(response.data.access_token).roles,
        accessToken: response.data.access_token,
      };
    });
    return response.data.access_token;
  };
  return refresh;
};
