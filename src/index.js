// Import required modules
import React from 'react';
import ReactDOM from 'react-dom/client'; // This import should be changed to 'react-dom' to use the ReactDOM package properly
import './index.css';
import App from './App';

// Create a root for the application using ReactDOM.createRoot method
const root = ReactDOM.createRoot(document.getElementById('root'));

// Render the App component inside the root using ReactDOM.createRoot.render
root.render(
  // Enable React.StrictMode to enforce best practices and detect potential issues
  <React.StrictMode>
    <App />
  </React.StrictMode>
);