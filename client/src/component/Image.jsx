import '../assets/css/image.css';
import React, {useState} from 'react';
import {InView} from 'react-intersection-observer';
import {Blurhash} from 'react-blurhash';

const Image = ({src, hash, alt, ...props}) => {
  const [loading, setLoading] = useState(true);

  return (
    <InView triggerOnce rootMargin="100px">
      {({ref, inView}) => (
        <div className="image" ref={ref}>
          {loading && (hash ? <Blurhash hash={hash} width={'100%'} resolutionX={32} resolutionY={32} punch={1} /> : <div className="image_placeholder" />)}
          {inView && <img src={src} alt={alt} {...props} onLoad={() => setLoading(false)} />}
        </div>
      )}
    </InView>
  );
};

export default Image;
