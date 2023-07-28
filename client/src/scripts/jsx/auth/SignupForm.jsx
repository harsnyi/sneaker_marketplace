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
    
      <form onSubmit="">
        <label>Vezetéknév</label>
        <br />
        <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} />
        <br />
        <label>Keresztnév</label>
        <br />
        <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
        <br />
        <label>E-Mail</label>
        <br />
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <br />
        <label>Felhasználónév</label>
        <br />
        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
        <br />
        <label>Jelszó</label>
        <br />
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <br />
        <label>Jelszó újra</label>
        <br />
        <input type="password" value={passwordConfirmation} onChange={(e) => setPasswordConfirmation(e.target.value)} />
        <br />
        <label>Telefonszám</label>
        <br />
        <input type="tel" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
        <br />
        <label>Nem</label>
        <br />
        <select value={gender} onChange={(e) => setGender(e.target.value)}>
          <option value="0" selected disabled>
            Válassz az alábbiak közül.
          </option>
          <option value="1">Férfi</option>
          <option value="2">Nő</option>
          <option value="3">Egyéb</option>
        </select>
        <br />
        <button type="submit">Regisztráció</button>

      </form>
  );
};

export default SignupForm;
