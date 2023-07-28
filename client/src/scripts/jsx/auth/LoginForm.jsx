const LoginForm = () => {
  return (
    <>
      <h1>Üdv újra!</h1>
      <form>
        <label>E-Mail</label>
        <input type="email" />
        <label>Jelszó</label>
        <input type="password" />
        <button type="submit" className="btn-main btn-black">
          Bejelentkezés
        </button>
      </form>
      <h3>vagy</h3>
    </>
  );
};

export default LoginForm;
