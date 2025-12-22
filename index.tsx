import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const rootElement = document.getElementById('root');
if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );

  // Safely remove loader after a tiny delay once React starts its process
  window.addEventListener('load', () => {
    const loader = document.getElementById('initial-load');
    if (loader) {
      loader.style.opacity = '0';
      loader.style.transition = 'opacity 0.6s ease';
      setTimeout(() => {
        loader.style.display = 'none';
      }, 600);
    }
  });
}