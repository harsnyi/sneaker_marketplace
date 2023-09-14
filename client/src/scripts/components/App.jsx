import React, {lazy, Suspense} from 'react';
import {useMediaQuery} from 'react-responsive';

import '../../assets/css/globals.css';

import {Routes, Route} from 'react-router-dom';
import {DialogProvider} from '../bin/DialogProvider.jsx';

import MobileNavBar from './navigation/MobileNavBar';
import DesktopNavbar from './navigation/DesktopNavBar';
import Dialog from './other/Dialog';
import Loader from './other/Loader';
import Footer from './footer/Footer';
import RequireAuth from './auth/RequireAuth';

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

  return (
    <DialogProvider>
      <Dialog />

      <Suspense fallback={<Loader />}>
      <CommonLayout>
        <Routes>

            {/*Public routes*/}
            <Route path="/" element={<Home />} ></Route>
            <Route path="/home" element={<Home />} ></Route>
            <Route path="/about" element={<About />} ></Route>
            <Route path="/contact" element={<Contact />} ></Route>
            <Route path="/news" element={<News />} ></Route>

            {/*Protected Routes*/}
            <Route element={<RequireAuth allowedRole={5001}/>}>
              <Route path="/profile" element={<Profile />} ></Route>
              <Route path="/notifications" element={<Notifications />} ></Route>
              <Route path="/messages" element={<Messages />} ></Route>
              <Route path="/favourites" element={<Favourites />} ></Route>
              <Route path="/selling" element={<Selling />} ></Route>
              <Route path="/community" element={<Community />} ></Route>
              <Route path="/auction" element={<Auction />} ></Route>
              <Route path="/settings" element={<Settings />} ></Route>
            </Route>
            {/*Page not found not working as it should work*/}
            <Route path="/*" element={<PageNotFound />} />
            
        </Routes>
        </CommonLayout>

            

      </Suspense>
    </DialogProvider>
  );
}

export default App;
