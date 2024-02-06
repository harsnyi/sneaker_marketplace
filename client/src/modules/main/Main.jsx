import '../../assets/css/main-page.css';

import React from 'react';
import {useMediaQuery} from 'react-responsive';
import SideBarDesktop from '../navigation/SideBarDesktop';
import NavigationMobile from '../navigation/NavigationMobile';
import Header from './Header';
import {Outlet} from 'react-router-dom';

const Main = () => {
  const isMobile = useMediaQuery({query: '(max-width: 1200px)'});

  function renderSideBar() {
    return isMobile ? <NavigationMobile /> : <SideBarDesktop />;
  }

  return (
    <div className="main_wrapper">
      {renderSideBar()}
      <div className="main_container">
        {/* <Header /> */}
        <main className="main-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Main;
