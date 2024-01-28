import {useContext} from 'react';
import {LoadingContext} from '../setup/LoadingProvider';

export const useLoading = () => {
  return useContext(LoadingContext);
};
