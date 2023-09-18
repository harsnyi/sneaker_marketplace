import React, {useState, createContext} from 'react';
import Loader from '../common/Loader';

const LoaderContext = createContext();

const LoaderProvider = (props) => {
  const [loading, setLoading] = useState(false);

  const show = () => setLoading(true);
  const hide = () => setLoading(false);

  return (
    <LoaderContext.Provider value={{show, hide}}>
      {props.children}
      <Loader loading={loading} />
    </LoaderContext.Provider>
  );
};

export {LoaderProvider, LoaderContext};
