import './assets/css/global.css';

import React, {Suspense, lazy} from 'react';
import {Routes, Route} from 'react-router-dom';

import RequireAuth from './modules/auth/RequireAuth';
import PersistLogin from './modules/auth/PersistLogin';

import Spinner from './component/Spinner';

const Authentication = lazy(() => import('./modules/auth/Authentication'));
const Main = lazy(() => import('./modules/main/Main'));
const Dashboard = lazy(() => import('./modules/main/Dashboard'));

const User = lazy(() => import('./modules/profile/User'));
const Profile = lazy(() => import('./modules/profile/Profile'));

const Settings = lazy(() => import('./modules/settings/Settings'));
const BasicSettings = lazy(() => import('./modules/settings/BasicSettings'));

const ErrorPage = lazy(() => import('./modules/error/ErrorPage'));

const ROLES = {
  Guest: 4001,
  User: 5002,
  Contributor: 6003,
  Admin: 7004,
};

function App() {
  return (
    <Suspense fallback={<Spinner />}>
      <Routes>
        {/* public routes */}
        <Route path="/auth" element={<Authentication />} />

        {/* private routes */}
        <Route element={<PersistLogin />}>
          <Route element={<RequireAuth allowedRoles={[ROLES.User, ROLES.Contributor, ROLES.Admin]} />}>
            <Route path="/" element={<Main />}>
              <Route index element={<Dashboard />} />

              <Route element={<RequireAuth allowedRoles={[ROLES.User, ROLES.Contributor, ROLES.Admin]} />}>
                <Route exact path="/profile/:uname" element={<User />}>
                  <Route index element={<Profile />} />
                </Route>
              </Route>

              <Route element={<RequireAuth allowedRoles={[ROLES.User, ROLES.Contributor, ROLES.Admin]} />}>
                <Route exact path="/settings" element={<Settings />} >
                  <Route index element={<BasicSettings />}/>
                </Route>
              </Route>

            </Route>
          </Route>
        </Route>

        {/* catch all */}
        <Route path="/unauthorized" element={<ErrorPage code={403} />} />
        <Route path="*" element={<ErrorPage code={404} />} />
      </Routes>
    </Suspense>
  );
}

export default App;
