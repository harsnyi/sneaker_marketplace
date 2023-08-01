import {useState} from 'react';

const Input = (props) => {
  const [error, setError] = useState('');

  const handleInputChange = (event) => {
    const inputValue = event.target.value;
    setError('');

    // Perform validation based on the given type
    if (props.required && inputValue.trim() === '') {
      setError('A mező kitöltése kötelező.');
    } else if (props.type === 'email' && !/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(inputValue)) {
      setError('Nem megfelelő e-mail cím.');
    }

    // Pass the value to the parent component using onChange callback
    props.onChange(inputValue);
  };

  const inputClassName = props.className + (error ? ' input-error' : ''); // Append 'input-error' class when error is present

  return (
    <>
      <div className="input-error-div">
        <label>{props.label}</label>
        <input type={props.type} value={props.value} onChange={handleInputChange} name={props.name} className={inputClassName} />
        {error && <span style={{color: '#eb0000'}}>{error}</span>}
      </div>
    </>
  );
};

export default Input;
