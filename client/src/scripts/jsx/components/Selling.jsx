import {useEffect} from 'react';

function Selling() {
  useEffect(() => {
    document.title = 'Eladás | Footwr.';
  }, []);
  return <h1>Hello from the selling page</h1>;
}

export default Selling;
