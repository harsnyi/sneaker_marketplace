import React, {Fragment} from 'react';
import {useMediaQuery} from 'react-responsive';

import '../../assets/css/globals.css';

import SearchBar from './search/SearchBar';
import MobileNavBar from './navigation/MobileNavBar';
import DesktopNavbar from './navigation/DesktopNavBar';
import Home from './home/Home';
import {Routes, Route, BrowserRouter} from 'react-router-dom';
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
import AuthenticationPage from './components/AuthenticationPage';

function App() {
  const isMobile = useMediaQuery({query: '(max-width: 768px)'});

  function renderNavBar() {
    return isMobile ? <MobileNavBar /> : <DesktopNavbar />;
  }

  return (
    <BrowserRouter basename="/">
      <Routes>
        <Route
          path="/"
          element={
            <>
              <SearchBar />
              {renderNavBar()}
              <div className="main-content">
                <Home />
              </div>
            </>
          }
        />
        <Route
          path="/home"
          element={
            <>
              <SearchBar />
              {renderNavBar()}
              <div className="main-content">
                <Home />
              </div>
            </>
          }
        />
        <Route
          path="/about"
          element={
            <>
              <SearchBar />
              {renderNavBar()}
              <div className="main-content">
                <About />
              </div>
            </>
          }
        />
        <Route
          path="/profile"
          element={
            <>
              <SearchBar />
              {renderNavBar()}
              <div className="main-content">
                <Profile />
              </div>
            </>
          }
        />
        <Route
          path="/notifications"
          element={
            <>
              <SearchBar />
              {renderNavBar()}
              <div className="main-content">
                <Notifications />
              </div>
            </>
          }
        />
        <Route
          path="/messages"
          element={
            <>
              <SearchBar />
              {renderNavBar()}
              <div className="main-content">
                <Messages />
              </div>
            </>
          }
        />
        <Route
          path="/favourites"
          element={
            <>
              <SearchBar />
              {renderNavBar()}
              <div className="main-content">
                <Favourites />
              </div>
            </>
          }
        />
        <Route
          path="/selling"
          element={
            <>
              <SearchBar />
              {renderNavBar()}
              <div className="main-content">
                <Selling />
              </div>
            </>
          }
        />
        <Route
          path="/community"
          element={
            <>
              <SearchBar />
              {renderNavBar()}
              <div className="main-content">
                <Community />
              </div>
            </>
          }
        />
        <Route
          path="/news"
          element={
            <>
              <SearchBar />
              {renderNavBar()}
              <div className="main-content">
                <News />
              </div>
            </>
          }
        />
        <Route
          path="/about"
          element={
            <>
              <SearchBar />
              {renderNavBar()}
              <div className="main-content">
                <About />
              </div>
            </>
          }
        />
        <Route
          path="/contact"
          element={
            <>
              <SearchBar />
              {renderNavBar()}
              <div className="main-content">
                <Contact />
              </div>
            </>
          }
        />
        <Route
          path="/settings"
          element={
            <>
              <SearchBar />
              {renderNavBar()}
              <div className="main-content">
                <Settings />
              </div>
            </>
          }
        />

        <Route
          path="/login"
          element={
            <>
              <AuthenticationPage />
            </>
          }
        />

        <Route
          path="/registration"
          element={
            <>
              <AuthenticationPage />
            </>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
