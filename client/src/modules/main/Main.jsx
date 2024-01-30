import '../../assets/css/main-page.css';

import React from 'react';
import {useMediaQuery} from 'react-responsive';
import SideBarDesktop from '../navigation/SideBarDesktop';
import MobileNavbar from '../navigation/MobileNavBar';
import Header from './Header';
import {Outlet} from 'react-router-dom';

const Main = () => {
  const isMobile = useMediaQuery({query: '(max-width: 1200px)'});

  function renderSideBar() {
    return isMobile ? <MobileNavbar /> : <SideBarDesktop />;
  }

  return (
    <div className="main-wrapper">
      {renderSideBar()}
      <div className="main-container">
        {/* <Header/> */}
        <main className="main-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Main;
