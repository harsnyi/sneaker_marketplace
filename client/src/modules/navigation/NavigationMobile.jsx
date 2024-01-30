import mobileNavStyle from '../../assets/css/mobile-navigation.module.css';

import React, {useState} from 'react';

import MobileNav from './MobileNav';
import MobileSide from './MobileSide';
import MobileMenu from './MobileMenu';

const NavigationMobile = () => {
  const [sideBarOpen, setSideBarOpen] = useState(false);

  const toggleSideBar = () => {
    setSideBarOpen(!sideBarOpen);
  };

  return (
    <>
      <MobileNav mobileNavStyle={mobileNavStyle} toggleSideBar={toggleSideBar} sideBarOpen={sideBarOpen} />
      <MobileSide mobileNavStyle={mobileNavStyle} sideBarOpen={sideBarOpen} />
      <MobileMenu mobileNavStyle={mobileNavStyle} />
    </>
  );
};

export default NavigationMobile;
