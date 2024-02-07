import '../../assets/css/main-page.css';

import React, {useState} from 'react';
import {useMediaQuery} from 'react-responsive';
import SideBarDesktop from '../navigation/SideBarDesktop';
import NavigationMobile from '../navigation/NavigationMobile';
// import Header from './Header';
import {Outlet} from 'react-router-dom';

const Main = () => {
  const isMobile = useMediaQuery({query: '(max-width: 1200px)'});
  const [isSideOpen, setIsSideOpen] = useState(true);

  const toggleSideBar = () => {
    setIsSideOpen(!isSideOpen);
  };

  function renderSideBar() {
    return isMobile ? <NavigationMobile /> : <SideBarDesktop isSideOpen={isSideOpen} toggleSideBar={toggleSideBar} />;
  }

  return (
    <div className={`main_wrapper ${isSideOpen ? 'open' : ''}`}>
      {renderSideBar()}
      <div className="main_container">
        {/* <Header /> */}
        <main className="main_content">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Main;
