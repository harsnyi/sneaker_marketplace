import React, {useEffect} from 'react';

function Profile() {
  useEffect(() => {
    document.title = 'Profil | Footwr.';
  }, []);

  return <h1>Hello from the profile page</h1>;
}

export default Profile;
