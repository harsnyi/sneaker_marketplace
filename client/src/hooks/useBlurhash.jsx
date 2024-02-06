import {useEffect, useState} from 'react';
import {useToast} from './useToast';
import {useAxiosPrivate} from './useAxiosPrivate';

const BLURHASH_URL = '/api/v1/blurhash/encode';

export const useBlurHash = (src) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [blurhash, setBlurhash] = useState('');
  const {addToast} = useToast();

  const {axiosPrivate} = useAxiosPrivate();

  useEffect(() => {
    const encode = async (src) => {
      try {
        const response = await axiosPrivate.get(BLURHASH_URL);
        setBlurhash(response.data);
      } catch (error) {
        addToast('error', error.message);
      }
    };

    encode(src);
  }, [src]);

  return {blurhash, imageLoaded, setImageLoaded};
};
