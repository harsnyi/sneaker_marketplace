import React from 'react';
import {useMediaQuery} from 'react-responsive';

import '../../assets/css/globals.css';

import MobileNavBar from './navigation/MobileNavBar';
import DesktopNavbar from './navigation/DesktopNavBar';
import Home from './home/Home';
import {Routes, Route, BrowserRouter} from 'react-router-dom';
import About from './pages/About';
import Profile from './pages/Profile';
import Notifications from './pages/Notifications';
import Messages from './pages/Messages';
import Favourites from './pages/Favourites';
import Selling from './pages/Selling';
import Community from './pages/Community';
import Auction from './pages/Auction';
import News from './pages/News';
import Contact from './pages/Contact';
import Settings from './pages/Settings';
import PageNotFound from './other/PageNotFound';
import Footer from './footer/Footer';

import Dialog from './other/Dialog';
import {DialogProvider} from '../bin/DialogProvider.js';

function App() {
  const isMobile = useMediaQuery({query: '(max-width: 768px)'});

  function renderNavBar() {
    return isMobile ? <MobileNavBar /> : <DesktopNavbar />;
  }

  const CommonLayout = ({children}) => (
    <>
      {renderNavBar()}
      <div className="main-content">{children}</div>
      <Footer />
    </>
  );

  const routes = [
    {
      path: '/',
      element: (
        <CommonLayout>
          <Home />
        </CommonLayout>
      ),
    },
    {
      path: '/home',
      element: (
        <CommonLayout>
          <Home />
        </CommonLayout>
      ),
    },
    {
      path: '/about',
      element: (
        <CommonLayout>
          <About />
        </CommonLayout>
      ),
    },
    {
      path: '/profile',
      element: (
        <CommonLayout>
          <Profile />
        </CommonLayout>
      ),
    },
    {
      path: '/notifications',
      element: (
        <CommonLayout>
          <Notifications />
        </CommonLayout>
      ),
    },
    {
      path: '/messages',
      element: (
        <CommonLayout>
          <Messages />
        </CommonLayout>
      ),
    },
    {
      path: '/favourites',
      element: (
        <CommonLayout>
          <Favourites />
        </CommonLayout>
      ),
    },
    {
      path: '/selling',
      element: (
        <CommonLayout>
          <Selling />
        </CommonLayout>
      ),
    },
    {
      path: '/community',
      element: (
        <CommonLayout>
          <Community />
        </CommonLayout>
      ),
    },
    {
      path: '/auction',
      element: (
        <CommonLayout>
          <Auction />
        </CommonLayout>
      ),
    },
    {
      path: '/news',
      element: (
        <CommonLayout>
          <News />
        </CommonLayout>
      ),
    },
    {
      path: '/about',
      element: (
        <CommonLayout>
          <About />
        </CommonLayout>
      ),
    },
    {
      path: '/contact',
      element: (
        <CommonLayout>
          <Contact />
        </CommonLayout>
      ),
    },
    {
      path: '/settings',
      element: (
        <CommonLayout>
          <Settings />
        </CommonLayout>
      ),
    },
    {
      path: '/*',
      element: <PageNotFound />,
    },
  ];

  return (
    <DialogProvider>
      <Dialog />

      <BrowserRouter basename="/">
        <Routes>
          {routes.map(({path, element}) => (
            <Route key={path} path={path} element={element} />
          ))}
        </Routes>
      </BrowserRouter>
    </DialogProvider>
  );
}

export default App;
