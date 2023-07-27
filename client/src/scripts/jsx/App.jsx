import React from 'react';
import { useMediaQuery } from 'react-responsive';

import '../../assets/css/globals.css';

import SearchBar from './search/SearchBar';
import MobileNavBar from './navigation/MobileNavBar';
import DesktopNavbar from './navigation/DesktopNavBar';
import Home from './home/Home';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Login from './components/Login';
import Registration from './components/Registration';
import About from './components/About';
import Profile from './components/Profile';
import Notifications from './components/Notifications';
import Messages from './components/Messages';
import Favourites from './components/Favourites';
import Selling from './components/Selling';
import Community from './components/Community';
import News from './components/News';
import Contact from './components/Contact';
import Settings from './components/Settings';
import More from './components/More';


function App() {
  const isMobile = useMediaQuery({query: '(max-width: 768px)'});
  
  return (
    <BrowserRouter basename="/">
    
    <SearchBar />
    {isMobile ? <MobileNavBar /> : <DesktopNavbar />}
    <div className='main-content'>
    
    <Routes>

      {/*Routes with no authentication needed*/}
      <Route path="/" element={<Home/>}/>
      <Route path="home" element={<Home/>}/>
      <Route path="login" element={<Login/>}/>
      <Route path="registration" element={<Registration/>}/>
      <Route path="about" element={<About/>}/>

      <Route path="profile" element={<Profile/>}/>
      <Route path="notifications" element={<Notifications/>}/>
      <Route path="messages" element={<Messages/>}/>
      <Route path="favourites" element={<Favourites/>}/>
      <Route path="selling" element={<Selling/>}/>
      <Route path="community" element={<Community/>}/>
      <Route path="news" element={<News/>}/>
      <Route path="about" element={<About/>}/>
      <Route path="contact" element={<Contact/>}/>
      <Route path="settings" element={<Settings/>}/>
      <Route path="more" element={<More/>}/>


      
        


      
      





    
    </Routes>
    </div>
    </BrowserRouter>
  
  );
};

export default App;
