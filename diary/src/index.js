import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import Main_Page from './Main_Page';
import { BrowserRouter } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
   <BrowserRouter>
  <React.StrictMode>
    <Main_Page />
  </React.StrictMode>
  </BrowserRouter>
);

reportWebVitals();
