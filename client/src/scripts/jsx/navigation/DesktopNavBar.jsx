import desktopNavStyle from '../../../assets/css/desktop_navbar.module.css';

import logo from '../../../assets/images/logo&icon/laced-logo.png';
import hamburgerIcon from '../../../assets/images/logo&icon/bars-solid.svg';
import xMarkIcon from '../../../assets/images/logo&icon/xmark-solid.svg';
import houseIcon from '../../../assets/images/logo&icon/house-chimney-solid.svg';
import userIcon from '../../../assets/images/logo&icon/user-solid.svg';
import bellIcon from '../../../assets/images/logo&icon/bell-solid.svg';
import envelopeIcon from '../../../assets/images/logo&icon/envelope-solid.svg';
import heartIcon from '../../../assets/images/logo&icon/heart-solid.svg';
import uploadIcon from '../../../assets/images/logo&icon/arrow-up-from-bracket-solid.svg';
import userGroupIcon from '../../../assets/images/logo&icon/user-group-solid.svg';
import newsPaperIcon from '../../../assets/images/logo&icon/newspaper-solid.svg';
import infoIcon from '../../../assets/images/logo&icon/circle-info-solid.svg';
import phoneIcon from '../../../assets/images/logo&icon/phone-solid.svg';
import loginIcon from '../../../assets/images/logo&icon/right-to-bracket-solid.svg';
import signupIcon from '../../../assets/images/logo&icon/user-plus-solid.svg';
import settingsIcon from '../../../assets/images/logo&icon/gear-solid.svg';
import moreIcon from '../../../assets/images/logo&icon/angles-right-solid.svg';
import logOutIcon from '../../../assets/images/logo&icon/right-from-bracket-solid.svg';
import profilePicture from '../../../assets/images/profile_pics/225746166_2006567569490591_3501118953375513610_n.jpg';

