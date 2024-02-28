import React from 'react';
import {NavLink, useLocation} from 'react-router-dom';

import {useAuth} from '../../hooks/useAuth';

import {IoGrid} from 'react-icons/io5';
import {BiSearchAlt, BiSolidSearchAlt2} from 'react-icons/bi';
import {CgProfile} from 'react-icons/cg';
import {MdOutlineSell, MdSell, MdAccountCircle} from 'react-icons/md';
import {HiOutlineInboxIn, HiInboxIn} from 'react-icons/hi';
import {RxDashboard} from 'react-icons/rx';

const generateMenu = (auth) => {
  return [
    {icon: <RxDashboard />, activeIcon: <IoGrid />, text: 'Kezdőlap', link: '/'},
    {icon: <BiSearchAlt />, activeIcon: <BiSolidSearchAlt2 />, text: 'Keresés', link: '/search'},
    {icon: <MdOutlineSell />, activeIcon: <MdSell />, text: 'Eladás', link: '/sell'},
    {icon: <HiOutlineInboxIn />, activeIcon: <HiInboxIn />, text: 'Üzenetek', link: '/inbox'},
    {icon: <CgProfile />, activeIcon: <MdAccountCircle />, text: 'Profil', link: `/profile/${auth.username}`},
  ];
};

const MobileMenu = ({mobileNavStyle}) => {
  const location = useLocation();

  const {auth} = useAuth();
  const menuItems = generateMenu(auth);

  return (
    <nav className={mobileNavStyle['menubar']}>
      <ul className={mobileNavStyle['menu-list']}>
        {menuItems.map((item, index) => (
          <li key={index} className={mobileNavStyle['menu-list-item']}>
            <NavLink to={item.link} className={mobileNavStyle['menu-list-item-link']}>
              {location.pathname === item.link ? item.activeIcon : item.icon}
              <span>{item.text}</span>
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default MobileMenu;
