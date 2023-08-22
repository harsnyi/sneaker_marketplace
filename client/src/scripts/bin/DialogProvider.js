import React, {useState} from 'react';

const DialogContext = React.createContext({
  type: null,
  message: null,
  success: () => {},
  error: () => {},
  warning: () => {},
  info: () => {},
});

const STATES = {
  SUCCESS: 'success',
  ERROR: 'error',
  WARNING: 'warning',
  INFO: 'info',
};

const DialogProvider = (props) => {
  const [type, setType] = useState(null);
  const [message, setMessage] = useState(null);

  const success = (text) => {
    setType(STATES.SUCCESS);
    setMessage(text);
  };

  const error = (text) => {
    setType(STATES.ERROR);
    setMessage(text);
  };

  const warning = (text) => {
    setType(STATES.WARNING);
    setMessage(text);
  };

  const info = (text) => {
    setType(STATES.INFO);
    setMessage(text);
  };

  const clear = () => {
    setType(null);
    setMessage(null);
  };

  return (
    <DialogContext.Provider
      value={{
        type,
        message,
        success,
        error,
        warning,
        info,
        clear,
      }}>
      {props.children}
    </DialogContext.Provider>
  );
};

export {DialogProvider, DialogContext};
