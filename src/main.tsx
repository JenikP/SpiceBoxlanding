import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

// We no longer wrap the app in React Query provider here.  Any data fetching
// can be handled directly within components using the fetch API.
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);