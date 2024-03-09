import '../../assets/css/input.css';

import {FaCheck} from 'react-icons/fa';

const TextArea = ({label, description, error, success, disabled, value, name, onChange, className, autoFocus, rows, ...props}) => {
  const handleOnChange = (event) => {
    onChange(event.target.value);
  };

  const textareaClassName = className + (error ? ' error' : ' ') + (success ? ' success' : ' ') + (disabled ? ' disabled' : '');

  return (
    <div className="input_wrapper">
      <div className="input_group">
        <textarea value={value} onChange={handleOnChange} name={name} className={`input_field textarea ${textareaClassName}`} placeholder=" " autoFocus={autoFocus} rows={rows} {...props} />
        <label>{label}</label>
        {success && <FaCheck className="input_svg success" />}
      </div>
      {error && <p className="error_msg">{error}</p>}
    </div>
  );
};

export default TextArea;
