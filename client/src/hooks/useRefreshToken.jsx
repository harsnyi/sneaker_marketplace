import axios from '../setup/Axios';
import {useAuth} from './useAuth';

const useRefreshToken = () => {
  const {setAuth} = useAuth();

  const refresh = async () => {
    const response = await axios.post(
      '/api/v1/token/refresh',
      {},
      {
        withCredentials: true,
      }
    );
    setAuth((prev) => {
      console.log(response.data.access_token);
      return {...prev, accessToken: response.data.access_token};
    });
    return response.data.access_token;
  };
  return refresh;
};
export default useRefreshToken;
