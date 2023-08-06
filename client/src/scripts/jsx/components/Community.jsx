import {useEffect} from 'react';

function Community() {
  useEffect(() => {
    document.title = 'Közösség | Laced.';
  }, []);
  return <h1>Hello from the community page</h1>;
}

export default Community;
