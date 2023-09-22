import mobileNavStyle from '../../assets/css/mobile_navbar.module.css';

import hamburgerIcon from '../../assets/icons/bars-solid.svg';
import xMarkIcon from '../../assets/icons/xmark-solid.svg';
import houseIcon from '../../assets/icons/house-chimney-solid.svg';
import userIcon from '../../assets/icons/user-solid.svg';
import bellIcon from '../../assets/icons/bell-solid.svg';
import envelopeIcon from '../../assets/icons/envelope-solid.svg';
import heartIcon from '../../assets/icons/heart-solid.svg';
import uploadIcon from '../../assets/icons/arrow-up-from-bracket-solid.svg';
import userGroupIcon from '../../assets/icons/user-group-solid.svg';
import auctionHammerIcon from '../../assets/icons/gavel-solid.svg';
import newsPaperIcon from '../../assets/icons/newspaper-solid.svg';
import infoIcon from '../../assets/icons/circle-info-solid.svg';
import phoneIcon from '../../assets/icons/phone-solid.svg';
import loginIcon from '../../assets/icons/right-to-bracket-solid.svg';
import signupIcon from '../../assets/icons/user-plus-solid.svg';
import settingsIcon from '../../assets/icons/gear-solid.svg';
import moreIcon from '../../assets/icons/angles-right-solid.svg';
import logOutIcon from '../../assets/icons/right-from-bracket-solid.svg';
import profilePicture from '../../assets/images/profile_pics/225746166_2006567569490591_3501118953375513610_n.jpg';
import searchIcon from '../../assets/icons/magnifying-glass-solid.svg';

import {NavLink} from 'react-router-dom';
import {useState} from 'react';

import NavUserCard from './NavUserCard';
import PopUp from '../../common/PopUp';
import AuthTabs from '../auth/AuthTabs';
import Logout from '../auth/Logout';

