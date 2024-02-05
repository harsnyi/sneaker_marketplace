import {NavLink, useNavigate} from 'react-router-dom';
import {useLogout} from '../../hooks/useLogout';

import {HiOutlineNewspaper} from 'react-icons/hi2';
import {IoSettingsOutline} from 'react-icons/io5';
import {MdInfoOutline, MdOutlineNewReleases, MdOutlinePhoneInTalk, MdOutlineExplore} from 'react-icons/md';
import {RiAuctionLine, RiLogoutBoxLine} from 'react-icons/ri';
import {TfiMore} from 'react-icons/tfi';

const subMenus = [
  {
    title: 'Menü',
    items: [{icon: <MdOutlineNewReleases />, text: 'Újdonság', link: '/release'}],
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

const MobileSide = ({mobileNavStyle, sideBarOpen}) => {
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
    <div className={`${mobileNavStyle['sidebar-container']} ${!sideBarOpen ? '' : mobileNavStyle['open']}`}>
      <aside className={`${mobileNavStyle['sidebar']} `}>
        <ul className={mobileNavStyle['sidebar-list']}>
          {subMenus.map((subMenu, index) => (
            <li key={index} className={mobileNavStyle['sidebar-list-item']}>
              <h4>{subMenu.title}</h4>
              <ul className={mobileNavStyle['list-item-submenu']}>
                {subMenu.items.map((item, index) => (
                  <li key={index} className={mobileNavStyle['submenu-item']}>
                    {item.link === null ? (
                      <div className={mobileNavStyle['submenu-item-link']} title={item.text} onClick={(e) => handleOnClick(e, item.action)}>
                        {item.icon}
                        <span>{item.text}</span>
                      </div>
                    ) : (
                      <NavLink to={item.link} className={mobileNavStyle['submenu-item-link']} title={item.text}>
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
    </div>
  );
};

export default MobileSide;
