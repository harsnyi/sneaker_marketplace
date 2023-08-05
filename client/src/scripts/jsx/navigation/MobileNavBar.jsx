import mobileNavStyle from '../../../assets/css/mobile_navbar.module.css';

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
import searchIcon from '../../../assets/images/logo&icon/magnifying-glass-solid.svg';

import {NavLink} from 'react-router-dom';

const MobileNavBar = () => {
  const location = window.location.pathname;

  return (
    <>
      <header className={mobileNavStyle['mobile-header-wrapper']}>
        <ul className={mobileNavStyle['header-list']}>
          <li className={mobileNavStyle['header-list-item']}>
            <span className={`${mobileNavStyle['header-link']} `}>
              <img className={mobileNavStyle['header-svg']} src={hamburgerIcon} alt="Menü" />
            </span>
            <span className={`${mobileNavStyle['header-link']} `}>
              <span className={mobileNavStyle['header-svg']}></span>
            </span>
            <NavLink to="/home" className={`${mobileNavStyle['logo']} `}>
              <img src={logo} className={mobileNavStyle['header-logo']} alt="Logo" />
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
    </>
  );
};

export default MobileNavBar;
