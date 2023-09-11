import '../../../assets/css/not_found.css';

import {NavLink} from 'react-router-dom';
import {useEffect, useState} from 'react';

const PageNotFound = () => {
  const [secondsLeft, setSecondsLeft] = useState(10);

  useEffect(() => {
    const interval = setInterval(() => {
      if (secondsLeft > 1) {
        setSecondsLeft(secondsLeft - 1);
      } else {
        clearInterval(interval);
        // Automatically click the button inside the NavLink when the interval ends
        document.getElementById('navLinkButton').click();
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [secondsLeft]);

  return (
    <div className="not-found-wrapper">
      <h1>
        <span>404 ...</span> <br /> A keresett oldal nem található!
      </h1>
      <h2>Hibás URL cím.</h2>
      <p>Automatikus átírányítás {secondsLeft} másodpercen belül.</p>
      <NavLink to="/" id="navLinkButton">
        <button className="btn-main btn-light">Vissza a főoldalra</button>
      </NavLink>
    </div>
  );
};

export default PageNotFound;
