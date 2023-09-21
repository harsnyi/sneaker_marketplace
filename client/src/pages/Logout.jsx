import {useEffect} from 'react';
import axios from '../setup/Axios';

const LOGOUT_URL = '/api/v1/token/logout';

function Logout() {

    useEffect(() => {
        document.title = 'Kijelentkezés | Footwr.';
    }, []);

    try {
        const response =  axios.post(LOGOUT_URL, {}, {
            withCredentials: true,
        });
        
        console.log(response.data);
    } catch (error) {
        console.log(error.response.status);
    }

    return <h1>Hello from the logout page</h1>;
}

export default Logout;
