import React from 'react';

import './App.css';

import { ActiveUserContextProvider } from './Contexts/ActiveUserContext';
import Router from './Router/Router';

function App() {
  return (
    <ActiveUserContextProvider>
      <Router />
    </ActiveUserContextProvider>
  );
}

export default App;
