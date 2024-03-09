import '../../assets/css/input.css';

import {FaCheck} from 'react-icons/fa';

const CheckBox = ({className, label, value, onChange, error, ...props}) => {
  const handleOnChange = () => {
    onChange(!value);
  };

  const inputClassName = (className ? className : '') + (value ? 'checked' : '') + (error ? ' error' : '');

  return (
    <>
      <div className="input_wrapper">
        <div className="input_group">
          <div className={`checkbox ${inputClassName}`} onClick={handleOnChange}>
            <label>{label}</label>
            <span className="checkbox_input">{value && <FaCheck />}</span>
          </div>
        </div>
        {error && <p className="error_msg">{error}</p>}
      </div>
    </>
  );
};

export default CheckBox;
