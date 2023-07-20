import React from 'react';
import { useMediaQuery } from 'react-responsive';

import '../../assets/css/globals.css';

import SearchBar from './search/SearchBar';
import MobileNavBar from './navigation/MobileNavBar';
import DesktopNavbar from './navigation/DesktopNavBar';


const App = () => {
  const isMobile = useMediaQuery({query: '(max-width: 600px)'});
  
  return <>
    <SearchBar />
    {isMobile ? <MobileNavBar /> : <DesktopNavbar />}
    <div className='main-content'>
      <h1>Main Content</h1>
    </div>
   </>;
};

export default App;
