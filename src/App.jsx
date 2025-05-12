import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Projects from './components/Projects';
import Contact from './components/Contact';

function App() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode);
  }, [darkMode]);

  return (
    <div className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white min-h-screen transition">
      <Header toggleDarkMode={() => setDarkMode(!darkMode)} darkMode={darkMode} />
      <main className="p-4">
        <Hero />
        <Projects />
        <Contact />
      </main>
    </div>
  );
}

export default App;
