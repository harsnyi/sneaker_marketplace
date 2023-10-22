import '../assets/css/reveal.css';
import {useEffect, useRef} from 'react';
import {motion, useInView, useAnimation, easeIn} from 'framer-motion';

const Reveal = ({children}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, {once: true});
  const mainControls = useAnimation();
  //const slideControls = useAnimation();

  useEffect(() => {
    if (isInView) {
      mainControls.start('visible');
      //slideControls.start('visible');
    }
  }, [isInView]);

  return (
    <div ref={ref} className="reveal-div">
      <motion.div
        variants={{
          hidden: {
            opacity: 0,
            y: 75,
          },
          visible: {
            opacity: 1,
            y: 0,
          },
        }}
        initial="hidden"
        animate={mainControls}
        transition={{duration: 0.2, delay: 0.25}}>
        {children}
      </motion.div>
      {/* 
      <motion.div
        className="slide-div"
        variants={{
          hidden: {
            left: 0,
          },
          visible: {
            left: '100%',
          },
        }}
        initial="hidden"
        animate={slideControls}
        transition={{ duration: 0.5, ease: 'easeIn' }}>
        </motion.div>
      */}
    </div>
  );
};

export default Reveal;
