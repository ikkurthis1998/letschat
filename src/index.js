import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import ScreenContextProvider from './contexts/ScreenContext';
import {BrowserRouter as Router} from 'react-router-dom';
import AuthContextProvider from './contexts/AuthContext';

ReactDOM.render(
  <React.StrictMode>
    <ScreenContextProvider>
      <AuthContextProvider>
        <Router>
          <App />
        </Router>
      </AuthContextProvider>
    </ScreenContextProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
