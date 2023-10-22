import './assets/css/global.css';

import React, {lazy, Suspense} from 'react';
import {Routes, Route} from 'react-router-dom';

import Loader from './common/Loader';
const Authentication = lazy(() => import('./modules/auth/Authentication'));
const Main = lazy(() => import('./modules/main/Main'));
const Dashboard = lazy(() => import('./modules/main/Dashboard'));
const Profile = lazy(() => import('./modules/profile/Profile'));
const ErrorPage = lazy(() => import('./common/ErrorPage'));

function App() {
  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        {/* (PUBLIC) Amennyiben a user nincs bejelentkezve, az auth jelenik meg, a weboldal többi részét nem képes elérni. */}
        <Route path="/auth" element={<Authentication />} />
        {/* (PROTECTED) Bejelentkezés után továbbírányítunk, az app alapja a Main komponens, ide kerülnek betöltésre az adott oldalak. */}
        <Route path="/" element={<Main />}>
          <Route index element={<Dashboard />} />
          <Route path="profile" element={<Profile />} />
        </Route>
        <Route path="*" element={<ErrorPage />} />

        {/*
        {visible_routes.map(({path, element}) => (
          <Route key={path} path={path} element={element} />
        ))}

        {protected_routes.map(({path, element}) => (
          <Route element={<RequireAuth allowedRole={5001} />}>
            <Route key={path} path={path} element={element} />
          </Route>
        ))}
        */}
      </Routes>
    </Suspense>
  );
}

export default App;
