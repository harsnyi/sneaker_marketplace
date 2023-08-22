const Input = (props) => {
  const handleOnChange = (event) => {
    props.onChange(event.target.value); // Call the onChange function passed as a prop
  };

  const inputClassName = props.className + (props.error ? ' input-error' : ' ') + (props.succes ? ' input-success' : ' '); // Append 'input-error' class when error is present

  return (
    <>
      <div className="input-wrapper">
        <div className="input-group">
          <input type={props.type} value={props.value} onChange={handleOnChange} name={props.name} className={inputClassName} placeholder=" " />
          <label>{props.label}</label>
        </div>
        {props.error && <span style={{color: '#eb0000'}}>{props.error}</span>}
      </div>
    </>
  );
};

export default Input;
