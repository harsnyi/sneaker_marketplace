import React from 'react';
import '../assets/css/loader.css';

const Loader = ({loading}) => {
  if (!loading) return null;

  return (
    <div className="loader-container">
      <div className="loader"></div>
    </div>
  );
};

export default Loader;
