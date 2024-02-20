import '../assets/css/input.css';
import {useState} from 'react';
import {FaEye, FaEyeSlash, FaCheck} from 'react-icons/fa';

const Input = ({type, label, description, error, success, value, name, onChange, className, autoFocus, ...props}) => {
  const [isPasswordVisible, setPasswordVisible] = useState(false);

  const handleTogglePasswordVisibility = () => {
    setPasswordVisible((prevVisible) => !prevVisible);
  };

  const handleOnChange = (event) => {
    onChange(event.target.value);
  };

  const inputType = type === 'textarea' ? 'textarea' : isPasswordVisible ? 'text' : type;
  const inputClassName = className + (error ? ' error' : ' ') + (success ? ' success' : ' ');

  return (
    <>
      <div className="input_wrapper">
        {/* description && <p className="input_desc">{description}</p> */}
        <div className="input_group">
          {type === 'textarea' ? <textarea value={value} onChange={handleOnChange} name={name} className={`${inputClassName} textarea`} rows={props.rows} placeholder=" " autoFocus={autoFocus} /> : <input type={inputType} value={value} onChange={handleOnChange} name={name} className={inputClassName} placeholder=" " autoFocus={autoFocus} />}
          <label>{label}</label>
          {type === 'password' && (isPasswordVisible ? <FaEye onClick={handleTogglePasswordVisibility} className="input_svg" /> : <FaEyeSlash onClick={handleTogglePasswordVisibility} className="input_svg" />)}
          {success && <FaCheck className="input_svg success" />}
        </div>
        {error && <p className="error_msg">{error}</p>}
      </div>
    </>
  );
};

export default Input;
