import {motion} from 'framer-motion';

const Transition = ({children}) => {
  const anim = (variants) => {
    return {
      initial: 'initial',
      animate: 'enter',
      exit: 'exit',
      variants: variants,
    };
  };

  const numOfColumns = 5;
  const columns = Array.from({length: numOfColumns}, (_, i) => <div key={i} />);

  return (
    <div className="page stairs">
      <div className="transition_container">{columns}</div>
      {children}
    </div>
  );
};

export default Transition;
