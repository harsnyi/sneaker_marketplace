import {NavLink} from 'react-router-dom';

import {BsFillGrid3X3GapFill} from 'react-icons/bs';
import {MdFavoriteBorder} from 'react-icons/md';
import {PiArrowLineRightBold} from 'react-icons/pi';

const navItems = [
  {icon: null, link: null},
  {icon: null, link: null},
  {icon: <MdFavoriteBorder />, link: '/favorites'},
];

const MobileNav = ({mobileNavStyle, toggleSideBar, sideBarOpen}) => {
  return (
    <header className={mobileNavStyle['navbar']}>
      <ul className={mobileNavStyle['navbar-list']}>
        <li className={mobileNavStyle['navbar-list-item']}>
          <h1>
            Under
            <br />
            Retail
          </h1>
        </li>
        {navItems.map((item, index) => (
          <li key={index} className={mobileNavStyle['navbar-list-item']}>
            {item.link === null ? (
              <div className={`${mobileNavStyle['navbar-list-item-link']} ${item.icon ? '' : mobileNavStyle['nolink']}`}>{item.icon}</div>
            ) : (
              <NavLink to={item.link} className={mobileNavStyle['navbar-list-item-link']}>
                {item.icon}
              </NavLink>
            )}
          </li>
        ))}
        <li className={mobileNavStyle['navbar-list-item']}>
          <div className={mobileNavStyle['navbar-list-item-link']} onClick={toggleSideBar}>
            {!sideBarOpen ? <BsFillGrid3X3GapFill /> : <PiArrowLineRightBold />}
          </div>
        </li>
      </ul>
    </header>
  );
};

export default MobileNav;
