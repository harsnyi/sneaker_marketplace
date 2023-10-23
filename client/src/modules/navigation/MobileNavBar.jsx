import mobileNavStyle from '../../assets/css/mobile_navbar.module.css';

import React, {useState} from 'react';
import {NavLink, useLocation, useNavigate} from 'react-router-dom';
import {useLoader} from '../../hooks/useLoader';
import {useToast} from '../../hooks/useToast';

import profileImage from '../../assets/images/profile_pictures/225746166_2006567569490591_3501118953375513610_n.jpg';
import {CgMenuGridO, CgClose} from 'react-icons/cg';
import {AiFillHome, AiOutlineHome} from 'react-icons/ai';
import {BiSearchAlt, BiSolidSearchAlt2} from 'react-icons/bi';
import {MdAccountBox, MdOutlineAccountBox} from 'react-icons/md';
import {IoNotificationsSharp} from 'react-icons/io5';
import {IoMdNotificationsOutline} from 'react-icons/io';
import {BiSolidMessageSquareDetail, BiMessageSquareDetail} from 'react-icons/bi';
import {MdFavorite, MdFavoriteBorder} from 'react-icons/md';
import {MdSell, MdOutlineSell} from 'react-icons/md';
import {BsPeopleFill, BsPeople} from 'react-icons/bs';
import {RiAuctionFill, RiAuctionLine} from 'react-icons/ri';
import {IoNewspaperSharp, IoNewspaperOutline} from 'react-icons/io5';
import {BsInfoSquareFill, BsInfoSquare} from 'react-icons/bs';
import {MdPhoneInTalk, MdOutlinePhoneInTalk} from 'react-icons/md';
import {IoSettings, IoSettingsOutline} from 'react-icons/io5';
import {TfiMore, TfiMoreAlt} from 'react-icons/tfi';
import {RiLogoutBoxLine} from 'react-icons/ri';

