import React from 'react';
import ReactDOM from 'react-dom/client';

import { ThemeProvider } from './components/ThemeProvider';
import './main.css';
import { Dashboard } from './pages/Dashboard';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Dashboard />
    </ThemeProvider>
  </React.StrictMode>
);
