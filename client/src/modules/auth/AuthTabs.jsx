import '../../assets/css/auth.css';

import {useLocation} from 'react-router';
import {useState, useEffect} from 'react';
import SignupForm from './SignupForm';
import LoginForm from './LoginForm';

const AuthTabs = () => {
  const [activeTab, setActiveTab] = useState();
  const location = useLocation();

  useEffect(() => {
    setActiveTab(location.hash === '#login' ? 1 : 2);
  }, [location.hash]);

  return (
    <>
      <div className="tabs-wrapper">
        <div className="tabs-header">
          <a href="#login" className={activeTab === 1 ? 'tabs-header-item active-tab' : 'tabs-header-item'}>
            <h3>Bejelentkezés</h3>
          </a>
          <a href="#signup" className={activeTab === 2 ? 'tabs-header-item active-tab' : 'tabs-header-item'}>
            <h3>Regisztráció</h3>
          </a>
        </div>
        <div className="tabs-content">
          <div className={activeTab === 1 ? 'tabs-content-item active-content' : 'tabs-content-item'}>
            <LoginForm />
          </div>
          <div className={activeTab === 2 ? 'tabs-content-item active-content' : 'tabs-content-item'}>
            <SignupForm />
          </div>
        </div>
      </div>
    </>
  );
};

export default AuthTabs;
