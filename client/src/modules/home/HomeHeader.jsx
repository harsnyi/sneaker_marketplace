import Button from '../../common/Button';
import Avatar from './Avatar';
import AuthenticationPage from '../auth/AuthenticationPage';

import {useState} from 'react';

import avatarPic from '../../assets/images/profile_pics/IMG_0205.jpeg';

const HomeHeader = () => {
  const [isAuthOpen, setIsAuthOpen] = useState(false);

  const navigateToSignup = () => {
    window.location.hash = '#signup';

    setIsAuthOpen(true);
  };

  return (
    <>
      {isAuthOpen && <AuthenticationPage isAuthOpen={isAuthOpen} setIsAuthOpen={setIsAuthOpen} />}
      <section className="home-header-content">
        <h1>Footwr.</h1>
        <h4>
          Magyarország első
          <br />
          hivatalos sneaker piactere.
        </h4>
        <Button text="Csatlakozz Te is!" className="btn-light" onClick={navigateToSignup} />
        <div className="avatar-group">
          <Avatar src={avatarPic} alt="" />
          <Avatar src={avatarPic} alt="" />
          <Avatar src={avatarPic} alt="" />
          <Avatar src={avatarPic} alt="" />
          <Avatar src={avatarPic} alt="" />
        </div>
        <p className="more-users">
          és további <span>15261</span> ...
        </p>
      </section>
    </>
  );
};

export default HomeHeader;
