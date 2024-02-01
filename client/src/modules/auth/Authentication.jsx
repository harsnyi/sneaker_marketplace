import '../../assets/css/authentication.css';
import AuthTabs from './AuthTabs';
import {Link} from 'react-router-dom';

const FOOTER_LINKS = [
  {
    label: 'Alkalmazás',
    url: '',
  },
  {
    label: 'Adatvédelem',
    url: '',
  },
  {
    label: 'Feltételek',
    url: '',
  },
  {
    label: 'Kapcsolat',
    url: '',
  },
];

const Authentication = () => {
  var backgroundImagesContext = require.context('../../assets/images/background/small', false, /.*\.jpg$/);

  /*
  if (window.innerWidth <= 1200) {
    backgroundImagesContext = require.context('../../assets/images/background/small', false, /.*\.jpg$/);
  } else {
    backgroundImagesContext = require.context('../../assets/images/background/medium', false, /.*\.jpg$/);
  }
  */

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
            <h1 className="hero-title">Under Retail</h1>
            {/*Bump!, Under Retail*/}
            <p className="hero-subtitle">Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam repellat quam dicta at necessitatibus ipsa enim, consequatur dignissimos veniam reiciendis?</p>
            <footer className="hero-footer">
              <h4>
                &copy;{currentYear}&ensp;<span>Magyarország</span>
              </h4>
              <div className="hero-links">
                {FOOTER_LINKS.map((link, index) => (
                  <Link key={index} to={link.url}>
                    {link.label}
                  </Link>
                ))}
              </div>
            </footer>
          </div>
        </div>
        <div className="auth-container">
          <h1 className="brand-title">Under Retail</h1>
          <AuthTabs />
        </div>
      </section>
    </>
  );
};

export default Authentication;
