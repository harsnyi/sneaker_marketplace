import { useState } from "react";

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Perform login logic here
    // Access the 'email' and 'password' state variables to handle the login process
    // You can implement your login logic here, e.g., send a login request to the server
  };

  return (
    <h1>Üdv újra!</h1>
    <form onSubmit={handleSubmit}>
      <label>Email</label>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <label>Jelszó</label>
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit" className="btn-main btn-black">Bejelentkezés</button>
      
    </form>
<h3>vagy</h3>
  );
};

export default LoginForm;
