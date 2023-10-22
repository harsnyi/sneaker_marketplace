import {useEffect} from 'react';
import {useTimeout} from './useTimeout';

// for: Run a callback after a delay. (Search field only sends query after user stops typing for x ms.)
// ex. useDebounce(() => alert(value), 1000, [value]);

export const useDebounce = (callback, delay, dependencies) => {
  const {reset, clear} = useTimeout(callback, delay);
  useEffect(reset, [...dependencies, reset]);
  // eslint-disable-next-line
  useEffect(clear, []);
};
