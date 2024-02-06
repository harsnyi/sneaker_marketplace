import {useEffect, useRef} from 'react';

export const useTitle = (title) => {
  const documentDefined = typeof document !== 'undefined';
  const originalTitle = useRef(documentDefined ? document.title : null);

  useEffect(() => {
    if (!documentDefined) return;

    if (document.title !== title) document.title = title + ' | Under Retail';

    return () => {
      document.title = originalTitle.current;
    };
  }, []);
};
