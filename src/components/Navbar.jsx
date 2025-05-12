// src/components/Navbar.jsx
import { Link } from "react-router-dom";

const Navbar = () => {
  const { darkMode, toggleTheme } = useTheme();

  return (
    <div className="flex justify-between items-center px-6 py-4 bg-gray-200 dark:bg-gray-800">
      <h1 className="text-xl font-bold text-gray-900 dark:text-white">🎬 Movie App</h1>
      <div className="flex items-center gap-4">
        <Link to="/favorites" className="text-gray-900 dark:text-white hover:underline">
          Favorites
        </Link>
        <button
          onClick={toggleTheme}
          className="px-4 py-2 text-sm rounded bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-500 text-gray-800 dark:text-white"
        >
          {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
        </button>
      </div>
    </div>
  );
};