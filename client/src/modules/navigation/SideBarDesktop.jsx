import desktopSideStyle from '../../assets/css/desktop-sidebar.module.css';

import React, {useState} from 'react';
import {NavLink} from 'react-router-dom';

import {BiSearchAlt, BiMessageSquareDetail} from 'react-icons/bi';
import {MdFavoriteBorder, MdOutlineNewReleases, MdOutlinePhoneInTalk, MdOutlineSell, MdInfoOutline} from 'react-icons/md';
import {FaGrip, FaGripVertical} from 'react-icons/fa6';
import {RiLogoutBoxLine} from 'react-icons/ri';
import {IoSettingsOutline, IoNotificationsOutline} from 'react-icons/io5';
import {TfiMore} from 'react-icons/tfi';
import {CgProfile} from 'react-icons/cg';
import {PiGlobeLight} from 'react-icons/pi';
import {HiOutlineNewspaper} from 'react-icons/hi2';
import {RxDashboard} from 'react-icons/rx';
import {RiAuctionLine} from 'react-icons/ri';
import {GoDotFill} from 'react-icons/go';

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
      {icon: <BiMessageSquareDetail />, text: 'Üzenetek', link: '/messages'},
      {icon: <IoNotificationsOutline />, text: 'Értesítések', link: '/notifications'},
      {icon: <MdOutlineSell />, text: 'Eladás', link: '/sell'},
    ],
  },
  {
    title: 'Közösség',
    items: [
      {icon: <PiGlobeLight />, text: 'Fedezd Fel', link: '/discover'},
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
      {icon: <RiLogoutBoxLine />, text: 'Kijelentkezés', link: null},
    ],
  },
];

const SideBarDesktop = () => {
  const [isSideOpen, setIsSideOpen] = useState(true);

  const toggleSideBar = () => {
    setIsSideOpen(!isSideOpen);
  };

  return (
    <aside className={`${desktopSideStyle['sidebar']} ${!isSideOpen ? desktopSideStyle['closed'] : ''}`}>
      <div className={desktopSideStyle['sidebar-header']}>
        {isSideOpen ? (
          <>
            <h1>Under Retail</h1>
            <FaGrip onClick={toggleSideBar} />
          </>
        ) : (
          <FaGripVertical onClick={toggleSideBar} />
        )}
      </div>
      <ul className={desktopSideStyle['sidebar-list']}>
        {subMenus.map((subMenu, index) => (
          <li key={index} className={desktopSideStyle['sidebar-list-item']}>
            <h4>{isSideOpen ? subMenu.title : <GoDotFill />}</h4>
            <ul className={desktopSideStyle['list-item-submenu']}>
              {subMenu.items.map((item, index) => (
                <li key={index} className={desktopSideStyle['submenu-item']}>
                  {item.link === null ? (
                    <div className={desktopSideStyle['submenu-item-link']} title={!isSideOpen ? item.text : null}>
                      {item.icon}
                      <span>{item.text}</span>
                    </div>
                  ) : (
                    <NavLink to={item.link} className={desktopSideStyle['submenu-item-link']} title={!isSideOpen ? item.text : null}>
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
