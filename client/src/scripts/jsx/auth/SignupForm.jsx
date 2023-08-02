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
  const [gender, setGender] = useState('');

  const handleFormSubmit = (e) => {
    e.preventDefault();
    // Perform signup logic here
  };

  return (
    <>
      <h1>Még nem vagy tag?</h1>
      <form onSubmit={handleFormSubmit}>
        <div className="field-wrapper">
          <Input
            type="text"
            value={lastName}
            label="Vezetéknév * "
            onChange={(value) => {
              setLastName(value);
            }}
            className="input-field"
            name="name"
            required
          />
          <Input
            type="text"
            value={firstName}
            label="Keresztnév * "
            onChange={(value) => {
              setFirstName(value);
            }}
            className="input-field"
            name="name"
            required
          />
        </div>
        <Input
          type="email"
          value={email}
          label="E-Mail * "
          onChange={(value) => {
            setEmail(value);
          }}
          className="input-field"
          name="email"
          required
        />
        <Input
          type="text"
          value={username}
          label="Felhasználónév * "
          onChange={(value) => {
            setUsername(value);
          }}
          className="input-field"
          name="username"
          required
        />
        <div className="field-wrapper">
          <Input
            type="password"
            value={password}
            label="Jelszó * "
            onChange={(value) => {
              setPassword(value);
            }}
            className="input-field"
            name="password"
            required
          />
          <Input
            type="password"
            value={passwordConfirmation}
            label="Jelszó újra * "
            onChange={(value) => {
              setPasswordConfirmation(value);
            }}
            className="input-field"
            name="passwordAgain"
            required
          />
        </div>
        <Input
          type="tel"
          value={phoneNumber}
          label="Telefonszám * "
          onChange={(value) => {
            setPhoneNumber(value);
          }}
          className="input-field"
          name="phone"
          required
        />
        <div className="select-wrapper">
          <select onChange={(e) => setGender(e.target.value)} defaultValue={gender} className="select-menu" required>
            <option value="" disabled></option>
            <option value="1">Férfi</option>
            <option value="2">Nő</option>
            <option value="3">Egyéb</option>
            <option value="4">Most nem</option>
          </select>
          <label>Nem</label>
        </div>
        <button type="submit" className="btn-main btn-black">
          Regisztráció
        </button>
        <div className="bg-line">
          <h3>vagy</h3>
        </div>
        TODO: Implement social media login
      </form>
    </>
  );
};

export default SignupForm;
