import '../../assets/css/navbar.css';

import logo from '../../assets/images/logo&icon/laced-logo.png';
import houseIcon from '../../assets/images/logo&icon/house-chimney-solid.svg';
import userIcon from '../../assets/images/logo&icon/user-solid.svg';
import bellIcon from '../../assets/images/logo&icon/bell-solid.svg';
import envelopeIcon from '../../assets/images/logo&icon/envelope-solid.svg';
import heartIcon from '../../assets/images/logo&icon/heart-solid.svg';
import uploadIcon from '../../assets/images/logo&icon/arrow-up-from-bracket-solid.svg';
import userGroupIcon from '../../assets/images/logo&icon/user-group-solid.svg';
import newsPaperIcon from '../../assets/images/logo&icon/newspaper-solid.svg';
import infoIcon from '../../assets/images/logo&icon/circle-info-solid.svg';
import phoneIcon from '../../assets/images/logo&icon/phone-solid.svg';
import loginIcon from '../../assets/images/logo&icon/right-to-bracket-solid.svg';
import signupIcon from '../../assets/images/logo&icon/user-plus-solid.svg';
import settingsIcon from '../../assets/images/logo&icon/gear-solid.svg';
import moreIcon from '../../assets/images/logo&icon/angles-right-solid.svg';
import logOutIcon from '../../assets/images/logo&icon/right-to-bracket-solid.svg';
import profilePicture from '../../assets/images/profile_pics/225746166_2006567569490591_3501118953375513610_n.jpg';

import {useEffect} from 'react';
import NavUserCard from './NavUserCard';

function delayNavbarText() {
  const navbarTextItems = document.querySelectorAll('.navbar-text');
  let delay = 0;

  navbarTextItems.forEach((item) => {
    item.style.transitionDelay = delay + 's';
    delay += 0.04;
  });
}

const NavBar = () => {
  useEffect(() => {
    delayNavbarText();
  }, []);

  return (
    <>
      <nav className="nav-bar">
        <ul className="nav-list">
          <li className="logo">
            <a href="" className="nav-link">
              <img src={logo} alt="" />
            </a>
          </li>

          <li className="nav-list-item">
            <a href="" className="active nav-link">
              <img className="navbar-svg" src={houseIcon} alt="" />
              <span className="navbar-text">Kezdőlap</span>
            </a>
          </li>

          <li className="nav-list-item">
            <a href="" className="nav-link">
              <img className="navbar-svg" src={userIcon} alt="" />
              <span className="navbar-text">Fiók</span>
            </a>
          </li>

          <li className="nav-list-item">
            <a href="" className="nav-link">
              <div className="notification-icon">
                <img className="navbar-svg" src={bellIcon} alt="" />
                <span className="new-notification"></span>
              </div>
              <span className="navbar-text">Értesítések</span>
            </a>
          </li>

          <li className="nav-list-item">
            <a href="" className="nav-link">
              <div className="notification-icon">
                <img className="navbar-svg" src={envelopeIcon} alt="" />
                <span className="new-notification"></span>
              </div>
              <span className="navbar-text">Üzenetek</span>
            </a>
          </li>

          <li className="nav-list-item">
            <a href="" className="nav-link">
              <img className="navbar-svg" src={heartIcon} alt="" />
              <span className="navbar-text">Kedvencek</span>
            </a>
          </li>

          <li className="nav-list-item last-in-group">
            <a href="" className="nav-link">
              <img className="navbar-svg" src={uploadIcon} alt="" />
              <span className="navbar-text">Eladás</span>
            </a>
          </li>

          <li className="nav-list-item">
            <a href="" className="nav-link">
              <img className="navbar-svg" src={userGroupIcon} alt="" />
              <span className="navbar-text">Közösség</span>
            </a>
          </li>

          <li className="nav-list-item">
            <a href="" className="nav-link">
              <img className="navbar-svg" src={newsPaperIcon} alt="" />
              <span className="navbar-text">Hírek</span>
            </a>
          </li>

          <li className="nav-list-item">
            <a href="" className="nav-link">
              <img className="navbar-svg" src={infoIcon} alt="" />
              <span className="navbar-text">Rólunk</span>
            </a>
          </li>

          <li className="nav-list-item last-in-group">
            <a href="" className="nav-link">
              <img className="navbar-svg" src={phoneIcon} alt="" />
              <span className="navbar-text"> Kapcsolat</span>
            </a>
          </li>

          <li className="nav-list-item">
            <a href="" className="nav-link">
              <img className="navbar-svg" src={loginIcon} alt="" />
              <span className="navbar-text">Bejelentkezés</span>
            </a>
          </li>

          <li className="nav-list-item last-in-group">
            <a href="" className="nav-link">
              <img className="navbar-svg" src={signupIcon} alt="" />
              <span className="navbar-text">Regisztráció</span>
            </a>
          </li>

          <li className="nav-list-item">
            <a href="" className="nav-link">
              <img className="navbar-svg" src={settingsIcon} alt="" />
              <span className="navbar-text">Beállítások</span>
            </a>
          </li>

          <li className="nav-list-item last-in-group">
            <a href="" className="nav-link">
              <img className="navbar-svg" src={moreIcon} alt="" />
              <span className="navbar-text">Több</span>
            </a>
          </li>

          <li className="nav-list-item">
            <a href="" className="nav-link">
              <img className="navbar-svg" src={logOutIcon} alt="" />
              <span className="navbar-text">Kijelentkezés</span>
            </a>
          </li>

          <li className="nav-list-item">
            <a href="" className="nav-link">
              <NavUserCard profilePicture={profilePicture} username="Felhasználónév" />
            </a>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default NavBar;
