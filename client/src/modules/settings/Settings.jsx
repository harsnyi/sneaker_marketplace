import '../../assets/css/settings.css';

import {useTitle} from '../../hooks/useTitle';
import {Outlet} from 'react-router-dom';

import SettingsNav from './SettingsNav';

const Settings = () => {
  useTitle('Beállítások');
  return (
    <section className="settings_section">
      <SettingsNav />
      <Outlet />
    </section>
  );
};

export default Settings;
