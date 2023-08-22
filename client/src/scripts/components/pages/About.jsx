import {useEffect} from 'react';

function About() {
  useEffect(() => {
    document.title = 'Rólunk | Footwr.';
  }, []);
  return <h1>Hello from the about page</h1>;
}

export default About;
