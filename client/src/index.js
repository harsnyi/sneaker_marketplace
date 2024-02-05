import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

import {QueryParamProvider} from 'use-query-params';
import {ReactRouter6Adapter} from 'use-query-params/adapters/react-router-6';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';

import AuthProvider from './context/AuthProvider';
import LoaderProvider from './context/LoaderProvider';
import LoadingProvider from './context/LoadingProvider';
import ToastContainer from './common/ToastContainer';
import ToastProvider from './context/ToastProvider';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Router>
    <QueryParamProvider adapter={ReactRouter6Adapter}>
      <AuthProvider>
        <LoaderProvider>
          <LoadingProvider>
            <ToastProvider>
              <ToastContainer />
              <Routes>
                <Route path="/*" element={<App />} />
              </Routes>
            </ToastProvider>
          </LoadingProvider>
        </LoaderProvider>
      </AuthProvider>
    </QueryParamProvider>
  </Router>
);
