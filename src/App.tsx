import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Navbar from './component/Navbar';
import Sidebar from './component/Sidebar';
import { useTheme } from './context/ThemeProvider';
import { themes } from './theme/theme';

/**
 * App component serves as the root of the React application.
 * 
 * Responsibilities:
 * - Provides global theming using `useTheme` context hook.
 * - Applies current theme styles dynamically from the themes configuration.
 * - Renders Navbar and conditionally renders Sidebar for Theme 2 (dark mode sidebar layout).
 * - Defines main content area with routing for Home, About, and Contact pages.
 */
function App() {
  // Retrieve the current selected theme from Theme context
  const { theme } = useTheme();

  // Fetch the theme configuration object corresponding to the current theme key
  const currentTheme = themes[theme];

  return (
    // Wrapper div applies main theme layout classes, including background, font, and transition
    <div className={`theme-transition ${currentTheme.layout}`}>
      {/* 
        Navbar component receives current theme's navbar styling as className prop.
        Navbar remains visible for all themes.
      */}
      <Navbar className={`${currentTheme.navbar}`} />

      {/*
        Conditionally render Sidebar component only when the current theme is "theme2"
        This is the dark mode theme with sidebar layout.
      */}
      {theme === 'theme2' && <Sidebar />}

      {/* 
        Main content container:
        - Applies theme-specific container styling (e.g. width, padding, grid/flex)
        - Ensures minimum height accounting for fixed navbar (4rem) using CSS calc
        - Top margin offsets navbar height to prevent content overlap
        - Uses react-router-dom Routes to switch pages based on URL
      */}
      <main className={`${currentTheme.container} min-h-[calc(100vh-4rem)] mt-16`}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
