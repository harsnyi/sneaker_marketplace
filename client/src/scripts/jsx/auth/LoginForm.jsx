import { useState } from "react";

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Perform login logic here
    // Access the 'email' and 'password' state variables to handle the login process
    console.log('Email:', email);
    console.log('Password:', password);
    // You can implement your login logic here, e.g., send a login request to the server
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>Email</label>
      <br />
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <br />
      <label>Jelszó</label>
      <br />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <br />
      <button type="submit">Bejelentkezés</button>
      
    
    </form>

    
  );
};

export default LoginForm;
