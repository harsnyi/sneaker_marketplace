import { useState } from "react";

const SignupForm = () => {
  
  const [lastName, setLastName] = useState('');
  const [firstName, setFirstName] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [gender, setGender] = useState(0);


  return (

       <h1>Még nem vagy tag?</h1>
      <form onSubmit="">
        <label>Vezetéknév</label>
        <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} />
        <label>Keresztnév</label>
        <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
        <label>E-Mail</label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <label>Felhasználónév</label>
        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
        <label>Jelszó</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <label>Jelszó újra</label>
        <input type="password" value={passwordConfirmation} onChange={(e) => setPasswordConfirmation(e.target.value)} />
        <label>Telefonszám</label>
        <input type="tel" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
        <label>Nem</label>
        <select value={gender} onChange={(e) => setGender(e.target.value)} defaultValue={0}>
          <option value="0" disabled>
            Válassz az alábbiak közül.
          </option>
          <option value="1">Férfi</option>
          <option value="2">Nő</option>
          <option value="3">Egyéb</option>
        </select>
        <button type="submit" className="btn-main btn-black">
          Regisztráció
        </button>
      </form>
    </>
  );
};

export default SignupForm;
