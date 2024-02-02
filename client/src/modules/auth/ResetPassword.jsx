import React from 'react';
import {motion} from 'framer-motion';

const ResetPassword = ({setShowResetPass}) => {
  return (
    <motion.div initial={{x: '100%'}} animate={{x: '0'}} exit={{x: '100%'}} transition={{duration: 0.2, ease: [0.25, 0.46, 0.45, 0.94]}} className="reset-password-wrapper">
      <p onClick={() => setShowResetPass(false)}>Vissza a bejelentkezéshez</p>
      <div className="reset-password-body">
        <h1>Jelszó helyreállítása</h1>
      </div>
    </motion.div>
  );
};

export default ResetPassword;
