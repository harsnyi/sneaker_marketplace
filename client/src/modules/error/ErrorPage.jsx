import '../../assets/css/error-page.css';

import {NavLink, useNavigate} from 'react-router-dom';
import {useEffect, useState} from 'react';
import Button from '../../common/Button';

import {FiCornerDownLeft} from 'react-icons/fi';

const ErrorPage = () => {
  const [secondsLeft, setSecondsLeft] = useState(10);
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      if (secondsLeft > 1) {
        setSecondsLeft((prev) => prev - 1);
      } else {
        clearInterval(interval);
        navigate('/');
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [secondsLeft]);

  return (
    <div className="not-found-wrapper">
      <h1>
        <span className="error-code">404 ...</span> <br /> A keresett oldal nem található!
      </h1>
      <h2>Hibás URL cím.</h2>
      <p>Automatikus átírányítás {secondsLeft} másodpercen belül.</p>
      <NavLink to="/" id="navLinkButton">
        <Button className="primary" text="Vissza a főoldalra">
          <FiCornerDownLeft />
        </Button>
      </NavLink>
    </div>
  );
};

export default ErrorPage;
