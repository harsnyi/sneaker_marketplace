import axios from 'axios';

//Development api (PORT 8000 [Django])
export default axios.create({
  baseURL: 'http://localhost:8000',
});
