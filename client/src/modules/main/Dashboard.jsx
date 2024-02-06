import '../../assets/css/dashboard.css';

import React, {useState} from 'react';
import {useTitle} from '../../hooks/useTitle';
import {useAxiosPrivate} from '../../hooks/useAxiosPrivate';

import Spinner from '../../component/Spinner';

const Dashboard = () => {
  useTitle('Kezdőlap');

  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);

  const axiosPrivate = useAxiosPrivate();

  const fetchUsers = async () => {
    setLoading(true);

    try {
      const response = await axiosPrivate.get('/api/v1/list_users');
      setUsers(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <div className="dashboard">
          <h1>Kezdőlap</h1>
          <p>Üdvözöllek a kezdőlapon!</p>
          <button onClick={fetchUsers}>Fetch Users</button>

          <div className="users">
            {users.map((user, index) => (
              <div key={index}>
                <h3>{user}</h3>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default Dashboard;
