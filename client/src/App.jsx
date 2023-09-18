import React, {lazy, Suspense} from 'react';
import {useMediaQuery} from 'react-responsive';

import './assets/css/globals.css';

import {Routes, Route, BrowserRouter} from 'react-router-dom';
import {DialogProvider} from './setup/DialogProvider';
import {LoaderProvider} from './setup/LoaderProvider';

import MobileNavBar from './modules/navigation/MobileNavBar';
import DesktopNavbar from './modules/navigation/DesktopNavBar';
import Dialog from './common/Dialog';
import Loader from './common/Loader';
import Footer from './modules/footer/Footer';
import RequireAuth from './modules/auth/RequireAuth';

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
          <RequireAuth allowedRole={5001}>
            <Profile />
          </RequireAuth>
        </CommonLayout>
      ),
    },
    {
      path: '/notifications',
      element: (
        <CommonLayout>
          <RequireAuth allowedRole={5001}>
            <Notifications />
          </RequireAuth>
        </CommonLayout>
      ),
    },
    {
      path: '/messages',
      element: (
        <CommonLayout>
          <RequireAuth allowedRole={5001}>
            <Messages />
          </RequireAuth>
        </CommonLayout>
      ),
    },
    {
      path: '/favourites',
      element: (
        <CommonLayout>
          <RequireAuth allowedRole={5001}>
            <Favourites />
          </RequireAuth>
        </CommonLayout>
      ),
    },
    {
      path: '/selling',
      element: (
        <CommonLayout>
          <RequireAuth allowedRole={5001}>
            <Selling />
          </RequireAuth>
        </CommonLayout>
      ),
    },
    {
      path: '/community',
      element: (
        <CommonLayout>
          <RequireAuth allowedRole={5001}>
            <Community />
          </RequireAuth>
        </CommonLayout>
      ),
    },
    {
      path: '/auction',
      element: (
        <CommonLayout>
          <RequireAuth allowedRole={5001}>
            <Auction />
          </RequireAuth>
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
          <RequireAuth allowedRole={5001}>
            <Settings />
          </RequireAuth>
        </CommonLayout>
      ),
    },
    {
      path: '/*',
      element: <PageNotFound />,
    },
  ];

  return (
    <LoaderProvider>
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
    </LoaderProvider>
  );
}

export default App;
