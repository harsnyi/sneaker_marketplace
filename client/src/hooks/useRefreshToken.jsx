import axios from '../setup/Axios';
import useAuth from './useAuth';

const useRefreshToken = () => {
  const {setAuth} = useAuth();

  const refresh = async () => {
    const response = await axios.post('/api/v1/token/refresh', {
      withCredentials: true,
    });
    setAuth((prev) => {
      console.log(JSON.stringify(prev));
      console.log(response.data.access);
      return {...prev, accessToken: response.data.access};
    });
    return response.data.access;
  };
  return refresh;
};
export default useRefreshToken;