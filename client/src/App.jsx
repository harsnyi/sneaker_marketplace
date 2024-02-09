import './assets/css/global.css';

import React, {Suspense, lazy} from 'react';
import {Routes, Route, useLocation} from 'react-router-dom';

import RequireAuth from './modules/auth/RequireAuth';
import PersistLogin from './modules/auth/PersistLogin';

import Spinner from './component/Spinner';
import {AnimatePresence} from 'framer-motion';

const Authentication = lazy(() => import('./modules/auth/Authentication'));
const Main = lazy(() => import('./modules/main/Main'));
const Dashboard = lazy(() => import('./modules/main/Dashboard'));

const Admin = lazy(() => import('./modules/admin/Admin'));

const ErrorPage = lazy(() => import('./modules/error/ErrorPage'));

const ROLES = {
  Guest: 4001,
  User: 5002,
  Contributor: 6003,
  Admin: 7004,
};

function App() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Suspense fallback={<Spinner />}>
        <Routes location={location} key={location.pathname}>
          {/* public routes */}
          <Route path="/auth" element={<Authentication />} />

          {/* private routes */}
          <Route element={<PersistLogin />}>
            <Route element={<RequireAuth allowedRoles={[ROLES.User, ROLES.Contributor, ROLES.Admin]} />}>
              <Route path="/" element={<Main />}>
                <Route index element={<Dashboard />} />

                <Route element={<RequireAuth allowedRoles={[ROLES.User]} />}>
                  <Route path="/profile" element={<Admin />} />
                </Route>
              </Route>
            </Route>
          </Route>

          {/* catch all */}
          <Route path="/unauthorized" element={<ErrorPage code={403} />} />
          <Route path="*" element={<ErrorPage code={404} />} />
        </Routes>
      </Suspense>
    </AnimatePresence>
  );
}

export default App;
