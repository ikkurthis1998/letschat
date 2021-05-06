import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import ScreenContextProvider from './contexts/ScreenContext';
import {BrowserRouter as Router} from 'react-router-dom';
import AuthContextProvider from './contexts/AuthContext';
import ChatContextProvider from './contexts/ChatContext';
import ChatFormContextProvider from './contexts/ChatFormContext';

ReactDOM.render(
  <React.StrictMode>
    <ScreenContextProvider>
      <AuthContextProvider>
        <ChatContextProvider>
          <ChatFormContextProvider>
            <Router>
              <App />
            </Router>
          </ChatFormContextProvider>
        </ChatContextProvider>
      </AuthContextProvider>
    </ScreenContextProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
