import {NavLink, useLocation} from 'react-router-dom';

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

const MainHeader = () => {
  const location = useLocation().pathname;

  return (
    <nav className="main-header">
      <div></div>
      <div className="header-list-container">
        <ul className="header-list">
          <li className="header-list-item">
            <NavLink to="/" className={location === '/' ? 'header-link active' : 'header-link'}>
              {location === '/' ? <AiFillHome className="header-svg" /> : <AiOutlineHome className="header-svg" />}
              <span className="header-text">Kezdőlap</span>
            </NavLink>
            <NavLink to="/community" className={location === '/community' ? 'header-link active' : 'header-link'}>
              {location === '/community' ? <BsPeopleFill className="header-svg" /> : <BsPeople className="header-svg" />}
              <span className="header-text">Közösség</span>
            </NavLink>
            <NavLink to="/auction" className={location === '/auction' ? 'header-link active' : 'header-link'}>
              {location === '/auction' ? <RiAuctionFill className="header-svg" /> : <RiAuctionLine className="header-svg" />}
              <span className="header-text">Licitek</span>
            </NavLink>
            <NavLink to="/news" className={location === '/news' ? 'header-link active' : 'header-link'}>
              {location === '/news' ? <IoNewspaperSharp className="header-svg" /> : <IoNewspaperOutline className="header-svg" />}
              <span className="header-text">Hírek</span>
            </NavLink>
          </li>
        </ul>
      </div>
      <div></div>
    </nav>
  );
};

export default MainHeader;
