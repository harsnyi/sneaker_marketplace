import '../assets/css/transition-page.css';
import {motion} from 'framer-motion';
import {useEffect, useState} from 'react';

const Transition = ({setAnimating, children}) => {
  const numOfColumns = 5;
  const [isEnterFinished, setIsEnterFinished] = useState(false);

  useEffect(() => {
    setIsEnterFinished(false); // Reset enter finished state on component mount
  }, []);

  // Generate an array of column indices and shuffle it
  const columnOrder = Array.from({length: numOfColumns}, (_, i) => i + 1);
  columnOrder.sort(() => Math.random() - 0.5);

  const anim = (variants, custom) => {
    return {
      initial: 'initial',
      animate: isEnterFinished ? 'exit' : 'enter',
      variants,
      custom,
    };
  };

  const expand = {
    initial: {
      height: 0,
      top: 0,
    },
    enter: (i) => ({
      height: '100%',
      transition: {
        duration: 0.3,
        delay: 0.05 * columnOrder[i - 1], // Use the shuffled column order to determine the delay
      },
    }),
    exit: (i) => ({
      height: 0,
      top: '100%',
      transition: {
        duration: 0.3,
        delay: 0.05 * columnOrder[i - 1], // Use the same shuffled column order for the exit animation
        onComplete: () => {
          if (i === columnOrder[0]) {
            // Check if the animation of the first column in the shuffled order is complete
            setAnimating(false);
          }
        },
      },
    }),
  };

  const overlay = {
    initial: {
      opacity: 1,
    },
    enter: {
      opacity: 1,
    },
    exit: {
      opacity: 0,
    },
  };

  const handleAnimationComplete = (i) => {
    if (i === numOfColumns) {
      // Delay the setting of isEnterFinished to true to allow the last column to finish its animation
      setTimeout(() => setIsEnterFinished(true), 250);
    }
  };

  const columns = Array.from({length: numOfColumns}, (_, i) => <motion.div {...anim(expand, i + 1)} key={i} onAnimationComplete={() => handleAnimationComplete(i + 1)} />);

  return (
    <div className="page stairs">
      <div className="transition_container">{columns}</div>
      <motion.div className="overlay" {...anim(overlay)}></motion.div>
      {children}
    </div>
  );
};

export default Transition;
