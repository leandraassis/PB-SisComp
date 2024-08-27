import React from 'react';
import ReactDOM from 'react-dom/client';
import { AuthProvider } from './components/login/AuthContext'; // Importa o AuthProvider
import App from './App';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>
);
