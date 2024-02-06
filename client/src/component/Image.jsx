import React from 'react';
import {useBlurHash} from '../hooks/useBlurhash';

const Image = ({src, alt, className}) => {
  const {blurhash, imageLoaded, setImageLoaded} = useBlurHash(src);
};

export default Image;
