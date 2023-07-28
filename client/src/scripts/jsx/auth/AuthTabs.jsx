import {useState} from 'react';
import SignupForm from './SignupForm';
import LoginForm from './LoginForm';

const AuthTabs = () => {
  const [activeTab, setActiveTab] = useState(1);

  const toggleTab = (index) => {
    setActiveTab(index);
  };

  return (
    <>
      <div className="tabs-wrapper">
        <div className="tabs-header">
          <div className={activeTab === 1 ? 'tabs-header-item active-tab' : 'tabs-header-item'} onClick={() => toggleTab(1)}>
            <h3>Bejelentkezés</h3>
          </div>
          <div className={activeTab === 2 ? 'tabs-header-item active-tab' : 'tabs-header-item'} onClick={() => toggleTab(2)}>
            <h3>Regisztráció</h3>
          </div>
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
