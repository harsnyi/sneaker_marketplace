import desktopNavStyle from '../../assets/css/desktop_navbar.module.css';

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

const MIN_WIDTH = 5;
const JUMP_AT = 15;
const MAX_WIDTH = 30;

const DesktopNavbar = () => {
  const [isResizing, setIsResizing] = useState(false);
  const [navbarWidth, setNavbarWidth] = useState(MIN_WIDTH);
  const [isNavOpen, setIsNavOpen] = useState(false);

  const {showLoader, hideLoader} = useLoader();
  const {addToast} = useToast();

  const navigate = useNavigate();
  const location = useLocation().pathname;

  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
    setNavbarWidth(isNavOpen ? MIN_WIDTH : JUMP_AT);
  };

  const handleMouseDown = (e) => {
    e.preventDefault();
    setIsResizing(true);
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  const handleMouseMove = (e) => {
    e.preventDefault();

    if (e.clientX / 16 > MIN_WIDTH && e.clientX / 16 <= MAX_WIDTH) {
      if (e.clientX / 16 < JUMP_AT) {
        setNavbarWidth(MIN_WIDTH);
        setIsNavOpen(false);
        //setNavbarWidth(e.clientX / 16);
      } else {
        setNavbarWidth(e.clientX / 16);
        setIsNavOpen(true);
      }
    }
  };

  const handleMouseUp = (e) => {
    e.preventDefault();
    setIsResizing(false);
    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mouseup', handleMouseUp);
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
    <aside className={`${desktopNavStyle['nav-bar']} ${isNavOpen ? desktopNavStyle['opened'] : ''} ${isResizing ? desktopNavStyle['resizing'] : ''}`} style={{width: `${navbarWidth}rem`}}>
      <div className={`${desktopNavStyle['resize-handle']} ${isResizing ? desktopNavStyle['resizing'] : ''}`} onMouseDown={handleMouseDown}></div>
      <div className={desktopNavStyle['open-close-sidebar']} onClick={toggleNav} title="Menü">
        {isNavOpen ? <CgClose /> : <CgMenuGridO />}
      </div>

      <ul className={desktopNavStyle['nav-list']}>
        <li className={desktopNavStyle['logo']}>
          <NavLink to="/" className={desktopNavStyle['nav-link']}>
            <h4>{isNavOpen ? 'Under Retail' : 'UR'}</h4>
          </NavLink>
        </li>

        <li className={desktopNavStyle['profile-link']}>
          <NavLink to="/profile" className={desktopNavStyle['nav-link']}>
            <img src={profileImage} alt="Fiók" className={desktopNavStyle['rounded']} />
            {isNavOpen ? <span className={desktopNavStyle['username-text']}>bener</span> : ''}
            {isNavOpen ? <span className={desktopNavStyle['username-link']}>@bener</span> : ''}
          </NavLink>
        </li>

        <li className={desktopNavStyle['nav-list-item']} title="Kezdőlap">
          <NavLink to="/" className={`${desktopNavStyle['nav-link']} ${location === '/' ? desktopNavStyle['active'] : ''}`}>
            {location === '/' ? <AiFillHome className={desktopNavStyle['navbar-svg']} /> : <AiOutlineHome className={desktopNavStyle['navbar-svg']} />}
            <span className={`${desktopNavStyle['navbar-text']}`}>Kezdőlap</span>
          </NavLink>
        </li>
        <li className={`${desktopNavStyle['nav-list-item']} ${desktopNavStyle['last-in-group']}`} title="Keresés">
          <NavLink to="/search" className={`${desktopNavStyle['nav-link']}`}>
            {location === '/search' ? <BiSolidSearchAlt2 className={desktopNavStyle['navbar-svg']} /> : <BiSearchAlt className={desktopNavStyle['navbar-svg']} />}
            <span className={`${desktopNavStyle['navbar-text']}`}>Keresés</span>
          </NavLink>
        </li>

        <li className={desktopNavStyle['nav-list-item']} title="Fiók">
          <NavLink to="/profile" className={`${desktopNavStyle['nav-link']} ${location === '/profile' ? desktopNavStyle['active'] : ''}`}>
            {location === '/profile' ? <MdAccountBox className={desktopNavStyle['navbar-svg']} /> : <MdOutlineAccountBox className={desktopNavStyle['navbar-svg']} />}
            <span className={`${desktopNavStyle['navbar-text']}`}>Fiók</span>
          </NavLink>
        </li>
        <li className={desktopNavStyle['nav-list-item']} title="Értesítések">
          <NavLink to="/notifications" className={`${desktopNavStyle['nav-link']} ${location === '/notifications' ? desktopNavStyle['active'] : ''}`}>
            <div className={desktopNavStyle['notification-icon']}>
              {location === '/notifications' ? <IoNotificationsSharp className={desktopNavStyle['navbar-svg']} /> : <IoMdNotificationsOutline className={desktopNavStyle['navbar-svg']} />}
              <span className={desktopNavStyle['new-notification']}></span>
            </div>
            <span className={`${desktopNavStyle['navbar-text']}`}>Értesítések</span>
          </NavLink>
        </li>
        <li className={desktopNavStyle['nav-list-item']} title="Üzenetek">
          <NavLink to="/messages" className={`${desktopNavStyle['nav-link']} ${location === '/messages' ? desktopNavStyle['active'] : ''}`}>
            <div className={desktopNavStyle['notification-icon']}>
              {location === '/messages' ? <BiSolidMessageSquareDetail className={desktopNavStyle['navbar-svg']} /> : <BiMessageSquareDetail className={desktopNavStyle['navbar-svg']} />}
              <span className={desktopNavStyle['new-notification']}></span>
            </div>
            <span className={`${desktopNavStyle['navbar-text']}`}>Üzenetek</span>
          </NavLink>
        </li>
        <li className={desktopNavStyle['nav-list-item']} title="Kedvencek">
          <NavLink to="/favourites" className={`${desktopNavStyle['nav-link']} ${location === '/favourites' ? desktopNavStyle['active'] : ''}`}>
            {location === '/favourites' ? <MdFavorite className={desktopNavStyle['navbar-svg']} /> : <MdFavoriteBorder className={desktopNavStyle['navbar-svg']} />}
            <span className={`${desktopNavStyle['navbar-text']}`}>Kedvencek</span>
          </NavLink>
        </li>
        <li className={`${desktopNavStyle['nav-list-item']} ${desktopNavStyle['last-in-group']}`} title="Eladás">
          <NavLink to="/selling" className={`${desktopNavStyle['nav-link']} ${location === '/selling' ? desktopNavStyle['active'] : ''}`}>
            {location === '/selling' ? <MdSell className={desktopNavStyle['navbar-svg']} /> : <MdOutlineSell className={desktopNavStyle['navbar-svg']} />}
            <span className={`${desktopNavStyle['navbar-text']}`}>Eladás</span>
          </NavLink>
        </li>

        <li className={desktopNavStyle['nav-list-item']} title="Közösség">
          <NavLink to="/community" className={`${desktopNavStyle['nav-link']} ${location === '/community' ? desktopNavStyle['active'] : ''}`}>
            {location === '/community' ? <BsPeopleFill className={desktopNavStyle['navbar-svg']} /> : <BsPeople className={desktopNavStyle['navbar-svg']} />}
            <span className={`${desktopNavStyle['navbar-text']}`}>Közösség</span>
          </NavLink>
        </li>
        <li className={desktopNavStyle['nav-list-item']} title="Licitek">
          <NavLink to="/auction" className={`${desktopNavStyle['nav-link']} ${location === '/auction' ? desktopNavStyle['active'] : ''}`}>
            {location === '/auction' ? <RiAuctionFill className={desktopNavStyle['navbar-svg']} /> : <RiAuctionLine className={desktopNavStyle['navbar-svg']} />}
            <span className={`${desktopNavStyle['navbar-text']}`}>Licitek</span>
          </NavLink>
        </li>
        <li className={desktopNavStyle['nav-list-item']} title="Hírek">
          <NavLink to="/news" className={`${desktopNavStyle['nav-link']} ${location === '/news' ? desktopNavStyle['active'] : ''}`}>
            {location === '/news' ? <IoNewspaperSharp className={`${desktopNavStyle['navbar-svg']} ${desktopNavStyle['scale-down']}`} /> : <IoNewspaperOutline className={`${desktopNavStyle['navbar-svg']} ${desktopNavStyle['scale-down']}`} />}
            <span className={`${desktopNavStyle['navbar-text']}`}>Hírek</span>
          </NavLink>
        </li>
        <li className={desktopNavStyle['nav-list-item']} title="Rólunk">
          <NavLink to="/about" className={`${desktopNavStyle['nav-link']} ${location === '/about' ? desktopNavStyle['active'] : ''}`}>
            {location === '/about' ? <BsInfoSquareFill className={`${desktopNavStyle['navbar-svg']} ${desktopNavStyle['scale-down']}`} /> : <BsInfoSquare className={`${desktopNavStyle['navbar-svg']} ${desktopNavStyle['scale-down']}`} />}
            <span className={`${desktopNavStyle['navbar-text']}`}>Rólunk</span>
          </NavLink>
        </li>
        <li className={`${desktopNavStyle['nav-list-item']} ${desktopNavStyle['last-in-group']}`} title="Kapcsolat">
          <NavLink to="/contact" className={`${desktopNavStyle['nav-link']} ${location === '/contact' ? desktopNavStyle['active'] : ''}`}>
            {location === '/contact' ? <MdPhoneInTalk className={desktopNavStyle['navbar-svg']} /> : <MdOutlinePhoneInTalk className={desktopNavStyle['navbar-svg']} />}
            <span className={`${desktopNavStyle['navbar-text']}`}>Kapcsolat</span>
          </NavLink>
        </li>

        <li className={desktopNavStyle['nav-list-item']} title="Beállítások">
          <NavLink to="/settings" className={`${desktopNavStyle['nav-link']} ${location === '/settings' ? desktopNavStyle['active'] : ''}`}>
            {location === '/settings' ? <IoSettings className={desktopNavStyle['navbar-svg']} /> : <IoSettingsOutline className={desktopNavStyle['navbar-svg']} />}
            <span className={`${desktopNavStyle['navbar-text']}`}>Beállítások</span>
          </NavLink>
        </li>
        <li className={`${desktopNavStyle['nav-list-item']} ${desktopNavStyle['last-in-group']}`} title="Több">
          <NavLink to="/more" className={desktopNavStyle['nav-link']}>
            {location === '/more' ? <TfiMoreAlt className={desktopNavStyle['navbar-svg']} /> : <TfiMore className={desktopNavStyle['navbar-svg']} />}
            <span className={`${desktopNavStyle['navbar-text']}`}>Több</span>
          </NavLink>
        </li>

        <li className={desktopNavStyle['nav-list-item']} title="Kijelentkezés">
          <NavLink to="" className={desktopNavStyle['nav-link']} onClick={handleLogOut}>
            <RiLogoutBoxLine className={desktopNavStyle['navbar-svg']} />
            <span className={`${desktopNavStyle['navbar-text']}`}>Kijelentkezés</span>
          </NavLink>
        </li>
      </ul>
    </aside>
  );
};

export default DesktopNavbar;
