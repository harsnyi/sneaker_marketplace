import React from 'react';
import ReactDOM from 'react-dom/client';
import {AuthProvider} from './scripts/components/context/AuthProvider';
import App from './scripts/components/App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <AuthProvider>
    <App />
  </AuthProvider>
);
