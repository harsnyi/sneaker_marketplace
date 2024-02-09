import { Link } from 'react-router-dom';
import Gallery from './Gallery';
import { useEffect, useState } from 'react';

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

const Hero = () => {
  const [shuffledBackgroundImages, setShuffledBackgroundImages] = useState([]);
  const currentYear = new Date().getFullYear();

  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  useEffect(() => {
    var backgroundImagesContext = require.context('../../assets/images/background/small', false, /.*\.jpg$/);
    const backgroundImages = backgroundImagesContext.keys().map((key) => backgroundImagesContext(key));
    const shuffledImages = shuffleArray(backgroundImages);

    setShuffledBackgroundImages(shuffledImages);
  }, []); 

  return (
    <div className="hero">
      <Gallery images={shuffledBackgroundImages} columns={9} />
      <div className="hero_content">
        <h1 className="hero_title">Bump</h1>
        {/*Bump!, Under Retail*/}
        <p className="hero_subtitle">Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam repellat quam dicta at necessitatibus ipsa enim, consequatur dignissimos veniam reiciendis?</p>
        <footer className="hero_footer">
          <h4>
            &copy;{currentYear}&ensp;<span>Magyarország</span>
          </h4>
          <div className="hero_links">
            {FOOTER_LINKS.map((link, index) => (
              <Link key={index} to={link.url}>
                {link.label}
              </Link>
            ))}
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Hero;
