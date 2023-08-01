import {useState} from 'react';

import Input from '../other/Input';

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
    <>
      <h1>Még nem vagy tag?</h1>
      <form onSubmit="">
        <Input
          type="text"
          value={lastName}
          label="Vezetéknév"
          onChange={(value) => {
            setLastName(value);
          }}
          className=""
          required
        />
        <Input
          type="text"
          value={firstName}
          label="Keresztnév"
          onChange={(value) => {
            setFirstName(value);
          }}
          className=""
          required
        />
        <Input
          type="email"
          value={email}
          label="E-Mail"
          onChange={(value) => {
            setEmail(value);
          }}
          className=""
          required
        />
        <Input
          type="text"
          value={username}
          label="Felhasználónév"
          onChange={(value) => {
            setUsername(value);
          }}
          className=""
          required
        />
        <Input
          type="password"
          value={password}
          label="Jelszó"
          onChange={(value) => {
            setPassword(value);
          }}
          className=""
          required
        />
        <Input
          type="password"
          value={passwordConfirmation}
          label="Jelszó újra"
          onChange={(value) => {
            setPasswordConfirmation(value);
          }}
          className=""
          required
        />
        <Input
          type="tel"
          value={phoneNumber}
          label="Telefonszám"
          onChange={(value) => {
            setPhoneNumber(value);
          }}
          className=""
        />
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
