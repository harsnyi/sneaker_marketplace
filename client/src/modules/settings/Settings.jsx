import '../../assets/css/settings.css';

import { useTitle } from '../../hooks/useTitle';
import {Outlet} from 'react-router-dom';

const Settings = () => { 
    useTitle('Beállítások');

    return (
        <>
            <h1>Settings</h1>
            <Outlet />
        </>
    );
}

export default Settings;