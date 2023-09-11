import React, {lazy, Suspense} from 'react';
import {useMediaQuery} from 'react-responsive';

import '../../assets/css/globals.css';

import {Routes, Route, BrowserRouter} from 'react-router-dom';
import {DialogProvider} from '../bin/DialogProvider.jsx';

import MobileNavBar from './navigation/MobileNavBar';
import DesktopNavbar from './navigation/DesktopNavBar';
import Dialog from './other/Dialog';
import Loader from './other/Loader';
import Footer from './footer/Footer';

const Home = lazy(() => import('./home/Home'));
const About = lazy(() => import('./pages/About'));
const Profile = lazy(() => import('./pages/Profile'));
const Notifications = lazy(() => import('./pages/Notifications'));
const Messages = lazy(() => import('./pages/Messages'));
const Favourites = lazy(() => import('./pages/Favourites'));
const Selling = lazy(() => import('./pages/Selling'));
const Community = lazy(() => import('./pages/Community'));
const Auction = lazy(() => import('./pages/Auction'));
const News = lazy(() => import('./pages/News'));
const Contact = lazy(() => import('./pages/Contact'));
const Settings = lazy(() => import('./pages/Settings'));
const PageNotFound = lazy(() => import('./other/PageNotFound'));

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

      <Suspense fallback={<Loader />}>
        <BrowserRouter basename="/">
          <Routes>
            {routes.map(({path, element}) => (
              <Route key={path} path={path} element={element} />
            ))}
          </Routes>
        </BrowserRouter>
      </Suspense>
    </DialogProvider>
  );
}

export default App;
