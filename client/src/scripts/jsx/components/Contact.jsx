import {useEffect} from 'react';

function Contact() {
  useEffect(() => {
    document.title = 'Kapcsolat | Footwr.';
  }, []);
  return <h1>Hello from the contact page</h1>;
}

export default Contact;
