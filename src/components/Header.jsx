export default function Header({ toggleDarkMode, darkMode }) {
  return (
    <header className="flex justify-between items-center px-4 py-3 shadow dark:shadow-white">
      <h1 className="text-xl font-bold">My Portfolio</h1>
      <button
        onClick={toggleDarkMode}
        className="bg-gray-800 dark:bg-gray-200 text-white dark:text-black px-3 py-1 rounded"
      >
        {darkMode ? 'Light Mode' : 'Dark Mode'}
      </button>
    </header>
  );
}
