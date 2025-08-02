import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom'; // Enables client-side routing
import './index.css'; // Global CSS including Tailwind or other styles
import { ThemeProvider } from './context/ThemeProvider.tsx'; // Context provider for theme state
import App from './App.tsx'; // Root app component

/**
 * Entry point of the React application.
 * 
 * Responsibilities:
 * - Mount React app into the root DOM element.
 * - Wrap the app in React's StrictMode for highlighting potential problems.
 * - Wrap the app in BrowserRouter to enable client-side routing.
 * - Wrap the app in ThemeProvider to provide theme context globally.
 * 
 * Uses React 18's `createRoot` API for concurrent mode support.
 */
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {/* Enables React Router functionality across the app */}
    <BrowserRouter>
      {/* Provides theme context to the entire app for managing theme states */}
      <ThemeProvider>
        {/* App component where main UI and routing happen */}
        <App />
      </ThemeProvider>
    </BrowserRouter>
  </StrictMode>
);
