import {useEffect} from 'react';

function Favourites() {
  useEffect(() => {
    document.title = 'Kedvencek | Footwr.';
  }, []);
  return <h1>Hello from the favourites page</h1>;
}

export default Favourites;