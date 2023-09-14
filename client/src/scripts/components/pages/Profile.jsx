import React, {useEffect} from 'react';
import useRefreshToken from '../hooks/useRefreshToken';

function Profile() {
  const refresh = useRefreshToken();
  useEffect(() => {
    document.title = 'Profil | Footwr.';
  }, []);

  return <><h1>Hello from the profile page</h1>
            <button onClick={()=>refresh()}>refresh</button>
        </>;
}

export default Profile;
