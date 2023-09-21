import React, {useEffect, useState} from 'react';
import useRefreshToken from '../hooks/useRefreshToken';
import axios from '../setup/Axios';

function Profile() {
  const [users,setUsers] = useState([])
  const refresh = useRefreshToken();
  useEffect(() => {
    document.title = 'Profil | Footwr.';

    let isMounted = true;
    const controller = new AbortController();

    const getUsers = async () => {
      try {
        const response = await axios.get('/users',{
          signal:controller.signal
        });
        console.log(response.data);
        isMounted && setUsers(response.data);
      }catch(error) {
         console.error(error)
      }
    }

    getUsers();

    return () => {
      isMounted = false;
      controller.abort();
    }


  }, []);

  return (
    <>
      <div>
        <h2>Users list:</h2>

        {users?.length
        ? (
          <ul>
            {users.map((user,i) => <li key={i}>{user?.username}</li>)}
          </ul>
        ) : <p>No users to display</p>
        }
      </div>
      <button onClick={() => refresh()}>refresh</button>
    </>
  );
}

export default Profile;
