/**
 * Available themes for the application.
 * Each theme object contains:
 * - `name`: Friendly display name for the theme (used in UI dropdowns)
 * - `layout`: Tailwind classes for the main layout container
 * - `container`: Tailwind classes for the inner content container
 * - `sidebar`: Sidebar container styling (used in dark mode with sidebar)
 * - `navbar`: Navbar container styling
 * - `mobileNavbar`: Mobile navbar styling
 * - `hamburgericon`: Styling classes for mobile hamburger menu icon
 * - `card`: Styling for card components displayed on pages
 * - `button`: Styling for buttons according to theme
 */
export const themes = {
  theme1: {
    name: "Minimal Light",                
    layout: "bg-white text-gray-900 font-sans transition-all duration-500",
    container: "max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8",
    sidebar:"hidden",
    navbar: "bg-white border-b border-gray-200 shadow-sm text-gray-900",
    mobileNavbar: "bg-white text-gray-900 shadow-md", 
    hamburgericon:"text-black",
    card: "bg-white border border-gray-100 rounded-lg shadow-sm p-6 mb-4 transition-all hover:shadow-md",
    button: "bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors",
  },
  theme2: {
    name: "Dark Mode",                    
    layout: "bg-gray-900 text-gray-100 font-serif flex min-h-screen transition-all duration-500",
    container: "md:ml-64 flex-1 p-6 md:p-8 w-full max-w-6xl mx-auto",
    sidebar: "hidden w-64 fixed left-0 top-0 h-full bg-gray-800 text-white shadow-lg md:flex md:flex-col py-8 px-4 transition-all",
    navbar: "hidden",
    mobileNavbar: "bg-gray-900 text-white shadow-md",
    hamburgericon: "text-white",
    card: "bg-gray-800 rounded-lg shadow-sm p-6 mb-4 border border-gray-700 transition-all hover:shadow-md",
    button: "bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors"
  },
  theme3: {
    name: "Gradient Creative",           
    layout: "bg-gradient-to-br from-sky-600 via-blue-500 to-indigo-600 text-white font-sans min-h-screen transition-all duration-500 font-pacifico",
    container: "max-w-7xl mx-auto px-4 sm:px-8 py-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 font-pacifico",
    navbar: "bg-gradient-to-r from-rose-500 to-yellow-400 text-white shadow-lg",
    mobileNavbar: "bg-gradient-to-r from-rose-500 to-yellow-400 text-white shadow-md",
    hamburgericon:"text-white",
    sidebar:"hidden",
    card: "bg-white bg-opacity-90 backdrop-blur-sm text-gray-800 rounded-xl shadow-lg p-6 transition-all duration-300 hover:scale-[1.02] hover:shadow-xl",
    button: "bg-gradient-to-r from-rose-400 to-orange-400 text-white px-4 py-2 rounded-full hover:shadow-lg transition-all",
  }
};
