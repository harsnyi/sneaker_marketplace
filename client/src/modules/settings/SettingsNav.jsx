import {NavLink} from 'react-router-dom';

import {MdAccountCircle} from 'react-icons/md';
import {IoNotifications} from 'react-icons/io5';
import {HiLockClosed} from 'react-icons/hi';

const nav = [
  {
    title: 'Fiókom',
    titleIcon: <MdAccountCircle />,
    items: [
      {text: 'Személyes adatok', link: '/settings'},
      {text: 'Jelszó csere', link: '/'},
    ],
  },
  {
    title: 'Értesítések',
    titleIcon: <IoNotifications />,
    items: [{text: 'Hírlevél', link: '/'}],
  },
  {
    title: 'Adatvédelem és biztonság',
    titleIcon: <HiLockClosed />,
    items: [{text: 'Cookie-k', link: '/'}],
  },
  {
    title: 'Egyéb',
    titleIcon: <MdAccountCircle />,
    items: [
      {text: 'Megjelenés', link: '/'},
      {text: 'Segítség és kapcsolat', link: '/'},
    ],
  },
];

const SettingsNav = () => {
  return (
    <aside className="settings_nav">
      <ul className="settings_nav_list">
        {nav.map((item, index) => (
          <li key={index} className="settings_nav_list_item">
            <h4>
              {item.titleIcon} {item.title}
            </h4>
            <ul>
              {item.items.map((subItem, index) => (
                <li key={index} className="settings_nav_subitem">
                  <NavLink to={subItem.link} className="link">
                    {subItem.text}
                  </NavLink>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default SettingsNav;
