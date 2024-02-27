import '../../assets/css/button.css';

import Spinner from '../../component/Spinner';

const Button = ({children, className, loading, disabled, text, ...attributes}) => {
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
