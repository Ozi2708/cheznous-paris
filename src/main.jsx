import React from 'react';
import ReactDOM from 'react-dom/client';
import { CNApp } from './App.jsx';
import './styles/colors.css';
import './styles/typography.css';
import './styles/spacing.css';
import './styles/shadows.css';
import './styles/app.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <CNApp />
  </React.StrictMode>
);
