import {useEffect} from 'react';

function Messages() {
  useEffect(() => {
    document.title = 'Üzenetek | Footwr.';
  }, []);
  return <h1>Hello from the messages page</h1>;
}

export default Messages;
