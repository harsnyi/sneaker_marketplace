import './assets/css/global.css';

import React, {lazy, Suspense} from 'react';
import {Routes, Route} from 'react-router-dom';

import RequireAuth from './modules/auth/RequireAuth';
import PersistLogin from './modules/auth/PersistLogin';

import Loader from './common/Loader';
const Authentication = lazy(() => import('./modules/auth/Authentication'));
const Main = lazy(() => import('./modules/main/Main'));
const Dashboard = lazy(() => import('./modules/main/Dashboard'));

const Admin = lazy(() => import('./modules/admin/Admin'));

const Unauthorized = lazy(() => import('./modules/error/Unauthorized'));
const ErrorPage = lazy(() => import('./modules/error/ErrorPage'));

const ROLES = {
  Guest: 4001,
  User: 5002,
  Contributor: 6003,
  Admin: 7004,
};

function App() {
  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        {/* public routes */}
        <Route path="/auth" element={<Authentication />} />
        <Route path="/unauthorized" element={<Unauthorized />} />

        {/* private routes */}
        <Route element={<PersistLogin />}>
          <Route element={<RequireAuth allowedRoles={[ROLES.User, ROLES.Contributor, ROLES.Admin]} />}>
            <Route path="/" element={<Main />}>
              <Route index element={<Dashboard />} />

              <Route element={<RequireAuth allowedRoles={[ROLES.Admin]} />}>
                <Route path="/profile" element={<Admin />} />
              </Route>
            </Route>
          </Route>
        </Route>

        {/* catch all */}
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </Suspense>
  );
}

export default App;
