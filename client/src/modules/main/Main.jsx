import '../../assets/css/main-page.css';

import React from 'react';
import {useMediaQuery} from 'react-responsive';
import DesktopNavbar from '../navigation/DesktopNavBar';
import MobileNavbar from '../navigation/MobileNavBar';
import MainHeader from './MainHeader';
import {Outlet} from 'react-router-dom';

const Main = () => {
  const isMobile = useMediaQuery({query: '(max-width: 1200px)'});

  function renderSideBar() {
    return isMobile ? <MobileNavbar /> : <DesktopNavbar />;
  }

  return (
    <div className="main-wrapper">
      {renderSideBar()}
      <div className="main-container">
        <MainHeader />
        <main className="main-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Main;
