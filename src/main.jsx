import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import ReactRouter from './ReactRouter';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'font-awesome/css/font-awesome.min.css';
import { BrowserRouter } from 'react-router-dom';
import SmartCounter from './practice/SmartCounter ';
import Hooks from './components/hooks/Hooks';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);
