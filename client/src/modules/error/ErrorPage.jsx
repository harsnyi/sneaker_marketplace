import '../../assets/css/error-page.css';

import React from 'react';
import {useNavigate} from 'react-router-dom';
import {useTitle} from '../../hooks/useTitle';
import Button from '../../component/Button';

import {IoMdArrowBack} from 'react-icons/io';

const errors = [
  {code: 404, title: 'Hoppá! Valami hiba történt.', message: 'Sajnáljuk, a keresett oldal nem található, vagy megszűnt.'},
  {code: 403, title: 'Hoppá! Hiányzó jogosultság.', message: 'Sajnáljuk, de nincs jogosultságod a keresett oldal megtekintéséhez.'},
];

const ErrorPage = ({code}) => {
  useTitle(`Hiba`);
  const navigate = useNavigate();

  const error = errors.find((error) => error.code === code);

  const handleOnClick = () => {
    navigate('/');
  };

  return error ? (
    <section className="error_wrapper">
      <article>
        <h3>{error.code}</h3>
        <h1>{error.title}</h1>
        <p>{error.message}</p>
        <Button onClick={handleOnClick} className="secondary light" text="Vissza a kezdőlapra">
          <IoMdArrowBack />
        </Button>
      </article>
    </section>
  ) : (
    <section className="error_wrapper">
      <article>
        <h3>500</h3>
        <h1>Hoppá! Valami hiba történt.</h1>
        <p>Sajnáljuk, váratlan hiba történt.</p>
        <Button onClick={handleOnClick} className="secondary light" text="Vissza a kezdőlapra">
          <IoMdArrowBack />
        </Button>
      </article>
    </section>
  );
};

export default ErrorPage;
