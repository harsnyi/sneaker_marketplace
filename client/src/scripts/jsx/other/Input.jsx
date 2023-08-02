import {useState} from 'react';

const Input = (props) => {
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleInputChange = (event) => {
    const inputValue = event.target.value;

    // Pass the value to the parent component using onChange callback
    props.onChange(inputValue);
  };

  const validateInput = (event) => {
    const inputValue = event.target.value;
    setError('');
    setSuccess('');

    switch (props.name) {
      case 'email':
        if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(inputValue)) {
          setError('Nem megfelelő e-mail cím formátum.');
        }
        break;
      case 'password':
        if (inputValue.length < 8) {
          setError('A jelszónak legalább 8 karakter hosszúnak kell lennie.');
        } else if (!/\d/.test(inputValue)) {
          setError('A jelszónak tartalmaznia kell számot.');
        } else if (!/[a-z]/.test(inputValue)) {
          setError('A jelszónak tartalmaznia kell kisbetűt.');
        } else if (!/[A-Z]/.test(inputValue)) {
          setError('A jelszónak tartalmaznia kell nagybetűt.');
        } else if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(inputValue)) {
          setError('A jelszónak tartalmaznia kell speciális karaktert.');
        }
        break;
      case 'phone':
        if (!/^\+?[0-9]{11}$/.test(inputValue)) {
          setError('Valós telefonszámot adj meg.');
        }
        break;
      case 'name':
        if (!/^([A-ZÁÉÍÓÖŐÚÜŰ][a-záéíóöőúüű]*)( [A-ZÁÉÍÓÖŐÚÜŰ][a-záéíóöőúüű]*)*$/.test(inputValue)) {
          setError('Hibás név formátum.');
        }
        break;
      case 'username':
        if (!/^[a-zA-Z0-9_]+$/.test(inputValue)) {
          setError('Hibás felhasználónév.');
        } else if (inputValue.length < 3) {
          setError('Legalább 3 karakter.');
        } else if (inputValue.length > 20) {
          setError('Legfeljebb 20 karakter.');
        }
        break;
      default:
        break;
    }
  };

  const inputClassName = props.className + (error ? ' input-error' : ' ') + (success ? ' input-success' : ' '); // Append 'input-error' class when error is present

  return (
    <>
      <div className="input-wrapper">
        <div className="input-group">
          <input type={props.type} value={props.value} onChange={handleInputChange} onBlur={validateInput} name={props.name} className={inputClassName} placeholder=" " />
          <label>{props.label}</label>
        </div>
        {error && <span style={{color: '#eb0000'}}>{error}</span>}
      </div>
    </>
  );
};

export default Input;
