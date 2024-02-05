import {Outlet} from 'react-router-dom';
import {useState, useEffect} from 'react';
import {useRefreshToken} from '../../hooks/useRefreshToken';
import {useAuth} from '../../hooks/useAuth';
import {useToast} from '../../hooks/useToast';

const PersistLogin = () => {
  const [loading, setLoading] = useState(true);
  const refresh = useRefreshToken();
  const {auth} = useAuth();

  const {addToast} = useToast();

  useEffect(() => {
    const verifyRefreshToken = async () => {
      try {
      } catch (error) {
        addToast('error', error.message);
      } finally {
        setLoading(false);
      }
    };
  }, []);
};

export default PersistLogin;
