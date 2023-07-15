import dnavbar from '../../../assets/css/desktop_navbar.module.css';

import logo from '../../../assets/images/logo&icon/laced-logo.png';
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

import {useEffect} from 'react';
import NavUserCard from './NavUserCard';

function delayNavbarText() {
  const navbarTextItems = document.querySelectorAll(`.${dnavbar['navbar-text']}`);
  let delay = 0;

  navbarTextItems.forEach((item) => {
    item.style.transitionDelay = `${delay}s`;
    delay += 0.04;
  });
}

const NavBar = () => {
  useEffect(() => {
    delayNavbarText();
  }, []);

  return (
    <>
      <nav className={dnavbar['nav-bar']}>
        <ul className={dnavbar['nav-list']}>
          <li className={dnavbar.logo}>
            <a href="" className={dnavbar['nav-link']}>
              <img src={logo} alt="" />
            </a>
          </li>

          <li className={dnavbar['nav-list-item']}>
            <a href="" className={`${dnavbar.active} ${dnavbar['nav-link']}`}>
              <img className={dnavbar['navbar-svg']} src={houseIcon} alt="" />
              <span className={dnavbar['navbar-text']}>Kezdőlap</span>
            </a>
          </li>

          <li className={dnavbar['nav-list-item']}>
            <a href="" className={dnavbar['nav-link']}>
              <img className={dnavbar['navbar-svg']} src={userIcon} alt="" />
              <span className={dnavbar['navbar-text']}>Fiók</span>
            </a>
          </li>

          <li className={dnavbar['nav-list-item']}>
            <a href="" className={dnavbar['nav-link']}>
              <div className={dnavbar['notification-icon']}>
                <img className={dnavbar['navbar-svg']} src={bellIcon} alt="" />
                <span className={dnavbar['new-notification']}></span>
              </div>
              <span className={dnavbar['navbar-text']}>Értesítések</span>
            </a>
          </li>

          <li className={dnavbar['nav-list-item']}>
            <a href="" className={dnavbar['nav-link']}>
              <div className={dnavbar['notification-icon']}>
                <img className={dnavbar['navbar-svg']} src={envelopeIcon} alt="" />
                <span className={dnavbar['new-notification']}></span>
              </div>
              <span className={dnavbar['navbar-text']}>Üzenetek</span>
            </a>
          </li>

          <li className={dnavbar['nav-list-item']}>
            <a href="" className={dnavbar['nav-link']}>
              <img className={dnavbar['navbar-svg']} src={heartIcon} alt="" />
              <span className={dnavbar['navbar-text']}>Kedvencek</span>
            </a>
          </li>

          <li className={`${dnavbar['nav-list-item']} ${dnavbar['last-in-group']}`}>
            <a href="" className={dnavbar['nav-link']}>
              <img className={dnavbar['navbar-svg']} src={uploadIcon} alt="" />
              <span className={dnavbar['navbar-text']}>Eladás</span>
            </a>
          </li>

          <li className={dnavbar['nav-list-item']}>
            <a href="" className={dnavbar['nav-link']}>
              <img className={dnavbar['navbar-svg']} src={userGroupIcon} alt="" />
              <span className={dnavbar['navbar-text']}>Közösség</span>
            </a>
          </li>

          <li className={dnavbar['nav-list-item']}>
            <a href="" className={dnavbar['nav-link']}>
              <img className={dnavbar['navbar-svg']} src={newsPaperIcon} alt="" />
              <span className={dnavbar['navbar-text']}>Hírek</span>
            </a>
          </li>

          <li className={dnavbar['nav-list-item']}>
            <a href="" className={dnavbar['nav-link']}>
              <img className={dnavbar['navbar-svg']} src={infoIcon} alt="" />
              <span className={dnavbar['navbar-text']}>Rólunk</span>
            </a>
          </li>

          <li className={`${dnavbar['nav-list-item']} ${dnavbar['last-in-group']}`}>
            <a href="" className={dnavbar['nav-link']}>
              <img className={dnavbar['navbar-svg']} src={phoneIcon} alt="" />
              <span className={dnavbar['navbar-text']}> Kapcsolat</span>
            </a>
          </li>

          <li className={dnavbar['nav-list-item']}>
            <a href="" className={dnavbar['nav-link']}>
              <img className={dnavbar['navbar-svg']} src={loginIcon} alt="" />
              <span className={dnavbar['navbar-text']}>Bejelentkezés</span>
            </a>
          </li>

          <li className={`${dnavbar['nav-list-item']} ${dnavbar['last-in-group']}`}>
            <a href="" className={dnavbar['nav-link']}>
              <img className={dnavbar['navbar-svg']} src={signupIcon} alt="" />
              <span className={dnavbar['navbar-text']}>Regisztráció</span>
            </a>
          </li>

          <li className={dnavbar['nav-list-item']}>
            <a href="" className={dnavbar['nav-link']}>
              <img className={dnavbar['navbar-svg']} src={settingsIcon} alt="" />
              <span className={dnavbar['navbar-text']}>Beállítások</span>
            </a>
          </li>

          <li className={`${dnavbar['nav-list-item']} ${dnavbar['last-in-group']}`}>
            <a href="" className={dnavbar['nav-link']}>
              <img className={dnavbar['navbar-svg']} src={moreIcon} alt="" />
              <span className={dnavbar['navbar-text']}>Több</span>
            </a>
          </li>

          <li className={dnavbar['nav-list-item']}>
            <a href="" className={dnavbar['nav-link']}>
              <img className={dnavbar['navbar-svg']} src={logOutIcon} alt="" />
              <span className={dnavbar['navbar-text']}>Kijelentkezés</span>
            </a>
          </li>

          <li className={dnavbar['nav-list-item']}>
            <a href="" className={dnavbar['nav-link']}>
              <NavUserCard profilePicture={profilePicture} username="Felhasználónév" />
            </a>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default NavBar;
