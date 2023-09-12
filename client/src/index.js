import React from 'react';
import ReactDOM from 'react-dom/client';
import { AuthProvider } from './scripts/components/context/AuthProvider';
import App from './scripts/components/App';
import { BrowserRouter,Route,Routes } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render( <BrowserRouter>
                <AuthProvider>
                    <Routes>
                        <Route path="/*" element={<App />}></Route>
                    </Routes>
                    
                </AuthProvider>
            </BrowserRouter>);
