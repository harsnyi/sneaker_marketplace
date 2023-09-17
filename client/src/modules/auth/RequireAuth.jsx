import {useLocation, Navigate, Outlet} from 'react-router';
import useAuth from '../../hooks/useAuth';

const RequireAuth = ({allowedRole}) => {
  const {auth} = useAuth();
  const location = useLocation();

  return auth?.role >= allowedRole ? <Outlet /> : <Navigate to="/home#login" state={{from: location}} replace />;
};

export default RequireAuth;
