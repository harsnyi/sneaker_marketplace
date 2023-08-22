import {useEffect} from 'react';

function Settings() {
  useEffect(() => {
    document.title = 'Beállítások | Footwr.';
  }, []);
  return <h1>Hello from the settings page</h1>;
}

export default Settings;
