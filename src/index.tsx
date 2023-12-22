import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/App';
import { RootStore } from './services/store';
import { RootStoreContext } from './services/rootStoreContext';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <RootStoreContext.Provider value={new RootStore()}>
    <App />
  </RootStoreContext.Provider>
);
