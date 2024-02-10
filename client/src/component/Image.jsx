import '../assets/css/image.css';
import React, {useState} from 'react';
import {InView} from 'react-intersection-observer';

const Image = ({src, hash, alt, ...props}) => {
  const [loading, setLoading] = useState(true);

  return (
    <InView triggerOnce rootMargin="100px">
      {({ref, inView}) => (
        <div className="image" ref={ref}>
          {loading && <div className="image_placeholder" />}
          {inView && <img src={src} alt={alt} {...props} onLoad={() => setLoading(false)} />}
        </div>
      )}
    </InView>
  );
};

export default Image;
