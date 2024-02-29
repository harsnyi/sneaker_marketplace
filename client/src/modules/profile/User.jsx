import {useTitle} from '../../hooks/useTitle';
import {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';

import {useAxiosPrivate} from '../../hooks/useAxiosPrivate';
import {useToast} from '../../hooks/useToast';

import Spinner from '../../component/Spinner';

const User = () => {
  useTitle('Profil');

  const {uname} = useParams();
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(false);

  const axiosPrivate = useAxiosPrivate();
  const {addToast} = useToast();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      try {
        const response = await axiosPrivate.get(`/api/v1/get_profile_data/${uname}`);
        setUser(response.data.message);
      } catch (error) {
        addToast('error', error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [uname]);

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <div>
          <h1>Profil</h1>
          <span>{user.username}</span>
          <br />
          <span>{user.last_name + ' '}</span>
          <span>{user.first_name}</span>
          <br />
          <span>{user.phone_number}</span>
        </div>
      )}
    </>
  );
};

export default User;
