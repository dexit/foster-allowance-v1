import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';
import Embed from './pages/Embed';
import { Config } from './pages/Index'; // Import Config type

const root = document.getElementById('root');
if (root) {
  createRoot(root).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}

// Ensure Embed has an init method
if (typeof Embed.init === 'function') {
  // Expose the Embed initialization function globally
  (window as any).initFosterAllowanceEmbed = (config?: Config) => {
    Embed.init(config);
  };
} else {
  console.error("Embed component does not have an init method.");
}