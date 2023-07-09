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
import profileIcon from '../../assets/images/profile_pics/225746166_2006567569490591_3501118953375513610_n.jpg';

import {useEffect} from 'react';

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
        <div className="logo">
          <img src={logo} alt="" />
        </div>

        <ul>
          <li>
            <a href="" className="active">
              <img className="navbar-svg" src={houseIcon} alt="" />
              <span className="navbar-text">&ensp;&nbsp;Kezdőlap</span>
            </a>
          </li>

          <div className="account li-group">
            <li>
              <a href="">
                <img className="navbar-svg" src={userIcon} alt="" />
                <span className="navbar-text">&ensp;&nbsp;Fiók</span>
              </a>
            </li>
            <li>
              <a href="" className="bell-svg">
                <img className="navbar-svg" src={bellIcon} alt="" />
                <span className="new-notification"></span>
                <span className="navbar-text">&ensp;&nbsp;Értesítések</span>
              </a>
            </li>
            <li>
              <a href="" className="envelope-svg">
                <img className="navbar-svg" src={envelopeIcon} alt="" />
                <span className="new-notification"></span>
                <span className="navbar-text">&ensp;&nbsp;Üzenetek</span>
              </a>
            </li>
            <li>
              <a href="">
                <img className="navbar-svg" src={heartIcon} alt="" />
                <span className="navbar-text">&ensp;&nbsp;Kedvencek</span>
              </a>
            </li>
            <li>
              <a href="">
                <img className="navbar-svg" src={uploadIcon} alt="" />
                <span className="navbar-text">&ensp;&nbsp;Eladás</span>
              </a>
            </li>
          </div>

          <div className="dashboard li-group">
            <li>
              <a href="">
                <img className="navbar-svg" src={userGroupIcon} alt="" />
                <span className="navbar-text">&ensp;&nbsp;Közösség</span>
              </a>
            </li>
            <li>
              <a href="">
                <img className="navbar-svg" src={newsPaperIcon} alt="" />
                <span className="navbar-text">&ensp;&nbsp;Hírek</span>
              </a>
            </li>
            <li>
              <a href="">
                <img className="navbar-svg" src={infoIcon} alt="" />
                <span className="navbar-text">&ensp;&nbsp;Rólunk</span>
              </a>
            </li>
            <li>
              <a href="">
                <img className="navbar-svg" src={phoneIcon} alt="" />
                <span className="navbar-text"> &ensp;&nbsp;Kapcsolat</span>
              </a>
            </li>
          </div>

          <div className="signup-login li-group">
            <li>
              <a href="">
                <img className="navbar-svg" src={loginIcon} alt="" />
                <span className="navbar-text">&ensp;&nbsp;Bejelentkezés</span>
              </a>
            </li>
            <li>
              <a href="">
                <img className="navbar-svg" src={signupIcon} alt="" />
                <span className="navbar-text">&ensp;&nbsp;Regisztráció</span>
              </a>
            </li>
          </div>

          <div className="settings li-group">
            <li>
              <a href="">
                <img className="navbar-svg" src={settingsIcon} alt="" />
                <span className="navbar-text">&ensp;&nbsp;Beállítások</span>
              </a>
            </li>
            <li>
              <a href="">
                <img className="navbar-svg" src={moreIcon} alt="" />
                <span className="navbar-text">&ensp;&nbsp;Több</span>
              </a>
            </li>
          </div>

          <div className="li-group">
            <li>
              <a href="">
                <img className="navbar-svg" src={logOutIcon} alt="" />
                <span className="navbar-text">&ensp;&nbsp;Kijelentkezés</span>
              </a>
            </li>
          </div>
        </ul>
        <a className="user-profile-a" href="">
          <div className="profile-avatar">
            <img src={profileIcon} alt="" />
          </div>
          <span className="navbar-username">Felhasználónév</span>
        </a>
      </nav>
    </>
  );
};

export default NavBar;
