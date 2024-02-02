import {useQueryParam, StringParam} from 'use-query-params';
import {useState, useEffect} from 'react';
import {useTitle} from '../../hooks/useTitle';
import {motion} from 'framer-motion';

import Login from './Login';
import Signup from './Signup';
import ResetPassword from './ResetPassword';

const AuthTabs = () => {
  const [tab = 'log', setTab] = useQueryParam('tab', StringParam);
  useTitle(tab === 'log' ? 'Bejelentkezés' : 'Regisztráció');

  const [showResetPass, setShowResetPass] = useState(false);

  const [initialLoad, setInitialLoad] = useState(true);

  useEffect(() => {
    setInitialLoad(false);
  }, []);

  return (
    <>
      {!showResetPass ? (
        <motion.div initial={initialLoad ? false : {x: showResetPass ? '100%' : '-100%'}} animate={{x: '0'}} exit={{x: showResetPass ? '-100%' : '100%'}} transition={{duration: 0.2, ease: [0.25, 0.46, 0.45, 0.94]}} className="tabs-wrapper">
          <div className="tabs-header">
            <span onClick={() => setTab('log')} className={tab === 'log' ? 'tabs-header-item active-tab' : 'tabs-header-item'}>
              <h3>Bejelentkezés</h3>
            </span>
            <span onClick={() => setTab('reg')} className={tab === 'reg' ? 'tabs-header-item active-tab' : 'tabs-header-item'}>
              <h3>Regisztráció</h3>
            </span>
          </div>
          <div className="tabs-content">
            <div className={tab === 'log' ? 'tabs-content-item active-content' : 'tabs-content-item'}>
              <Login setShowResetPass={setShowResetPass} />
            </div>
            <div className={tab === 'reg' ? 'tabs-content-item active-content' : 'tabs-content-item'}>
              <Signup />
            </div>
          </div>
        </motion.div>
      ) : (
        <ResetPassword setShowResetPass={setShowResetPass} />
      )}
    </>
  );
};

export default AuthTabs;