import React, {useEffect, useState} from 'react';
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

  const [isNavOpen, setIsNavOpen] = useState(false);
  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };

  const navbarClassNames = `${desktopNavStyle['nav-bar']} ${isNavOpen ? desktopNavStyle['opened'] : desktopNavStyle['closed']}`;

  return (
    <>
      
      <nav className={navbarClassNames}>
        <div className={desktopNavStyle['open-close-sidebar']} onClick={toggleNav} title='Menü'>
          <img src={isNavOpen ? xMarkIcon : hamburgerIcon} alt="Menü" />
        </div>
        <ul className={desktopNavStyle['nav-list']}>
          <li className={desktopNavStyle['logo']}>
   
            <a href="" className={desktopNavStyle['nav-link']}>
              <img src={logo} alt="" />
            </a>
          </li>

          <li className={desktopNavStyle['nav-list-item']} title='Kezdőlap'>
            <a href="" className={`${desktopNavStyle.active} ${desktopNavStyle['nav-link']}`}>
              <img className={desktopNavStyle['navbar-svg']} src={houseIcon} alt="Kezdőlap" />
              <span className={desktopNavStyle['navbar-text']}>Kezdőlap</span>
            </a>
          </li>

          <li className={desktopNavStyle['nav-list-item']}  title='Fiók'>
            <a href="" className={desktopNavStyle['nav-link']}>
              <img className={desktopNavStyle['navbar-svg']} src={userIcon} alt="Fiók"/>
              <span className={desktopNavStyle['navbar-text']}>Fiók</span>
            </a>
          </li>

          <li className={desktopNavStyle['nav-list-item']} title='Értesítések'>
            <a href="" className={desktopNavStyle['nav-link']}>
              <div className={desktopNavStyle['notification-icon']}>
                <img className={desktopNavStyle['navbar-svg']} src={bellIcon} alt="Értesítések" />
                <span className={desktopNavStyle['new-notification']}></span>
              </div>
              <span className={desktopNavStyle['navbar-text']}>Értesítések</span>
            </a>
          </li>

          <li className={desktopNavStyle['nav-list-item']} title='Üzenetek'>
            <a href="" className={desktopNavStyle['nav-link']}>
              <div className={desktopNavStyle['notification-icon']}>
                <img className={desktopNavStyle['navbar-svg']} src={envelopeIcon} alt="Üzenetek" />
                <span className={desktopNavStyle['new-notification']}></span>
              </div>
              <span className={desktopNavStyle['navbar-text']}>Üzenetek</span>
            </a>
          </li>

          <li className={desktopNavStyle['nav-list-item']} title='Kedvencek'>
            <a href="" className={desktopNavStyle['nav-link']}>
              <img className={desktopNavStyle['navbar-svg']} src={heartIcon} alt="Kedvencek" />
              <span className={desktopNavStyle['navbar-text']}>Kedvencek</span>
            </a>
          </li>

          <li className={`${desktopNavStyle['nav-list-item']} ${desktopNavStyle['last-in-group']}`}  title='Eladás'>
            <a href="" className={desktopNavStyle['nav-link']}>
              <img className={desktopNavStyle['navbar-svg']} src={uploadIcon} alt="Eladás"/>
              <span className={desktopNavStyle['navbar-text']}>Eladás</span>
            </a>
          </li>

          <li className={desktopNavStyle['nav-list-item']} title='Közösség'>
            <a href="" className={desktopNavStyle['nav-link']}>
              <img className={desktopNavStyle['navbar-svg']} src={userGroupIcon} alt="Közösség" />
              <span className={desktopNavStyle['navbar-text']}>Közösség</span>
            </a>
          </li>

          <li className={desktopNavStyle['nav-list-item']} title='Hírek'>
            <a href="" className={desktopNavStyle['nav-link']}>
              <img className={desktopNavStyle['navbar-svg']} src={newsPaperIcon} alt="Hírek"  />
              <span className={desktopNavStyle['navbar-text']}>Hírek</span>
            </a>
          </li>

          <li className={desktopNavStyle['nav-list-item']} title='Rólunk'>
            <a href="" className={desktopNavStyle['nav-link']}>
              <img className={desktopNavStyle['navbar-svg']} src={infoIcon} alt="Rólunk"  />
              <span className={desktopNavStyle['navbar-text']}>Rólunk</span>
            </a>
          </li>

          <li className={`${desktopNavStyle['nav-list-item']} ${desktopNavStyle['last-in-group']}`}  title='Kapcsolat'>
            <a href="" className={desktopNavStyle['nav-link']}>
              <img className={desktopNavStyle['navbar-svg']} src={phoneIcon} alt="Kapcsolat" />
              <span className={desktopNavStyle['navbar-text']}>Kapcsolat</span>
            </a>
          </li>

          <li className={desktopNavStyle['nav-list-item']} title='Bejelentkezés'>
            <a href="" className={desktopNavStyle['nav-link']}>
              <img className={desktopNavStyle['navbar-svg']} src={loginIcon} alt="Bejelentkezés"  />
              <span className={desktopNavStyle['navbar-text']}>Bejelentkezés</span>
            </a>
          </li>

          <li className={`${desktopNavStyle['nav-list-item']} ${desktopNavStyle['last-in-group']}`} title='Regisztráció'>
            <a href="" className={desktopNavStyle['nav-link']}>
              <img className={desktopNavStyle['navbar-svg']} src={signupIcon} alt="Regisztráció"  />
              <span className={desktopNavStyle['navbar-text']}>Regisztráció</span>
            </a>
          </li>

          <li className={desktopNavStyle['nav-list-item']} title='Beállítások'>
            <a href="" className={desktopNavStyle['nav-link']}>
              <img className={desktopNavStyle['navbar-svg']} src={settingsIcon} alt="Beállítások"  />
              <span className={desktopNavStyle['navbar-text']}>Beállítások</span>
            </a>
          </li>

          <li className={`${desktopNavStyle['nav-list-item']} ${desktopNavStyle['last-in-group']}`} title='Több'>
            <a href="" className={desktopNavStyle['nav-link']}>
              <img className={desktopNavStyle['navbar-svg']} src={moreIcon} alt="Több" />
              <span className={desktopNavStyle['navbar-text']}>Több</span>
            </a>
          </li>

          <li className={desktopNavStyle['nav-list-item']} title='Kijelentkezés'>
            <a href="" className={desktopNavStyle['nav-link']}>
              <img className={desktopNavStyle['navbar-svg']} src={logOutIcon} alt="Kijelentkezés"  />
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