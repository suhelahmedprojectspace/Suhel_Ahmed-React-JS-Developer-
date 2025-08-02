import { createContext, useContext, useEffect, useState } from "react";

/**
 * Define the allowed theme names as a TypeScript union type.
 * This restricts theme values to these specific string literals.
 */
type ThemName = "theme1" | "theme2" | "theme3";

/**
 * Interface describing the shape of the ThemeContext value.
 * - `theme`: current active theme, one of the ThemName strings.
 * - `setTheme`: function to update the current theme.
 */
interface ThemeContextType {
  theme: ThemName;
  setTheme: (theme: ThemName) => void;
}

/**
 * Create a React context for theme management.
 * Initialized with `undefined`, so TypeScript can check that context must be used inside a provider.
 */
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

/**
 * ThemeProvider component wraps your app and provides theme state globally.
 *
 * Responsibilities:
 * - Maintain the current theme in React state.
 * - Initialize theme from localStorage if available, or default to "theme1".
 * - Apply the current theme as a CSS class on the <body> element.
 * - Persist the selected theme to localStorage on change.
 * - Provide theme and setter via context to any descendant components.
 *
 * @param children - React children elements to render inside provider.
 */
export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  // State hook storing the active theme.
  // Lazy initializer reads from localStorage for persisted theme or defaults to "theme1".
  const [theme, setTheme] = useState<ThemName>(() => {
    return (localStorage.getItem("theme") as ThemName) || "theme1";
  });

  /**
   * Side effect: runs whenever `theme` changes.
   * Purpose:
   * - Remove all existing body classes (you might want to refine if other body classes exist).
   * - Add the current theme value as a class to <body> for styling purposes.
   * - Update localStorage so the theme persists across page reloads.
   */
  useEffect(() => {
    document.body.className = ""; // Clear all classes (consider preserving others if needed)
    document.body.classList.add(theme); // Add class corresponding to current theme
    localStorage.setItem("theme", theme); // Persist theme selection
  }, [theme]);

  return (
    // Provide theme and theme setter function to context consumers
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

/**
 * Custom hook to consume the ThemeContext with type safety.
 * Throws an error if used outside of ThemeProvider to help catch developer mistakes.
 *
 * @returns {ThemeContextType} The current theme and function to update it.
 */
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error("useTheme must be used inside ThemeProvider");
  return context;
};
