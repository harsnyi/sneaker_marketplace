import '../../assets/css/profile.css';

import profileImage from '../../assets/images/profile_pictures/225746166_2006567569490591_3501118953375513610_n.jpg';
import React from 'react';
import {useTitle} from '../../hooks/useTitle';

const Profile = () => {
  useTitle('Profil');

  return (
    <>
      <div className="user-header">
        <div className="header-pre">
          <div className="user-background"></div>
        </div>
        <div className="user-profile-details">
          <div className="user-profile-image">
            <img src={profileImage} alt="Profilkép" />
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
