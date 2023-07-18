import React from 'react';
import { useMediaQuery } from 'react-responsive';

import '../../assets/css/globals.css';

import SearchBar from './SearchBar';
import MobileNavBar from './MobileNavBar';
import DesktopNavbar from './DesktopNavBar';


const App = () => {
  const isMobile = useMediaQuery({query: '(max-width: 600px)'});
  
  return <>
    <SearchBar />
    {isMobile ? <MobileNavBar /> : <DesktopNavbar />}
  </>;
};

export default App;
