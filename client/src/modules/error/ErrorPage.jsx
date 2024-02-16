import '../../assets/css/error-page.css';

import React from 'react';
import {useNavigate, Link} from 'react-router-dom';
import {useTitle} from '../../hooks/useTitle';
import Button from '../../component/Button';

import {IoMdArrowBack} from 'react-icons/io';
import Reveal from '../../component/Reveal';

const errors = [
  {code: 404, title: 'Hibás url cím!', message: 'Sajnáljuk, a keresett oldal nem található, vagy megszűnt.'},
  {code: 403, title: 'Hiányzó jogosultság!', message: 'Sajnáljuk, de nincs jogosultságod a keresett oldal megtekintéséhez.'},
];

const ErrorPage = ({code}) => {
  useTitle(`Hiba`);
  const navigate = useNavigate();

  const error = errors.find((error) => error.code === code) || {code: 500, title: 'Valami hiba történt.', message: 'Sajnáljuk, ismeretlen hibába ütköztünk a betöltés során. Kérjük próbáld meg frissíteni az oldalt.'};

  const handleOnClick = () => {
    navigate('/');
  };

  return (
    <section className="error_wrapper" data-error-code={error.code}>
      <Link to="/">Bump</Link>
      <article>
        <Reveal>
          <h1>{error.title}</h1>
        </Reveal>
        <Reveal delay={0.05}>
          <p>{error.message}</p>
        </Reveal>
        <Button className="primary white" text="Térj vissza a kezdőlapra" onClick={handleOnClick}>
          <IoMdArrowBack />
        </Button>
      </article>
    </section>
  );
};

export default ErrorPage;