const MobileNavbar = () => {
  const location = useLocation().pathname;
  const navigate = useNavigate();
  const {showLoader, hideLoader} = useLoader();
  const {addToast} = useToast();

  const [isNavOpen, setIsNavOpen] = useState(false);

  const navbarClassNames = `${mobileNavStyle['nav-aside-wrapper']} ${isNavOpen ? mobileNavStyle['opened'] : ''}`;

  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };

  const handleLogOut = (e) => {
    e.preventDefault();
    showLoader();

    // logout logic

    setTimeout(() => {
      hideLoader();
      addToast('success', 'Sikeres kijelentkezés!');
      navigate('/auth');
    }, 1000);
  };

  return (
    <>
      <header className={mobileNavStyle['mobile-header-wrapper']}>
        <ul className={mobileNavStyle['header-list']}>
          <li className={mobileNavStyle['header-list-item']}>
            <span className={`${mobileNavStyle['header-link']} `} onClick={toggleNav}>
              {isNavOpen ? <CgClose className={mobileNavStyle['header-svg']} /> : <CgMenuGridO className={mobileNavStyle['header-svg']} />}
            </span>
            <span className={`${mobileNavStyle['header-link']} `}>
              <span className={mobileNavStyle['header-svg']}></span>
            </span>
            <NavLink to="/" className={`${mobileNavStyle['logo']} `}>
              <h2>Footwr.</h2>
            </NavLink>
            <NavLink to="/search" className={`${mobileNavStyle['header-link']} `}>
              {location === '/search' ? <BiSolidSearchAlt2 className={mobileNavStyle['header-svg']} /> : <BiSearchAlt className={mobileNavStyle['header-svg']} />}
            </NavLink>
            <NavLink to="/profile" className={`${mobileNavStyle['header-link']} `}>
              {location === '/profile' ? <MdAccountBox className={mobileNavStyle['header-svg']} /> : <MdOutlineAccountBox className={mobileNavStyle['header-svg']} />}
            </NavLink>
          </li>
        </ul>
      </header>

      <aside className={navbarClassNames}>
        <div className={mobileNavStyle['nav-aside']}>
          <ul className={mobileNavStyle['side-list']}>
            <li className={mobileNavStyle['profile-link']}>
              <NavLink to="/profile" className={mobileNavStyle['side-link']}>
                <img src={profileImage} alt="Fiók" className={mobileNavStyle['rounded']} />
                <span className={mobileNavStyle['username-text']}>bener</span>
                <span className={mobileNavStyle['username-link']}>@bener</span>
              </NavLink>
            </li>

            <li className={mobileNavStyle['side-list-item']}>
              <NavLink to="/community" className={`${mobileNavStyle['side-link']} ${location === '/community' ? mobileNavStyle['active'] : mobileNavStyle['inactive']}`}>
                {location === '/community' ? <BsPeopleFill className={mobileNavStyle['side-svg']} /> : <BsPeople className={mobileNavStyle['side-svg']} />}
                <span className={mobileNavStyle['side-text']}>Közösség</span>
              </NavLink>
            </li>

            <li className={mobileNavStyle['side-list-item']}>
              <NavLink to="/auction" className={`${mobileNavStyle['side-link']} ${location === '/auction' ? mobileNavStyle['active'] : mobileNavStyle['inactive']}`}>
                {location === '/auction' ? <RiAuctionFill className={mobileNavStyle['side-svg']} /> : <RiAuctionLine className={mobileNavStyle['side-svg']} />}
                <span className={mobileNavStyle['side-text']}>Licitek</span>
              </NavLink>
            </li>

            <li className={mobileNavStyle['side-list-item']}>
              <NavLink to="/news" className={`${mobileNavStyle['side-link']} ${location === '/news' ? mobileNavStyle['active'] : mobileNavStyle['inactive']}`}>
                {location === '/news' ? <IoNewspaperSharp className={`${mobileNavStyle['side-svg']} ${mobileNavStyle['scale-down']}`} /> : <IoNewspaperOutline className={`${mobileNavStyle['side-svg']} ${mobileNavStyle['scale-down']}`} />}
                <span className={mobileNavStyle['side-text']}>Hírek</span>
              </NavLink>
            </li>

            <li className={mobileNavStyle['side-list-item']}>
              <NavLink to="/about" className={`${mobileNavStyle['side-link']} ${location === '/about' ? mobileNavStyle['active'] : mobileNavStyle['inactive']}`}>
                {location === '/about' ? <BsInfoSquareFill className={`${mobileNavStyle['side-svg']} ${mobileNavStyle['scale-down']}`} /> : <BsInfoSquare className={`${mobileNavStyle['side-svg']} ${mobileNavStyle['scale-down']}`} />}
                <span className={mobileNavStyle['side-text']}>Rólunk</span>
              </NavLink>
            </li>

            <li className={`${mobileNavStyle['side-list-item']} ${mobileNavStyle['last-in-group']}`}>
              <NavLink to="/contact" className={`${mobileNavStyle['side-link']} ${location === '/contact' ? mobileNavStyle['active'] : mobileNavStyle['inactive']}`}>
                {location === '/contact' ? <MdPhoneInTalk className={mobileNavStyle['side-svg']} /> : <MdOutlinePhoneInTalk className={mobileNavStyle['side-svg']} />}
                <span className={mobileNavStyle['side-text']}>Kapcsolat</span>
              </NavLink>
            </li>

            <li className={mobileNavStyle['side-list-item']}>
              <NavLink to="/settings" className={`${mobileNavStyle['side-link']} ${location === '/settings' ? mobileNavStyle['active'] : mobileNavStyle['inactive']}`}>
                {location === '/settings' ? <IoSettings className={mobileNavStyle['side-svg']} /> : <IoSettingsOutline className={mobileNavStyle['side-svg']} />}
                <span className={mobileNavStyle['side-text']}>Beállítások</span>
              </NavLink>
            </li>

            <li className={`${mobileNavStyle['side-list-item']} ${mobileNavStyle['last-in-group']}`}>
              <NavLink to="/more" className={mobileNavStyle['side-link']}>
                {location === '/more' ? <TfiMoreAlt className={mobileNavStyle['side-svg']} /> : <TfiMore className={mobileNavStyle['side-svg']} />}
                <span className={mobileNavStyle['side-text']}>Több</span>
              </NavLink>
            </li>

            <li className={mobileNavStyle['side-list-item']}>
              <NavLink to="" className={mobileNavStyle['side-link']} onClick={handleLogOut}>
                <RiLogoutBoxLine className={mobileNavStyle['side-svg']} />
                <span className={mobileNavStyle['side-text']}>Kijelentkezés</span>
              </NavLink>
            </li>
          </ul>
        </div>
      </aside>

      <nav className={mobileNavStyle['nav-bar']}>
        <ul className={mobileNavStyle['nav-list']}>
          <li className={`${mobileNavStyle['nav-list-item']}`}>
            <NavLink to="/selling" className={`${mobileNavStyle['nav-link']} ${location === '/selling' ? mobileNavStyle['active'] : mobileNavStyle['inactive']} `}>
              {location === '/selling' ? <MdSell className={mobileNavStyle['navbar-svg']} /> : <MdOutlineSell className={mobileNavStyle['navbar-svg']} />}
            </NavLink>
          </li>

          <li className={mobileNavStyle['nav-list-item']}>
            <NavLink to="/favourites" className={`${mobileNavStyle['nav-link']} ${location === '/favourites' ? mobileNavStyle['active'] : mobileNavStyle['inactive']}`}>
              {location === '/favourites' ? <MdFavorite className={mobileNavStyle['navbar-svg']} /> : <MdFavoriteBorder className={mobileNavStyle['navbar-svg']} />}
            </NavLink>
          </li>

          <li className={mobileNavStyle['nav-list-item']}>
            <NavLink to="/" className={`${mobileNavStyle['nav-link']} ${location === '/' ? mobileNavStyle['active'] : mobileNavStyle['inactive']}`}>
              {location === '/' ? <AiFillHome className={mobileNavStyle['navbar-svg']} /> : <AiOutlineHome className={mobileNavStyle['navbar-svg']} />}
            </NavLink>
          </li>

          <li className={mobileNavStyle['nav-list-item']}>
            <NavLink to="/messages" className={`${mobileNavStyle['nav-link']} ${location === '/messages' ? mobileNavStyle['active'] : mobileNavStyle['inactive']}`}>
              <div className={mobileNavStyle['notification-icon']}>
                {location === '/messages' ? <BiSolidMessageSquareDetail className={mobileNavStyle['navbar-svg']} /> : <BiMessageSquareDetail className={mobileNavStyle['navbar-svg']} />}
                <span className={mobileNavStyle['new-notification']}></span>
              </div>
            </NavLink>
          </li>

          <li className={mobileNavStyle['nav-list-item']}>
            <NavLink to="/notifications" className={`${mobileNavStyle['nav-link']} ${location === '/notifications' ? mobileNavStyle['active'] : mobileNavStyle['inactive']}`}>
              <div className={mobileNavStyle['notification-icon']}>
                {location === '/notifications' ? <IoNotificationsSharp className={mobileNavStyle['navbar-svg']} /> : <IoMdNotificationsOutline className={mobileNavStyle['navbar-svg']} />}
                <span className={mobileNavStyle['new-notification']}></span>
              </div>
            </NavLink>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default MobileNavbar;
