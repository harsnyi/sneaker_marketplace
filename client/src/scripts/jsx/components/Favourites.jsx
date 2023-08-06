import {useEffect} from 'react';

function Favourites() {
  useEffect(() => {
    document.title = 'Kedvencek | Laced.';
  }, []);
  return <h1>Hello from the favourites page</h1>;
}

export default Favourites;
