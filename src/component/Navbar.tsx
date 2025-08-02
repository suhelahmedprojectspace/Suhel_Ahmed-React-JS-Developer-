import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from 'lucide-react';
import { useTheme } from "../context/ThemeProvider";
import { themes } from "../theme/theme";

type NavbarProps = {
  /** Optional className to customize styling of the header container */
  className?: string;
}

/**
 * Navbar component provides the main navigation bar with responsive behavior.
 * 
 * Features:
 * - Desktop navigation links and theme selector visible on medium screens and up.
 * - Hamburger menu toggle and sliding mobile menu on smaller screens.
 * - Responsive theme selector dropdown on both desktop and mobile.
 * - Uses theme context to dynamically style based on the current theme.
 * - Accessibility attributes (aria-label, aria-expanded) for buttons.
 */
export default function Navbar({ className }: NavbarProps) {
  // Local state to track whether mobile menu is open or closed
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Access current theme and setter function from theme context
  const { theme, setTheme } = useTheme();

  // Toggle mobile menu open state
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Classes for mobile navbar and hamburger icon derived from selected theme styles
  const mobileNavbarClass = themes[theme].mobileNavbar;
  const mobilemenuClass = themes[theme].hamburgericon;

  return (
    <header className={`fixed w-full z-50 top-0 ${className}`}>
      {/* Container for navbar content, centered horizontally with responsive paddings */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Flex container for layout: left-aligned branding, center links, right-aligned menu */}
        <div className="flex justify-between items-center h-16">

          {/* Branding or logo area on the left */}
          <div className="flex-shrink-0">
            <span className="text-xl font-bold">TSwitcher</span>
          </div>

          {/* Desktop Navigation Links and Theme Selector
              Visible only on medium (md) screens and larger */}
          <div className="hidden md:flex items-center space-x-8">
            {/* Navigation links */}
            <nav className="flex space-x-8">
              <Link
                to="/"
                className="hover:text-blue-600 transition-colors duration-200 font-medium"
              >
                Home
              </Link>
              <Link
                to="/about"
                className="hover:text-blue-600 transition-colors duration-200 font-medium"
              >
                About
              </Link>
              <Link
                to="/contact"
                className="hover:text-blue-600 transition-colors duration-200 font-medium"
              >
                Contact
              </Link>
            </nav>

            {/* Theme selector dropdown on desktop */}
            <select
              className="border border-gray-300 rounded-md px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
              value={theme}
              // On selection change, update current theme using context setter
              onChange={e => setTheme(e.target.value as "theme1" | "theme2" | "theme3")}
            >
              {/* Options generated dynamically */}
            {Object.entries(themes).map(([key, { name }]) => (
              <option key={key} value={key} className="text-black">
                {name}
              </option>
            ))}
            </select>
          </div>

          {/* Mobile hamburger menu button
              Visible only on small screens (below md breakpoint) */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
              aria-expanded={isMenuOpen} // Accessibility: indicate expanded state
              aria-label={isMenuOpen ? "Close menu" : "Open menu"} // Accessibility label changes
            >
              {/* Show close icon (X) if menu is open, otherwise hamburger icon */}
              {isMenuOpen ? (
                <X className={`h-6 w-6 ${mobilemenuClass}`} />
              ) : (
                <Menu className={`h-6 w-6 ${mobilemenuClass}`} />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Sliding mobile menu panel */}
      {/* 
          Positioned fixed on right side, full viewport height.
          Slides in/out based on isMenuOpen.
          Uses transform and transition classes for smooth animation.
          Applies theme-specific background and text colors via mobileNavbarClass.
          Hidden on medium screens and larger via md:hidden.
      */}
      <div className={`${mobileNavbarClass} md:hidden fixed inset-y-0 right-0 
          z-50 w-full max-w-xs shadow-xl transform ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'} transition-transform duration-300 ease-in-out`}>
        
        {/* Mobile menu inner container with padding and column flex layout */}
        <div className="flex flex-col h-full p-6">

          {/* Close button aligned at top right inside mobile menu */}
          <div className="flex justify-end mb-8">
            <button
              onClick={toggleMenu}
              className="p-2 rounded-md hover:bg-gray-100 hover:text-gray-900 transition-colors"
              aria-label="Close menu"
            >
              {/* Close icon (X), themed */}
              <X className={`h-6 w-6 ${mobilemenuClass}`} />
            </button>
          </div>

          {/* Vertical navigation links inside mobile menu */}
          <nav className="flex flex-col space-y-4">
            {/* Each link closes menu on click to close mobile drawer */}
            <Link
              to="/"
              className="block px-3 py-2 rounded-md text-base font-medium hover:text-blue-600 hover:bg-gray-50 transition-colors duration-200"
              onClick={toggleMenu}
            >
              Home
            </Link>
            <Link
              to="/about"
              className="block px-3 py-2 rounded-md text-base font-medium hover:text-blue-600 hover:bg-gray-50 transition-colors duration-200"
              onClick={toggleMenu}
            >
              About
            </Link>
            <Link
              to="/contact"
              className="block px-3 py-2 rounded-md text-base font-medium hover:text-blue-600 hover:bg-gray-50 transition-colors duration-200"
              onClick={toggleMenu}
            >
              Contact
            </Link>
          </nav>

          {/* Theme selector dropdown for mobile menu */}
          <div className="mt-10">
            <select
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
              value={theme}
              onChange={e => setTheme(e.target.value as "theme1" | "theme2" | "theme3")}
              aria-label="Select theme"
            >
               {/* Options generated dynamically */}
            {Object.entries(themes).map(([key, { name }]) => (
              <option key={key} value={key} className="text-black">
                {name}
              </option>
            ))}
            </select>
          </div>

        </div>
      </div>
    </header>
  );
}
