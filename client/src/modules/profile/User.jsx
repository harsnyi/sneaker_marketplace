import { useTitle } from '../../hooks/useTitle';
import { useEffect, useState } from 'react';
import {useParams} from 'react-router-dom';

import {useAxiosPrivate} from '../../hooks/useAxiosPrivate';
import { useToast } from '../../hooks/useToast';

import Spinner from '../../component/Spinner';

const User = () => {
    useTitle('Profil');

    const {uname} = useParams();
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);

    const axiosPrivate = useAxiosPrivate();
    const { addToast } = useToast();

    useEffect(() => {
        const fetchData = async () => { 
        setLoading(true);

        try {
            const response = await axiosPrivate.get(`/api/v1/get_profile_data/${uname}`);
            setData(response.data);
        } catch (error) {
            addToast('error', error.message);
        } finally { 
            setLoading(false);
        }
        };

        fetchData();

    }, []);

     return (
        <>
            {loading ? (
                <Spinner />
            ) : (
                <div>
                <h1>Profil</h1>
                </div>
            )}
        </>
     );
 };

export default User;