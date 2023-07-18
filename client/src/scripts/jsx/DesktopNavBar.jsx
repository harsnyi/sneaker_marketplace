import desktopNavStyle from '../../assets/css/desktop_navbar.module.css';

import logo from '../../assets/images/logo&icon/laced-logo.png';
import hamburgerIcon from '../../assets/images/logo&icon/bars-solid.svg';
import xMarkIcon from '../../assets/images/logo&icon/xmark-solid.svg';
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
import logOutIcon from '../../assets/images/logo&icon/right-from-bracket-solid.svg';
import profilePicture from '../../assets/images/profile_pics/225746166_2006567569490591_3501118953375513610_n.jpg';

import {useEffect} from 'react';
import NavUserCard from './NavUserCard';

function delayNavbarText() {
  const navbarTextItems = document.querySelectorAll(`.${desktopNavStyle['navbar-text']}`);
  let delay = 0;

  navbarTextItems.forEach((item) => {
    item.style.transitionDelay = `${delay}s`;
    delay += 0.04;
  });
}

const DesktopNavBar = () => {
  useEffect(() => {
    delayNavbarText();
  }, []);

  return (
    <>
      
      <nav className={desktopNavStyle['nav-bar']}>
        <div className={desktopNavStyle['open-close-sidebar']}>
          <img src={hamburgerIcon} alt="" />
        </div>
        <ul className={desktopNavStyle['nav-list']}>
          <li className={desktopNavStyle['logo']}>
   
            <a href="" className={desktopNavStyle['nav-link']}>
              <img src={logo} alt="" />
            </a>
          </li>

          <li className={desktopNavStyle['nav-list-item']}>
            <a href="" className={`${desktopNavStyle.active} ${desktopNavStyle['nav-link']}`}>
              <img className={desktopNavStyle['navbar-svg']} src={houseIcon} alt="" />
              <span className={desktopNavStyle['navbar-text']}>Kezdőlap</span>
            </a>
          </li>

          <li className={desktopNavStyle['nav-list-item']}>
            <a href="" className={desktopNavStyle['nav-link']}>
              <img className={desktopNavStyle['navbar-svg']} src={userIcon} alt="" />
              <span className={desktopNavStyle['navbar-text']}>Fiók</span>
            </a>
          </li>

          <li className={desktopNavStyle['nav-list-item']}>
            <a href="" className={desktopNavStyle['nav-link']}>
              <div className={desktopNavStyle['notification-icon']}>
                <img className={desktopNavStyle['navbar-svg']} src={bellIcon} alt="" />
                <span className={desktopNavStyle['new-notification']}></span>
              </div>
              <span className={desktopNavStyle['navbar-text']}>Értesítések</span>
            </a>
          </li>

          <li className={desktopNavStyle['nav-list-item']}>
            <a href="" className={desktopNavStyle['nav-link']}>
              <div className={desktopNavStyle['notification-icon']}>
                <img className={desktopNavStyle['navbar-svg']} src={envelopeIcon} alt="" />
                <span className={desktopNavStyle['new-notification']}></span>
              </div>
              <span className={desktopNavStyle['navbar-text']}>Üzenetek</span>
            </a>
          </li>

          <li className={desktopNavStyle['nav-list-item']}>
            <a href="" className={desktopNavStyle['nav-link']}>
              <img className={desktopNavStyle['navbar-svg']} src={heartIcon} alt="" />
              <span className={desktopNavStyle['navbar-text']}>Kedvencek</span>
            </a>
          </li>

          <li className={`${desktopNavStyle['nav-list-item']} ${desktopNavStyle['last-in-group']}`}>
            <a href="" className={desktopNavStyle['nav-link']}>
              <img className={desktopNavStyle['navbar-svg']} src={uploadIcon} alt="" />
              <span className={desktopNavStyle['navbar-text']}>Eladás</span>
            </a>
          </li>

          <li className={desktopNavStyle['nav-list-item']}>
            <a href="" className={desktopNavStyle['nav-link']}>
              <img className={desktopNavStyle['navbar-svg']} src={userGroupIcon} alt="" />
              <span className={desktopNavStyle['navbar-text']}>Közösség</span>
            </a>
          </li>

          <li className={desktopNavStyle['nav-list-item']}>
            <a href="" className={desktopNavStyle['nav-link']}>
              <img className={desktopNavStyle['navbar-svg']} src={newsPaperIcon} alt="" />
              <span className={desktopNavStyle['navbar-text']}>Hírek</span>
            </a>
          </li>

          <li className={desktopNavStyle['nav-list-item']}>
            <a href="" className={desktopNavStyle['nav-link']}>
              <img className={desktopNavStyle['navbar-svg']} src={infoIcon} alt="" />
              <span className={desktopNavStyle['navbar-text']}>Rólunk</span>
            </a>
          </li>

          <li className={`${desktopNavStyle['nav-list-item']} ${desktopNavStyle['last-in-group']}`}>
            <a href="" className={desktopNavStyle['nav-link']}>
              <img className={desktopNavStyle['navbar-svg']} src={phoneIcon} alt="" />
              <span className={desktopNavStyle['navbar-text']}> Kapcsolat</span>
            </a>
          </li>

          <li className={desktopNavStyle['nav-list-item']}>
            <a href="" className={desktopNavStyle['nav-link']}>
              <img className={desktopNavStyle['navbar-svg']} src={loginIcon} alt="" />
              <span className={desktopNavStyle['navbar-text']}>Bejelentkezés</span>
            </a>
          </li>

          <li className={`${desktopNavStyle['nav-list-item']} ${desktopNavStyle['last-in-group']}`}>
            <a href="" className={desktopNavStyle['nav-link']}>
              <img className={desktopNavStyle['navbar-svg']} src={signupIcon} alt="" />
              <span className={desktopNavStyle['navbar-text']}>Regisztráció</span>
            </a>
          </li>

          <li className={desktopNavStyle['nav-list-item']}>
            <a href="" className={desktopNavStyle['nav-link']}>
              <img className={desktopNavStyle['navbar-svg']} src={settingsIcon} alt="" />
              <span className={desktopNavStyle['navbar-text']}>Beállítások</span>
            </a>
          </li>

          <li className={`${desktopNavStyle['nav-list-item']} ${desktopNavStyle['last-in-group']}`}>
            <a href="" className={desktopNavStyle['nav-link']}>
              <img className={desktopNavStyle['navbar-svg']} src={moreIcon} alt="" />
              <span className={desktopNavStyle['navbar-text']}>Több</span>
            </a>
          </li>

          <li className={desktopNavStyle['nav-list-item']}>
            <a href="" className={desktopNavStyle['nav-link']}>
              <img className={desktopNavStyle['navbar-svg']} src={logOutIcon} alt="" />
              <span className={desktopNavStyle['navbar-text']}>Kijelentkezés</span>
            </a>
          </li>

          <li className={desktopNavStyle['nav-list-item']}>
            <a href="" className={desktopNavStyle['nav-link']}>
              <NavUserCard profilePicture={profilePicture} username="Felhasználónév" />
            </a>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default DesktopNavBar;
