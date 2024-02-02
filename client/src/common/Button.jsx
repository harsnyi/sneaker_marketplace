import '../assets/css/button.css';

import Spinner from './Spinner';

const Button = ({children, className, loading, text, ...attributes}) => {
  const classN = className ? `btn ${className}` : 'btn';
  const isTertiaryButton = className && className.includes('tertiary');

  return (
    <button type="button" className={classN} disabled={!isTertiaryButton && loading} {...attributes}>
      {loading && !isTertiaryButton ? (
        <Spinner />
      ) : (
        <>
          {children}
          <span>{text}</span>
        </>
      )}
    </button>
  );
};

export default Button;
