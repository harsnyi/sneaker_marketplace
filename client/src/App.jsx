import React, {lazy, Suspense} from 'react';
import {useMediaQuery} from 'react-responsive';

import './assets/css/globals.css';

import {Routes, Route, BrowserRouter} from 'react-router-dom';
import ToastProvider from './setup/ToastProvider';
import LoaderProvider from './setup/LoaderProvider';

import MobileNavBar from './modules/navigation/MobileNavBar';
import DesktopNavbar from './modules/navigation/DesktopNavBar';
import Loader from './common/Loader';
import Footer from './modules/footer/Footer';
import RequireAuth from './modules/auth/RequireAuth';
import ToastContainer from './common/ToastContainer';

const Home = lazy(() => import('./modules/home/Home'));
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
const PageNotFound = lazy(() => import('./common/PageNotFound'));

function App() {
  const isMobile = useMediaQuery({query: '(max-width: 768px)'});

  function renderNavBar() {
    return isMobile ? <MobileNavBar /> : <DesktopNavbar />;
  }

  const CommonLayout = ({children}) => (
    <>
      {renderNavBar()}
      <main className="main-content">{children}</main>
      <Footer />
    </>
  );

  const visible_routes = [
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
      path: '/news',
      element: (
        <CommonLayout>
          <News />
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
      path: '/*',
      element: <PageNotFound />,
    },
  ];

  const protected_routes = [
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
      path: '/settings',
      element: (
        <CommonLayout>
          <Settings />
        </CommonLayout>
      ),
    },
  ];

  return (
    <LoaderProvider>
      <ToastProvider>
        <Suspense fallback={<Loader />}>
          <BrowserRouter basename="/">
            <Routes>
              {/*Visible routes*/}
              {visible_routes.map(({path, element}) => (
                <Route key={path} path={path} element={element} />
              ))}

              {/*Protected routes*/}
              {protected_routes.map(({path, element}) => (
                <Route element={<RequireAuth allowedRole={5001} />}>
                  <Route key={path} path={path} element={element} />
                </Route>
              ))}
            </Routes>
            <ToastContainer />
          </BrowserRouter>
        </Suspense>
      </ToastProvider>
    </LoaderProvider>
  );
}

export default App;
