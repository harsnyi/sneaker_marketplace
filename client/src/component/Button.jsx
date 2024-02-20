import '../assets/css/button.css';

import Spinner from './Spinner';

const Button = ({children, className, loading, text, ...attributes}) => {
  const classN = className ? `btn ${className}` : 'btn';

  return (
    <button type="button" className={classN} disabled={loading} {...attributes}>
      {loading ? (
        <Spinner />
      ) : (
        <>
          {children}
          {text && <span>{text}</span>}
        </>
      )}
    </button>
  );
};

export default Button;
