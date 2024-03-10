import {useQueryParam, StringParam, BooleanParam} from 'use-query-params';
import {useState, useEffect} from 'react';
import {motion} from 'framer-motion';

import Login from './Login';
import Signup from './Signup';
import ResetPassword from './ResetPassword';

const AuthTabs = () => {
  const [tab = 'log', setTab] = useQueryParam('tab', StringParam);

  const [showResetPass, setShowResetPass] = useQueryParam('resetpass', BooleanParam);

  const [initialLoad, setInitialLoad] = useState(true);

  useEffect(() => {
    setInitialLoad(false);
  }, []);

  return (
    <>
      {!showResetPass ? (
        <motion.div initial={initialLoad ? false : {x: showResetPass ? '100%' : '-100%'}} animate={{x: '0'}} exit={{x: showResetPass ? '-100%' : '100%'}} transition={{duration: 0.2, ease: [0.25, 0.46, 0.45, 0.94]}} className="tabs_wrapper">
          <div className="tabs_header">
            <span onClick={() => setTab('log')} className={tab === 'log' ? 'tabs_header_item active-tab' : 'tabs_header_item'}>
              <h3>Bejelentkezés</h3>
            </span>
            <span onClick={() => setTab('reg')} className={tab === 'reg' ? 'tabs_header_item active-tab' : 'tabs_header_item'}>
              <h3>Regisztráció</h3>
            </span>
          </div>
          <div className="tabs_content">
            <div className={tab === 'log' ? 'tabs_content_item active-content' : 'tabs_content_item'}>
              <Login setShowResetPass={setShowResetPass} />
            </div>
            <div className={tab === 'reg' ? 'tabs_content_item active-content' : 'tabs_content_item'}>
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
