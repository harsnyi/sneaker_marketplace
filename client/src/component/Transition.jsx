import '../assets/css/transition-page.css';
import { motion } from 'framer-motion';

const Transition = ({ children }) => {

  const anim = (variants, custom) => {
    return {
      initial: 'initial',
      animate: 'enter',
      exit: 'exit',
      variants,
      custom
    };
  };

  const expand = {
    initial: {
      top: 0
    },
    enter: (i) => ({
      top: "100%",
      transition: {
        duration: 0.3,
        delay: 0.05 * i
      },
      transitionEnd: {
        height: 0,
        top: 0
      }
    }),
    exit: (i) => ({
      height: "100%",
      transition: {
        duration: 0.3,
        delay: 0.05 * i
      }
    }),
  };

  const overlay = {
    initial: {
      opacity: 0.5
    },
    enter: {
      opacity: 0
    },
    exit: {
      opacity: 0.5
    }
  };

  const numOfColumns = 5;
  const columns = Array.from({length: numOfColumns}, (_, i) => <motion.div {...anim(expand, numOfColumns - i)} key={i} />);

  return (
    <div className="page stairs">
      <motion.div className='overlay' {...anim(overlay)}></motion.div>
      <div className="transition_container">{columns}</div>
      {children}
    </div>
  );
};

export default Transition;
