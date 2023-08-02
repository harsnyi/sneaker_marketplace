import {useState} from 'react';

import Input from '../other/Input';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleFormSubmit = (e) => {
    e.preventDefault();
    // Perform login logic here
    // Access the 'email' and 'password' state variables to handle the login process
    // You can implement your login logic here, e.g., send a login request to the server
  };

  return (
    <>
      <h1>Üdv újra!</h1>
      <form onSubmit={handleFormSubmit}>
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
          type="password"
          value={password}
          label="Jelszó * "
          onChange={(value) => {
            setPassword(value);
          }}
          className="input-field"
          name=""
          required
        />
        <button type="submit" className="btn-main btn-black">
          Bejelentkezés
        </button>
      </form>
      <div className="bg-line">
        <h3>vagy</h3>
      </div>
      TODO: Implement social media login
    </>
  );
};

export default LoginForm;
