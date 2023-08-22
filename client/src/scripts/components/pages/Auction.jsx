import {useEffect} from 'react';

function Auction() {
  useEffect(() => {
    document.title = 'Licitek | Footwr.';
  }, []);
  return <h1>Hello from the auction page</h1>;
}

export default Auction;
