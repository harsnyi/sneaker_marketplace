import desktopSideStyle from '../../assets/css/desktop-sidebar.module.css';

import React from 'react';
import {NavLink, useNavigate} from 'react-router-dom';

import {BiMessageSquareDetail, BiSearchAlt} from 'react-icons/bi';
import {BsFillGrid3X3GapFill} from 'react-icons/bs';
import {CgProfile} from 'react-icons/cg';
import {GoDotFill} from 'react-icons/go';
import {HiOutlineNewspaper} from 'react-icons/hi2';
import {IoNotificationsOutline, IoSettingsOutline} from 'react-icons/io5';
import {MdFavoriteBorder, MdInfoOutline, MdOutlineNewReleases, MdOutlinePhoneInTalk, MdOutlineSell, MdOutlineExplore} from 'react-icons/md';
import {PiArrowLineLeftBold} from 'react-icons/pi';
import {RiAuctionLine, RiLogoutBoxLine} from 'react-icons/ri';
import {RxDashboard} from 'react-icons/rx';
import {TfiMore} from 'react-icons/tfi';
import {useLogout} from '../../hooks/useLogout';

const subMenus = [
  {
    title: 'Menü',
    items: [
      {icon: <RxDashboard />, text: 'Kezdőlap', link: ''},
      {icon: <BiSearchAlt />, text: 'Keresés', link: '/search'},
      {icon: <MdOutlineNewReleases />, text: 'Újdonság', link: '/release'},
    ],
  },
  {
    title: 'Felhasználó',
    items: [
      {icon: <CgProfile />, text: 'Profil', link: '/profile'},
      {icon: <MdFavoriteBorder />, text: 'Kedvencek', link: '/favorites'},
      {icon: <BiMessageSquareDetail />, text: 'Üzenetek', link: '/messages', class: 'notification-badge'},
      {icon: <IoNotificationsOutline />, text: 'Értesítések', link: '/notifications', class: 'notification-badge'},
      {icon: <MdOutlineSell />, text: 'Eladás', link: '/sell'},
    ],
  },
  {
    title: 'Közösség',
    items: [
      {icon: <MdOutlineExplore />, text: 'Fedezd Fel', link: '/discover'},
      {icon: <RiAuctionLine />, text: 'Licit', link: '/auction'},
      {icon: <HiOutlineNewspaper />, text: 'Hírek', link: '/news'},
    ],
  },
  {
    title: 'További',
    items: [
      {icon: <MdInfoOutline />, text: 'Rólunk', link: '/about'},
      {icon: <MdOutlinePhoneInTalk />, text: 'Kapcsolat', link: '/contact'},
    ],
  },
  {
    title: 'Eszközök',
    items: [
      {icon: <IoSettingsOutline />, text: 'Beállítások', link: '/settings'},
      {icon: <TfiMore />, text: 'Több', link: '/more'},
      {icon: <RiLogoutBoxLine />, text: 'Kijelentkezés', link: null, action: 'signOut'},
    ],
  },
];

const SideBarDesktop = ({isSideOpen, toggleSideBar}) => {
  const navigate = useNavigate();
  const logout = useLogout();

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
                      {item.icon}
                      <span>{item.text}</span>
                    </div>
                  ) : (
                    <NavLink to={item.link} className={`${desktopSideStyle['submenu_item_link']} ${item.class ? desktopSideStyle[item.class] : ''}`} title={!isSideOpen ? item.text : null}>
                      {item.icon}
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