const MobileNavBar = () => {
  const location = window.location.pathname;

  const [isNavOpen, setIsNavOpen] = useState(false);
  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };

  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const toggleAuth = () => {
    setIsAuthOpen(true);
  };

  const [isLogoutOpen, setIsLogoutOpen] = useState(false);
  const toggleLogout = () => {
    setIsLogoutOpen(true);
  };

  function scrollToBottom() {
    setIsNavOpen(false);

    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth',
    });
  }

  const navbarClassNames = `${mobileNavStyle['nav-aside-wrapper']} ${isNavOpen ? mobileNavStyle['opened'] : mobileNavStyle['closed']}`;
  return (
    <>
      <header className={mobileNavStyle['mobile-header-wrapper']}>
        <ul className={mobileNavStyle['header-list']}>
          <li className={mobileNavStyle['header-list-item']}>
            <span className={`${mobileNavStyle['header-link']} `} onClick={toggleNav}>
              <img className={mobileNavStyle['header-svg']} src={isNavOpen ? xMarkIcon : hamburgerIcon} alt="Menü" />
            </span>
            <span className={`${mobileNavStyle['header-link']} `}>
              <span className={mobileNavStyle['header-svg']}></span>
            </span>
            <NavLink to="/home" className={`${mobileNavStyle['logo']} `}>
              <h2>Footwr.</h2>
            </NavLink>
            <span className={`${mobileNavStyle['header-link']} `}>
              <img className={mobileNavStyle['header-svg']} src={searchIcon} alt="Menü" />
            </span>
            <NavLink to="/profile" className={`${mobileNavStyle['header-link']} `}>
              <img className={mobileNavStyle['header-svg']} src={userIcon} alt="Fiók" />
            </NavLink>
          </li>
        </ul>
      </header>

      <aside className={navbarClassNames}>
        <div className={mobileNavStyle['nav-aside']}>
          <ul className={mobileNavStyle['side-list']}>
            <li className={mobileNavStyle['side-list-item']}>
              <NavLink to="/community" className={`${mobileNavStyle['side-link']} ${location === '/community' ? mobileNavStyle['active'] : mobileNavStyle['inactive']}`}>
                <img className={mobileNavStyle['side-svg']} src={userGroupIcon} alt="Közösség" />
                <span className={mobileNavStyle['side-text']}>Közösség</span>
              </NavLink>
            </li>

            <li className={mobileNavStyle['side-list-item']}>
              <NavLink to="/auction" className={`${mobileNavStyle['side-link']} ${location === '/auction' ? mobileNavStyle['active'] : mobileNavStyle['inactive']}`}>
                <img className={mobileNavStyle['side-svg']} src={auctionHammerIcon} alt="Licitek" />
                <span className={mobileNavStyle['side-text']}>Licitek</span>
              </NavLink>
            </li>

            <li className={mobileNavStyle['side-list-item']}>
              <NavLink to="/news" className={`${mobileNavStyle['side-link']} ${location === '/news' ? mobileNavStyle['active'] : mobileNavStyle['inactive']}`}>
                <img className={mobileNavStyle['side-svg']} src={newsPaperIcon} alt="Hírek" />
                <span className={mobileNavStyle['side-text']}>Hírek</span>
              </NavLink>
            </li>

            <li className={mobileNavStyle['side-list-item']}>
              <NavLink to="/about" className={`${mobileNavStyle['side-link']} ${location === '/about' ? mobileNavStyle['active'] : mobileNavStyle['inactive']}`}>
                <img className={mobileNavStyle['side-svg']} src={infoIcon} alt="Rólunk" />
                <span className={mobileNavStyle['side-text']}>Rólunk</span>
              </NavLink>
            </li>

            <li className={`${mobileNavStyle['side-list-item']} ${mobileNavStyle['last-in-group']}`}>
              <NavLink to="/contact" className={`${mobileNavStyle['side-link']} ${location === '/contact' ? mobileNavStyle['active'] : mobileNavStyle['inactive']}`}>
                <img className={mobileNavStyle['side-svg']} src={phoneIcon} alt="Kapcsolat" />
                <span className={mobileNavStyle['side-text']}>Kapcsolat</span>
              </NavLink>
            </li>

            <li className={mobileNavStyle['side-list-item']}>
              <a href="#login" onClick={toggleAuth} className={mobileNavStyle['side-link']}>
                <img className={mobileNavStyle['side-svg']} src={loginIcon} alt="Bejelentkezés" />
                <span className={mobileNavStyle['side-text']}>Bejelentkezés</span>
              </a>
            </li>

            <li className={`${mobileNavStyle['side-list-item']} ${mobileNavStyle['last-in-group']}`}>
              <a href="#signup" onClick={toggleAuth} className={mobileNavStyle['side-link']}>
                <img className={mobileNavStyle['side-svg']} src={signupIcon} alt="Regisztráció" />
                <span className={mobileNavStyle['side-text']}>Regisztráció</span>
              </a>
            </li>

            <li className={mobileNavStyle['side-list-item']}>
              <NavLink to="/settings" className={`${mobileNavStyle['side-link']} ${location === '/settings' ? mobileNavStyle['active'] : mobileNavStyle['inactive']}`}>
                <img className={mobileNavStyle['side-svg']} src={settingsIcon} alt="Beállítások" />
                <span className={mobileNavStyle['side-text']}>Beállítások</span>
              </NavLink>
            </li>

            <li className={`${mobileNavStyle['side-list-item']} ${mobileNavStyle['last-in-group']}`} onClick={scrollToBottom}>
              <NavLink to="#more" className={mobileNavStyle['side-link']}>
                <img className={mobileNavStyle['side-svg']} src={moreIcon} alt="Több" />
                <span className={mobileNavStyle['side-text']}>Több</span>
              </NavLink>
            </li>

            <li className={mobileNavStyle['side-list-item']}>
              <a href="#logout" onClick={toggleLogout} className={mobileNavStyle['side-link']}>
                <img className={mobileNavStyle['side-svg']} src={logOutIcon} alt="Kijelentkezés" />
                <span className={mobileNavStyle['side-text']}>Kijelentkezés</span>
              </a>
            </li>

            <li className={mobileNavStyle['side-list-item']}>
              <NavLink to="/profile" className={mobileNavStyle['side-link']}>
                <NavUserCard profilePicture={profilePicture} username="Felhasználónév" divClassName={mobileNavStyle['profile-avatar']} spanClassName={mobileNavStyle['side-username']} />
              </NavLink>
            </li>
          </ul>
        </div>
      </aside>

      <nav className={mobileNavStyle['nav-bar']}>
        <ul className={mobileNavStyle['nav-list']}>
          <li className={mobileNavStyle['nav-list-item']}>
            <NavLink to="/home" className={`${mobileNavStyle['nav-link']} ${location === '/home' || location === '/' ? mobileNavStyle['active'] : mobileNavStyle['inactive']}`}>
              <img className={mobileNavStyle['navbar-svg']} src={houseIcon} alt="Kezdőlap" />
            </NavLink>
          </li>

          <li className={mobileNavStyle['nav-list-item']}>
            <NavLink to="/favourites" className={`${mobileNavStyle['nav-link']} ${location === '/favourites' ? mobileNavStyle['active'] : mobileNavStyle['inactive']}`}>
              <img className={mobileNavStyle['navbar-svg']} src={heartIcon} alt="Kedvencek" />
            </NavLink>
          </li>

          <li className={`${mobileNavStyle['nav-list-item']}`}>
            <NavLink to="/selling" className={`${mobileNavStyle['nav-link']} ${location === '/selling' ? mobileNavStyle['active'] : mobileNavStyle['inactive']} `}>
              <img className={mobileNavStyle['navbar-svg']} src={uploadIcon} alt="Eladás" />
            </NavLink>
          </li>

          <li className={mobileNavStyle['nav-list-item']}>
            <NavLink to="/messages" className={`${mobileNavStyle['nav-link']} ${location === '/messages' ? mobileNavStyle['active'] : mobileNavStyle['inactive']}`}>
              <div className={mobileNavStyle['notification-icon']}>
                <img className={mobileNavStyle['navbar-svg']} src={envelopeIcon} alt="Üzenetek" />
                <span className={mobileNavStyle['new-notification']}></span>
              </div>
            </NavLink>
          </li>

          <li className={mobileNavStyle['nav-list-item']}>
            <NavLink to="/notifications" className={`${mobileNavStyle['nav-link']} ${location === '/notifications' ? mobileNavStyle['active'] : mobileNavStyle['inactive']}`}>
              <div className={mobileNavStyle['notification-icon']}>
                <img className={mobileNavStyle['navbar-svg']} src={bellIcon} alt="Értesítések" />
                <span className={mobileNavStyle['new-notification']}></span>
              </div>
            </NavLink>
          </li>
        </ul>
      </nav>

      {isAuthOpen && (
        <PopUp isAuthOpen={isAuthOpen} setIsAuthOpen={setIsAuthOpen}>
          <AuthTabs />
        </PopUp>
      )}

      {isLogoutOpen && (
        <PopUp isLogoutOpen={isLogoutOpen} setIsLogoutOpen={setIsLogoutOpen}>
          <Logout />
        </PopUp>
      )}
    </>
  );
};

export default MobileNavBar;
