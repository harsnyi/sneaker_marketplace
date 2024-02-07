import {motion} from 'framer-motion';
import '../assets/css/transition.css';

const transition = (OgComponent) => {
  return () => (
    <>
      <OgComponent />
      {/* 
      <motion.div className="slide-in" initial={{scaleY: 0}} animate={{scaleY: 0}} exit={{scaleY: 1}} transition={{duration: 0.5, ease: [0.25, 1, 0.36, 1]}} />
      <motion.div className="slide-out" initial={{ scaleY: 1 }} animate={{ scaleY: 0 }} exit={{ scaleY: 0 }} transition={{ duration: 0.5, ease: [0.25, 1, 0.36, 1] }} />
      */}
    </>
  );
};

export default transition;
