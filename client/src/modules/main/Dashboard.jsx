import '../../assets/css/dashboard.css';

import React from 'react';
import {useTitle} from '../../hooks/useTitle';

const Dashboard = () => {
  useTitle('Kezdőlap');

  return (
    <>
      <h1>Welcome To The Dashboard!</h1>
    </>
  );
};

export default Dashboard;
