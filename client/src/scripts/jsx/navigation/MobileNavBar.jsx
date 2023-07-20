import mobileNavStyle from '../../../assets/css/mobile_navbar.module.css';

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

const MobileNavBar = () => {
  return (
    <>
      <nav className={mobileNavStyle['nav-bar']}>
        <ul className={mobileNavStyle['nav-list']}>
          <li className={mobileNavStyle['nav-list-item']}>
            <a href="" className={mobileNavStyle['nav-link']}>
              <img className={mobileNavStyle['navbar-svg']} src={houseIcon} alt="" />
            </a>
          </li>

          <li className={mobileNavStyle['nav-list-item']}>
            <a href="" className={mobileNavStyle['nav-link']}>
              <img className={mobileNavStyle['navbar-svg']} src={heartIcon} alt="" />
            </a>
          </li>

          <li className={mobileNavStyle['nav-list-item']}>
            <a href="" className={mobileNavStyle['nav-link']}>
              <img className={mobileNavStyle['navbar-svg']} src={uploadIcon} alt="" />
            </a>
          </li>

          <li className={mobileNavStyle['nav-list-item']}>
            <a href="" className={mobileNavStyle['nav-link']}>
              <div className={mobileNavStyle['notification-icon']}>
                <img className={mobileNavStyle['navbar-svg']} src={envelopeIcon} alt="" />
                <span className={mobileNavStyle['new-notification']}></span>
              </div>
            </a>
          </li>

          <li className={mobileNavStyle['nav-list-item']}>
            <a href="" className={mobileNavStyle['nav-link']}>
              <div className={mobileNavStyle['notification-icon']}>
                <img className={mobileNavStyle['navbar-svg']} src={bellIcon} alt="" />
                <span className={mobileNavStyle['new-notification']}></span>
              </div>
            </a>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default MobileNavBar;
