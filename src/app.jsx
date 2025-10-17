import React, { useState, useEffect } from "react";
import ModernCalendar20Year from "./ModernCalendar20Year";
import { Moon, Sun } from "lucide-react";

export default function App() {
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("theme") === "dark"
  );

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
    localStorage.setItem("theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors">
      {/* Navbar */}
      <header className="flex items-center justify-between px-6 py-4 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-sm">
        <h1 className="text-xl font-semibold tracking-tight">
          🗓️ Modern 20-Year Calendar
        </h1>
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition"
          title={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
        >
          {darkMode ? <Sun size={20} /> : <Moon size={20} />}
        </button>
      </header>

      {/* Calendar Section */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        <ModernCalendar20Year />
      </main>

      {/* Footer */}
      <footer className="text-center py-6 border-t border-gray-200 dark:border-gray-700 text-sm text-gray-500">
        © {new Date().getFullYear()} Modern Calendar — Built with React + Tailwind
      </footer>
    </div>
  );
}
