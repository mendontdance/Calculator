import { RootStore } from './store';
import { useContext, createContext } from 'react';

export const RootStoreContext = createContext<RootStore>(new RootStore());

export const useStore = () => {
  const context = useContext(RootStoreContext);
  if (context === null) {
    throw new Error('Provider is not defined');
  }
  return context;
};
