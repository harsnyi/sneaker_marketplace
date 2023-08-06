import {useEffect} from 'react';

function Notifications() {
  useEffect(() => {
    document.title = 'Értesítések | Laced.';
  }, []);
  return <h1>Hello from the notifications page</h1>;
}

export default Notifications;
