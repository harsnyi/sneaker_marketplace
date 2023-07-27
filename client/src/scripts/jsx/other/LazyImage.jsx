import React, { useState, useEffect } from 'react';
import { Blurhash } from 'react-blurhash';
import { useInView } from 'react-intersection-observer';

const LazyImage = (props) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const { ref, inView } = useInView({
    triggerOnce: true, // Ensures the image loads only once when it comes into view
    threshold: 0.10, // Customize the treshold if you want to trigger the loading a bit earlier or later -> 0.25 = 25%
  });

  useEffect(() => {
    if (inView && !imageLoaded) {
      const img = new Image();
      img.onload = () => {
        setImageLoaded(true);
      };
      img.src = props.src;
    }
  }, [inView, imageLoaded, props.src]);

  return (
    <>
      {!imageLoaded && (
        <div ref={ref} style={{ width: '100%', height: '100%' }}>
          <Blurhash
            hash={props.blurhash}
            width="100%"
            height="100%"
            resolutionX={32}
            resolutionY={32}
            punch={1}
          />
        </div>
      )}
      {imageLoaded && (
        <img src={props.src} alt={props.alt} className={props.className} />
      )}
    </>
  );
};

export default LazyImage;
