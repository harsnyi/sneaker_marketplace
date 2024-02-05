import {Outlet} from 'react-router-dom';
import {useState, useEffect} from 'react';
import {useRefreshToken} from '../../hooks/useRefreshToken';
import {useAuth} from '../../hooks/useAuth';
import {useToast} from '../../hooks/useToast';
import Spinner from '../../common/Spinner';

const PersistLogin = () => {
  const [loading, setLoading] = useState(true);
  const refresh = useRefreshToken();
  const {auth} = useAuth();

  const {addToast} = useToast();

  useEffect(() => {
    const verifyRefreshToken = async () => {
      try {
        await refresh();
      } catch (error) {
        addToast('error', error.message);
      } finally {
        setLoading(false);
      }
    };

    !auth?.accessToken ? verifyRefreshToken() : setLoading(false);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <>{loading ? <Spinner /> : <Outlet />}</>;
};

export default PersistLogin;
