# TSwitcher - React Theme Switcher App

A React application demonstrating theme switching with three distinct themes, including a responsive sidebar layout for dark mode, dynamic content consuming a fake products API, and smooth animated transitions.

---

## Features

- **Three Complete Themes**
  - **Theme 1 (Minimal Light):** Clean minimalist layout with light background and simple sans-serif font.
  - **Theme 2 (Dark Mode):** Dark theme with sidebar layout and bold serif font.
  - **Theme 3 (Gradient Creative):** Colorful gradient theme with card-based grid layout and playful Google Font *Pacifico*.

- **Responsive Navigation**
  - Desktop navigation bar with links and theme selector.
  - Hamburger menu and sliding side menu for mobile.
  - Sidebar navigation for theme 2 with collapsible mobile menu.
  
- **Dynamic Content**
  - Products fetched from [Fake Store API](https://fakestoreapi.com).
  - Product cards styled dynamically according to selected theme.

- **Smooth Transitions and Accessibility**
  - Animated theme transitions using Tailwind CSS.
  - ARIA attributes for accessibility on menus and controls.
  - Responsive and accessible dropdown for theme selection.

---

## Tech Stack

- React 18 with Functional Components & Hooks
- React Router DOM (v6) for routing
- Tailwind CSS for utility-first styling
- Axios for data fetching
- TypeScript for static typing and safety

---

## Installation

1. **Clone the repository**  
## git clone https://github.com/suhelahmedprojectspace/Suhel_Ahmed-React-JS-Developer-.git

## cd tswitcher


2. **Install dependencies**
* Using NPM:
```bash
npm install
```
* Using Yarn:
```bash
yarn install

```
3. **Start the development server**  



4. Open your browser and visit `http://localhost:5173` (or the port shown in your terminal).

---

## Project Structure
```
/src
  /component
    Navbar.tsx           # Responsive top navigation bar with theme switcher & mobile menu
    Sidebar.tsx          # Sidebar component used in dark mode (theme2) with navigation and theme switcher
  /context
    ThemeProvider.tsx    # React Context provider for theme state management and persistence
  /pages
    Home.tsx             # Home page fetching and displaying product data from fake store API
    About.tsx            # Static About page (customizable)
    Contact.tsx          # Static Contact page (customizable)
  /theme
    theme.ts             # Theme definitions: Tailwind CSS class sets per theme for layout, navbar, buttons, etc.
  App.tsx                # Main app container applying theme classes and routing setup
  index.tsx              # React app entry point; renders App within router and ThemeProvider contexts

```

---

## Usage Instructions

- **Switch Themes**  
  Use the dropdown menu in the navbar (desktop) or mobile menu to select between the three available themes. The app's colors, typography, layout, and styles will update instantly.

- **Navigate Pages**  
  Use the navigation links in the navbar or sidebar to switch between Home, About, and Contact pages.

- **Mobile Navigation**  
  On small screens, tap the hamburger icon to open a sliding menu with navigation and theme selector. Tap outside or the close icon to dismiss.

---

## Customization

- **Adding Themes**  
  Extend `src/theme/theme.ts` with new theme objects following the existing structure. Add a `name` property for display, and provide Tailwind CSS class strings for layout, navbar, sidebar, cards, buttons etc.

- **Pages**  
  Edit or replace the components in `/pages` to add your own content.

- **Styling**  
  Adjust Tailwind configuration or add custom CSS in `index.css` or component-specific styles as needed.

---

## Accessibility

- Semantic HTML and ARIA attributes are used for buttons and inputs.
- Keyboard accessible menu toggles.
- Proper focus styles using Tailwind focus utilities.
- Responsive for various screen sizes.

---

## Dependencies

- react
- react-dom
- react-router-dom
- lucide-react (icons)
- axios
- tailwindcss (plus autoprefixer & postcss)
- typescript

---

## Known Issues

- Theme persistence relies on localStorage and applies CSS classes to `document.body`. Adjust if you have conflicting body classes.
- Sidebar for Theme 2 is fixed width, may need layout tuning on very small desktop screens.
- API data depends on Fake Store API availability.

---


## Acknowledgments

- [Fake Store API](https://fakestoreapi.com) for sample product data
- [Tailwind CSS](https://tailwindcss.com) for styling utilities
- [Lucide Icons](https://lucide.dev) for React SVG icons

---

Feel free to open issues or feature requests!

Happy coding! 🚀

