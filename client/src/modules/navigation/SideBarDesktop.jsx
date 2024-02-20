import desktopSideStyle from '../../assets/css/desktop-sidebar.module.css';

import React from 'react';
import {NavLink, useLocation, useNavigate} from 'react-router-dom';
import {useAuth} from '../../hooks/useAuth';

import {BiMessageSquareDetail, BiSolidMessageSquareDetail, BiSearchAlt, BiSolidSearchAlt2} from 'react-icons/bi';
import {BsFillGrid3X3GapFill} from 'react-icons/bs';
import {GoDotFill} from 'react-icons/go';
import {HiOutlineNewspaper, HiNewspaper} from 'react-icons/hi2';
import {IoNotificationsOutline, IoNotifications, IoSettingsOutline, IoSettings, IoGridOutline, IoGrid} from 'react-icons/io5';
import {MdFavoriteBorder, MdFavorite, MdInfoOutline, MdInfo, MdOutlineNewReleases, MdNewReleases, MdOutlinePhoneInTalk, MdPhoneInTalk, MdOutlineSell, MdSell, MdOutlineExplore, MdExplore, MdAccountCircle, MdOutlineAccountCircle} from 'react-icons/md';
import {PiArrowLineLeftBold} from 'react-icons/pi';
import {RiAuctionLine, RiAuctionFill, RiLogoutBoxLine} from 'react-icons/ri';
import {TfiMore, TfiMoreAlt} from 'react-icons/tfi';

import {useLogout} from '../../hooks/useLogout';

const generateSubMenus = (auth) => {
  return [
    {
      title: 'Menü',
      items: [
        {icon: <IoGridOutline />, activeIcon: <IoGrid />, text: 'Kezdőlap', link: '/'},
        {icon: <BiSearchAlt />, activeIcon: <BiSolidSearchAlt2 />, text: 'Keresés', link: '/search'},
        {icon: <MdOutlineNewReleases />, activeIcon: <MdNewReleases />, text: 'Újdonság', link: '/release'},
      ],
    },
    {
      title: 'Felhasználó',
      items: [
        {icon: <MdOutlineAccountCircle />, activeIcon: <MdAccountCircle />, text: 'Profil', link: `/profile/${auth.username}`},
        {icon: <MdFavoriteBorder />, activeIcon: <MdFavorite />, text: 'Kedvencek', link: '/favorites'},
        {icon: <BiMessageSquareDetail />, activeIcon: <BiSolidMessageSquareDetail />, text: 'Üzenetek', link: '/messages', class: 'notification-badge'},
        {icon: <IoNotificationsOutline />, activeIcon: <IoNotifications />, text: 'Értesítések', link: '/notifications', class: 'notification-badge'},
        {icon: <MdOutlineSell />, activeIcon: <MdSell />, text: 'Eladás', link: '/sell'},
      ],
    },
    {
      title: 'Közösség',
      items: [
        {icon: <MdOutlineExplore />, activeIcon: <MdExplore />, text: 'Fedezd Fel', link: '/discover'},
        {icon: <RiAuctionLine />, activeIcon: <RiAuctionFill />, text: 'Licit', link: '/auction'},
        {icon: <HiOutlineNewspaper />, activeIcon: <HiNewspaper />, text: 'Hírek', link: '/news'},
      ],
    },
    {
      title: 'További',
      items: [
        {icon: <MdInfoOutline />, activeIcon: <MdInfo />, text: 'Rólunk', link: '/about'},
        {icon: <MdOutlinePhoneInTalk />, activeIcon: <MdPhoneInTalk />, text: 'Kapcsolat', link: '/contact'},
      ],
    },
    {
      title: 'Eszközök',
      items: [
        {icon: <IoSettingsOutline />, activeIcon: <IoSettings />, text: 'Beállítások', link: '/settings'},
        {icon: <TfiMore />, activeIcon: <TfiMoreAlt />, text: 'Több', link: '/more'},
        {icon: <RiLogoutBoxLine />, text: 'Kijelentkezés', link: null, action: 'signOut'},
      ],
    },
  ];
};

const SideBarDesktop = ({isSideOpen, toggleSideBar}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const logout = useLogout();

  const {auth} = useAuth();

  const subMenus = generateSubMenus(auth);

  const handleOnClick = (e, action) => {
    e.preventDefault();
    switch (action) {
      case 'signOut':
        signOut();
        break;
      default:
        break;
    }
  };

  const signOut = async () => {
    await logout();
    localStorage.removeItem('isFirstRender');
    navigate('/auth');
  };

  return (
    <aside className={`${desktopSideStyle['sidebar']} ${!isSideOpen ? desktopSideStyle['closed'] : ''}`}>
      <div className={desktopSideStyle['sidebar_header']}>
        {isSideOpen ? (
          <>
            <h1>Bump</h1>
            <PiArrowLineLeftBold onClick={toggleSideBar} />
          </>
        ) : (
          <BsFillGrid3X3GapFill onClick={toggleSideBar} />
        )}
      </div>
      <ul className={desktopSideStyle['sidebar_list']}>
        {subMenus.map((subMenu, index) => (
          <li key={index} className={desktopSideStyle['sidebar_list_item']}>
            <h4>{isSideOpen ? subMenu.title : <GoDotFill />}</h4>
            <ul className={desktopSideStyle['list_item_submenu']}>
              {subMenu.items.map((item, index) => (
                <li key={index} className={desktopSideStyle['submenu_item']}>
                  {item.link === null ? (
                    <div className={`${desktopSideStyle['submenu_item_link']} ${item.class ? desktopSideStyle[item.class] : ''}`} title={!isSideOpen ? item.text : null} onClick={(e) => handleOnClick(e, item.action)}>
                      {location.pathname === item.link ? item.activeIcon : item.icon}
                      <span>{item.text}</span>
                    </div>
                  ) : (
                    <NavLink to={item.link} className={`${desktopSideStyle['submenu_item_link']} ${item.class ? desktopSideStyle[item.class] : ''}`} title={!isSideOpen ? item.text : null}>
                      {location.pathname === item.link ? item.activeIcon : item.icon}
                      <span>{item.text}</span>
                    </NavLink>
                  )}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default SideBarDesktop;
