import {useState} from 'react';

const Tabs = () => {
  const [activeTab, setActiveTab] = useState(1);

  const toggleTab = (index) => {
    setActiveTab(index);
  };

  return (
    <>
      <div className="tabs-wrapper">
        <div className="tabs-header">
          <div className={activeTab === 1 ? 'tabs-header-item active-tab' : 'tabs-header-item'} onClick={() => toggleTab(1)}>
            <h3>Bejelentkezés</h3>
          </div>
          <div className={activeTab === 2 ? 'tabs-header-item active-tab' : 'tabs-header-item'} onClick={() => toggleTab(2)}>
            <h3>Regisztráció</h3>
          </div>
        </div>
        <div className="tabs-content">
          <div className={activeTab === 1 ? 'tabs-content-item active-content' : 'tabs-content-item'}>
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
          </div>
          <div className={activeTab === 2 ? 'tabs-content-item active-content' : 'tabs-content-item'}>
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
          </div>
        </div>
      </div>
    </>
  );
};

export default Tabs;
