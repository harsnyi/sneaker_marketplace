import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

import {QueryParamProvider} from 'use-query-params';
import {ReactRouter6Adapter} from 'use-query-params/adapters/react-router-6';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';

import AuthProvider from './context/AuthProvider';
import LoaderProvider from './context/LoaderProvider';
import ToastContainer from './component/ToastContainer';
import ToastProvider from './context/ToastProvider';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Router>
    <QueryParamProvider adapter={ReactRouter6Adapter}>
      <AuthProvider>
        <LoaderProvider>
          <ToastProvider>
            <ToastContainer />
            <Routes>
              <Route path="/*" element={<App />} />
            </Routes>
          </ToastProvider>
        </LoaderProvider>
      </AuthProvider>
    </QueryParamProvider>
  </Router>
);
