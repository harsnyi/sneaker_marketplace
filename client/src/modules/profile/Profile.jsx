import '../../assets/css/profile.css';

import React from 'react';
import {useTitle} from '../../hooks/useTitle';

const Profile = () => {
  useTitle('Profil');

  return (
    <>
      <h1>Welcome To The Profile!</h1>
    </>
  );
};

export default Profile;
