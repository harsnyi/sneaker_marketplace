import '../../assets/css/authentication.css';

import React from 'react';
import {useTitle} from '../../hooks/useTitle';

import AuthTabs from './AuthTabs';
import Hero from './Hero';

const Authentication = () => {
  useTitle('Belépés');

  return (
    <>
      <section className="auth_page">
        <Hero />
        <div className="auth_container">
          <h1 className="brand_title">Bump</h1>
          <AuthTabs />
        </div>
      </section>
    </>
  );
};

export default Authentication;
