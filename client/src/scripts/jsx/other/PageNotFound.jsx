import '../../../assets/css/not_found.css';

import {NavLink} from 'react-router-dom';

const PageNotFound = () => {
  return (
    <div className="not-found-wrapper">
      <h1>
        <span>404 ...</span> <br /> A keresett oldal nem található!
      </h1>
      <h2>Hibás URL cím.</h2>
      <NavLink to="/">
        <button className="btn-main btn-white">Vissza a főoldalra</button>
      </NavLink>
    </div>
  );
};

export default PageNotFound;
