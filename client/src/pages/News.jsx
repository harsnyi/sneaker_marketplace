import {useEffect} from 'react';

function News() {
  useEffect(() => {
    document.title = 'Hírek | Footwr.';
  }, []);
  return <h1>Hello from the news page</h1>;
}

export default News;
