import '../assets/css/transition.css';

import {motion} from 'framer-motion';
import {gsap} from 'gsap/gsap-core';

const transition = (OgComponent) => {
  const transition = document.querySelector('.transition'),
    transitionCol = document.querySelectorAll('.transition_column'),
    transitionElementText = document.querySelector('.transition_element > h1');

  const initTransition = () => {
    gsap.set(transition, {display: 'none', autoAlpha: 0});
    gsap.set(transitionCol, {y: '-101%'});
    gsap.set(transitionElementText, {autoAlpha: 0});
  };

  const show = () => {
    gsap
      .timeline({defaults: {ease: 'expo.inOut'}})
      .to(
        transition,
        {
          duration: 0.2,
          display: 'block',
          autoAlpha: 1,
        },
        0
      )
      .to(
        transitionCol,
        {
          duration: 1,
          y: 0,
          stagger: {
            each: 0.045,
            from: 'random',
            grid: 'auto',
          },
        },
        0.05
      )
      .to(
        transitionElementText,
        {
          duration: 0.5,
          autoAlpha: 1,
          stagger: {
            each: 0.055,
            from: 'random',
          },
          onComplete: () => {
            hide();
          },
        },
        0.75
      );
  };

  const hide = () => {
    gsap
      .timeline({defaults: {ease: 'expo.inOut'}})
      .to(
        transitionElementText,
        {
          duration: 1,
          autoAlpha: 0,
          stagger: 0.055,
        },
        0
      )
      .to(
        transitionCol,
        {
          duration: 1,
          y: '101%',
          stagger: {
            each: 0.045,
            from: 'random',
            grid: 'auto',
          },
        },
        0.75
      )
      .to(transition, {
        duration: 0.2,
        display: 'none',
        autoAlpha: 0,
        onComplete: initTransition,
      });
  };

  window.onload = () => {
    initTransition();
  };

  return () => (
    <>
      <OgComponent />
      {/* 
      <motion.div className="slide-in" initial={{scaleY: 0}} animate={{scaleY: 0}} exit={{scaleY: 1}} transition={{duration: 0.5, ease: [0.25, 1, 0.36, 1]}} />
      <motion.div className="slide-out" initial={{ scaleY: 1 }} animate={{ scaleY: 0 }} exit={{ scaleY: 0 }} transition={{ duration: 0.5, ease: [0.25, 1, 0.36, 1] }} />
      */}
      <section className="transition">
        <div className="transition_wrapper">
          <div className="transition_element">
            <h1>B</h1>
            <h1>U</h1>
            <h1>M</h1>
            <h1>P</h1>
          </div>

          <div className="transition_columns">
            <div className="transition_column"></div>

            <div className="transition_column"></div>

            <div className="transition_column"></div>

            <div className="transition_column"></div>

            <div className="transition_column"></div>
          </div>
        </div>
      </section>
    </>
  );
};

export default transition;
