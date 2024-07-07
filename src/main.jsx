// index.js (or main.js if using Vite)
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { ManipulationPlayerProvider } from './context/manipulationQuestionContext.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ManipulationPlayerProvider>
      <App />
    </ManipulationPlayerProvider>
  </React.StrictMode>,
);