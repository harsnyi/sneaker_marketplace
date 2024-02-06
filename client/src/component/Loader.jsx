import '../assets/css/loader.css';

import {useLoader} from '../hooks/useLoader';

const Loader = () => {
  const {loading} = useLoader();
  if (!loading) return null;

  return (
    <div className="loader_container">
      <div className="loader"></div>
    </div>
  );
};

export default Loader;
