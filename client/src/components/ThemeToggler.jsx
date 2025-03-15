import React, { useContext } from 'react';
import { ThemeContext } from '../context/theme.context';

const ThemeToggle = () => {
  const { darkMode, toggleTheme } = useContext(ThemeContext);

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-lg bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
      aria-label="Toggle theme"
    >
      {darkMode ? (
        <i className="ri-sun-line text-yellow-500"></i>
      ) : (
        <i className="ri-moon-line text-gray-700"></i>
      )}
    </button>
  );
};

export default ThemeToggle;