import React from 'react';
import {useMediaQuery} from 'react-responsive';

import MobileLayout from './MobileLayout';
import DesktopLayout from './DesktopLayout';

const App = () => {
  const isMobile = useMediaQuery({query: '(max-width: 768px)'});

  return <>{isMobile ? <MobileLayout /> : <DesktopLayout />}</>;
};

export default App;
