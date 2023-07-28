const LoginForm = () => {
  return (
    <form>
      <label>E-Mail</label>
      <br />
      <input type="email" />
      <br />
      <label>Jelszó</label>
      <br />
      <input type="password" />
      <br />
      <button type="submit">Bejelentkezés</button>
    </form>
  );
};

export default LoginForm;
