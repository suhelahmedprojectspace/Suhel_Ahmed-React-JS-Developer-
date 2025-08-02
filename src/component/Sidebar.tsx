import { NavLink } from 'react-router-dom'
import { useTheme } from '../context/ThemeProvider'
import { themes } from '../theme/theme'
import { HomeIcon, Menu, X, Info, Mail } from 'lucide-react'
import { useState, useEffect } from 'react'

/**
 * Sidebar component provides responsive navigation and theme selection UI.
 * 
 * Features:
 * - Mobile bottom icon bar with toggle for a sliding side menu
 * - Sliding mobile side menu with navigation links and theme selector
 * - Persistent desktop sidebar with navigation links and theme selector
 * - Responsive visibility management (mobile menus shown only on small screens, desktop only on md+)
 * - Smooth animations for mobile menu slide-in/out and backdrop fade
 * - Accessible buttons with ARIA attributes
 * - Dynamic styling based on current selected theme
 */
const Sidebar = () => {
  // Get current theme and setter from theme context
  const { theme, setTheme } = useTheme()
  // Local state to track mobile menu open/close
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  // Retrieve current theme styles from theme definitions
  const currentTheme = themes[theme]

  // Effect: close mobile menu if window is resized >= md breakpoint (768px)
  // Prevents menu being stuck open after resizing from mobile -> desktop
  useEffect(() => {
    function handleResize() {
      if (window.innerWidth >= 768) {
        setIsMobileMenuOpen(false)
      }
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // CSS class to mark an active NavLink
  const activeClass = "font-bold underline"

  return (
    <>
      {/* 
        Mobile Icon Sidebar - fixed horizontal bar at bottom of screen.
        Shows menu toggle and key navigation icons.
        Visible only on small (mobile) screens.
      */}
      <aside className="fixed bottom-4 left-4 right-4 z-50 flex justify-evenly md:hidden bg-gray-800 bg-opacity-90 rounded-xl py-2 shadow-lg transition-all duration-300">
        {/* Hamburger button toggles mobile menu open state */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={isMobileMenuOpen}
          className="text-white hover:text-blue-400 transition-colors duration-200"
        >
          {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>

        {/* Navigation icons with links to routes */}
        {/* Active links get bold underline style */}
        <NavLink
          to="/"
          aria-label="Home"
          className={({ isActive }) =>
            `text-white hover:text-blue-400 transition-all duration-200 ${
              isActive ? activeClass : ""
            }`
          }
        >
          <HomeIcon size={28} />
        </NavLink>

        <NavLink
          to="/about"
          aria-label="About"
          className={({ isActive }) =>
            `text-white hover:text-blue-400 transition-all duration-200 ${
              isActive ? activeClass : ""
            }`
          }
        >
          <Info size={28} />
        </NavLink>

        <NavLink
          to="/contact"
          aria-label="Contact"
          className={({ isActive }) =>
            `text-white hover:text-blue-400 transition-all duration-200 ${
              isActive ? activeClass : ""
            }`
          }
        >
          <Mail size={28} />
        </NavLink>
      </aside>

      {/*
        Mobile Menu Panel Backdrop
        Semi-transparent black overlay behind sliding menu when open
        Clicking this closes the menu
        Fades in/out with opacity transition and disables pointer events when hidden
      */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden transition-opacity duration-300 ${
          isMobileMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsMobileMenuOpen(false)}
        aria-hidden={!isMobileMenuOpen}
      ></div>

      {/*
        Sliding Mobile Menu
        Positioned fixed to the right, full height
        Translates fully off-screen or visible based on open state
        Contains nav links and theme selector
      */}
      <aside
        className={`
          fixed top-0 right-0 z-50 h-full w-64 bg-white dark:bg-gray-900  transform transition-transform duration-300 ease-in-out
          ${isMobileMenuOpen ? "translate-x-0" : "translate-x-full"}
          md:hidden
          flex flex-col p-6
        `}
        aria-hidden={!isMobileMenuOpen}
      >
        {/* Header with site title and close menu button */}
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">TSwitcher</h2>
          <button
            onClick={() => setIsMobileMenuOpen(false)}
            aria-label="Close menu"
            className="text-gray-700 dark:text-gray-200 hover:text-blue-500 transition-colors"
          >
            <X className="w-6" />
          </button>
        </div>

        {/* Navigation links */}
        <nav className="flex flex-col space-y-6 mb-8">
          {/* Links close the menu when clicked */}
          <NavLink
            to="/"
            onClick={() => setIsMobileMenuOpen(false)}
            className="text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200"
          >
            Home
          </NavLink>
          <NavLink
            to="/about"
            onClick={() => setIsMobileMenuOpen(false)}
            className="text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200"
          >
            About
          </NavLink>
          <NavLink
            to="/contact"
            onClick={() => setIsMobileMenuOpen(false)}
            className="text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200"
          >
            Contact
          </NavLink>
        </nav>

        {/* Theme selector dropdown */}
        <div>
          <label
            htmlFor="mobile-theme-select"
            className="block mb-2 font-semibold text-gray-700 dark:text-gray-300"
          >
            Select Theme
          </label>
          <select
            id="mobile-theme-select"
            className="w-full rounded border text-gray-700 border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:text-white"
            value={theme}
            onChange={(e) => setTheme(e.target.value as "theme1" | "theme2" | "theme3")}
          >
            {/* Dynamically generate options from themes object */}
            {Object.entries(themes).map(([key, { name }]) => (
              <option key={key} value={key} className="text-gray-700">
                {name}
              </option>
            ))}
          </select>
        </div>
      </aside>

      {/*
        Desktop Sidebar
        Visible only on medium-sized screens and larger
        Fixed position on the left side
        Contains full navigation menu and theme selector
        Styled using current theme sidebar styles
      */}
      <aside
        className={`${currentTheme.sidebar}`}
        aria-label="Primary Navigation"
      >
        {/* Site title */}
        <div className="mb-12">
          <h1 className="text-3xl font-extrabold">TSwitcher</h1>
        </div>

        {/* Navigation links */}
        <nav className="flex flex-col space-y-6">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `hover:underline transition-colors duration-200 ${
                isActive ? "font-extrabold underline" : "font-medium"
              }`
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/about"
            className={({ isActive }) =>
              `hover:underline transition-colors duration-200 ${
                isActive ? "font-extrabold underline" : "font-medium"
              }`
            }
          >
            About
          </NavLink>
          <NavLink
            to="/contact"
            className={({ isActive }) =>
              `hover:underline transition-colors duration-200 ${
                isActive ? "font-extrabold underline" : "font-medium"
              }`
            }
          >
            Contact
          </NavLink>
        </nav>

        {/* Theme selector dropdown */}
        <div className="mt-auto">
          <label
            htmlFor="desktop-theme-select"
            className="block mb-2 font-semibold"
          >
            Select Theme
          </label>
          <select
            id="desktop-theme-select"
            className="w-full rounded border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:text-white"
            value={theme}
            onChange={(e) => setTheme(e.target.value as "theme1" | "theme2" | "theme3")}
          >
            {/* Options generated dynamically */}
            {Object.entries(themes).map(([key, { name }]) => (
              <option key={key} value={key} className="text-black">
                {name}
              </option>
            ))}
          </select>
        </div>
      </aside>
    </>
  )
}

export default Sidebar
