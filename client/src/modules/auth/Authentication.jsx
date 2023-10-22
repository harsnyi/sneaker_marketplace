import '../../assets/css/authentication.css';
import AuthTabs from './AuthTabs';
import {Link} from 'react-router-dom';

const Authentication = () => {
  //TODO: jobb megoldást jelenthet egy backend, ami visszaadja a háttérképeket, szerveren tárolva. Also lazy loading, placeholder, stb.

  var backgroundImagesContext = null;
  /*
  if (window.innerWidth <= 1200) {
    backgroundImagesContext = require.context('../../assets/images/background/small', false, /.*\.jpg$/);
  } else if (window.innerWidth > 1200 && window.innerWidth <= 1920) {
    backgroundImagesContext = require.context('../../assets/images/background/medium', false, /.*\.jpg$/);
  } else {
    backgroundImagesContext = require.context('../../assets/images/background/large', false, /.*\.jpg$/);
  }
  */

  if (window.innerWidth <= 1200) {
    backgroundImagesContext = require.context('../../assets/images/background/small', false, /.*\.jpg$/);
  } else {
    backgroundImagesContext = require.context('../../assets/images/background/medium', false, /.*\.jpg$/);
  }

  const backgroundImages = backgroundImagesContext.keys().map((key) => backgroundImagesContext(key));
  const currentYear = new Date().getFullYear();

  const createGallery = (columnNumber = 9) => {
    const imagePerColumn = Math.floor(backgroundImages.length / columnNumber);
    const gallery = [];

    backgroundImages.sort(() => Math.random() - 0.5);

    for (let i = 0; i < columnNumber; i++) {
      const column = [];
      for (let j = 0; j < imagePerColumn; j++) {
        column.push(
          <div key={j} className="image">
            <img src={backgroundImages[i * imagePerColumn + j]} alt="background" />
          </div>
        );
      }
      gallery.push(
        <div key={i} className={i % 2 === 0 ? 'image-column sliding-down' : 'image-column sliding-up'}>
          {column}
        </div>
      );
    }

    return gallery;
  };

  return (
    <>
      <section className="auth-page">
        <div className="hero">
          {createGallery(9)}
          <div className="hero-content">
            <footer className="hero-footer">
              <h4>&copy;{currentYear}&ensp;Magyarország</h4>
              <div className="hero-links">
                <Link to="">Alkalmazás</Link>
                <Link to="">Adatvédelem</Link>
                <Link to="">Feltételek</Link>
                <Link to="">Kapcsolat</Link>
              </div>
            </footer>
          </div>
        </div>
        <div className="auth-container dark">
          <h1 className="brand-title">Footwr.</h1>
          <AuthTabs />
        </div>
      </section>
    </>
  );
};

export default Authentication;
