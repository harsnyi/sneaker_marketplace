import '../../assets/css/main-page.css';

import React, {useState, useEffect} from 'react';
import {useMediaQuery} from 'react-responsive';
import {Outlet} from 'react-router-dom';
import {AnimatePresence} from 'framer-motion';

import Transition from '../../component/Transition';
import SideBarDesktop from '../navigation/SideBarDesktop';
import NavigationMobile from '../navigation/NavigationMobile';
import Header from './Header';

const Main = () => {
  const isMobile = useMediaQuery({query: '(max-width: 1200px)'});
  const [isSideOpen, setIsSideOpen] = useState(true);
  const [animating, setAnimating] = useState(true);
  const [isFirstRender, setIsFirstRender] = useState(true);

  useEffect(() => {
    if (localStorage.getItem('isFirstRender')) {
      setIsFirstRender(false);
    } else {
      localStorage.setItem('isFirstRender', 'true');
    }
  }, []);

  const toggleSideBar = () => {
    setIsSideOpen(!isSideOpen);
  };

  function renderSideBar() {
    return isMobile ? <NavigationMobile /> : <SideBarDesktop isSideOpen={isSideOpen} toggleSideBar={toggleSideBar} />;
  }

  return (
    <AnimatePresence mode="wait">
      {isFirstRender ? (
        <Transition setAnimating={setAnimating}>
          {!animating ? (
            <div className={`main_wrapper ${isSideOpen ? 'open' : ''}`}>
              {renderSideBar()}
              <div className="main_container">
                <Header />
                <main className="main_content">
                  <Outlet />
                </main>
              </div>
            </div>
          ) : null}
        </Transition>
      ) : (
        <div className={`main_wrapper ${isSideOpen ? 'open' : ''}`}>
          {renderSideBar()}
          <div className="main_container">
            <Header />
            <main className="main_content">
              <Outlet />
            </main>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default Main;
