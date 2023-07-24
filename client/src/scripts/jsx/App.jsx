import React from 'react';
import { useMediaQuery } from 'react-responsive';

import '../../assets/css/globals.css';

import SearchBar from './search/SearchBar';
import MobileNavBar from './navigation/MobileNavBar';
import DesktopNavbar from './navigation/DesktopNavBar';
import Home from './home/Home';


const App = () => {
  const isMobile = useMediaQuery({query: '(max-width: 768px)'});
  
  return <>
    <SearchBar />
    {isMobile ? <MobileNavBar /> : <DesktopNavbar />}
    <div className='main-content'>
      <Home />
    </div>
   </>;
};

export default App;
