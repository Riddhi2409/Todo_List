import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { GoogleOAuthProvider } from '@react-oauth/google';
import {BrowserRouter} from 'react-router-dom'
import { AuthProvider } from './context/UserAuth';
import { ModalProvider } from './context/Modal';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <GoogleOAuthProvider clientId='497529451893-4soh2g5e8g3l7oq5kieu070g5841540v.apps.googleusercontent.com'>
    <AuthProvider>
        <ModalProvider>
          <BrowserRouter>
        <React.StrictMode>
          <App />
        </React.StrictMode>
          </BrowserRouter>
        </ModalProvider>
    </AuthProvider>
  </GoogleOAuthProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
