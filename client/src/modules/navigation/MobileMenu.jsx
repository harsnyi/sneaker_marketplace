import React from 'react';
import {NavLink} from 'react-router-dom';

import {BiSearchAlt} from 'react-icons/bi';
import {CgProfile} from 'react-icons/cg';
import {MdOutlineSell} from 'react-icons/md';
import {HiOutlineInboxIn} from 'react-icons/hi';
import {RxDashboard} from 'react-icons/rx';

const menuItems = [
  {icon: <RxDashboard />, text: 'Kezdőlap', link: ''},
  {icon: <BiSearchAlt />, text: 'Keresés', link: '/search'},
  {icon: <MdOutlineSell />, text: 'Eladás', link: '/sell'},
  {icon: <HiOutlineInboxIn />, text: 'Üzenetek', link: '/inbox'},
  {icon: <CgProfile />, text: 'Profil', link: '/profile'},
];

const MobileMenu = ({mobileNavStyle}) => {
  return (
    <nav className={mobileNavStyle['menubar']}>
      <ul className={mobileNavStyle['menu-list']}>
        {menuItems.map((item, index) => (
          <li key={index} className={mobileNavStyle['menu-list-item']}>
            <NavLink to={item.link} className={mobileNavStyle['menu-list-item-link']}>
              {item.icon}
              <span>{item.text}</span>
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default MobileMenu;
