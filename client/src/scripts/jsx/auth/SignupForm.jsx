const SignupForm = () => {
  return (
    <form>
      <label>Vezetéknév</label>
      <br />
      <input type="text" />
      <br />
      <label>Keresztnév</label>
      <br />
      <input type="text" />
      <br />
      <label>E-Mail</label>
      <br />
      <input type="email" />
      <br />
      <label>Felhasználónév</label>
      <br />
      <input type="text" />
      <br />
      <label>Jelszó</label>
      <br />
      <input type="password" />
      <br />
      <label>Jelszó megerősítése</label>
      <br />
      <input type="password" />
      <br />
      <label>Telefonszám</label>
      <br />
      <input type="tel" />
      <br />
      <label>Nem</label>
      <br />
      <select>
        <option value="0" disabled selected>
          Válaszd ki a nemed.
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
