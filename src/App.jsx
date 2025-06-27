import './index.css';

import { useState } from 'react';

import { Navbar } from './components/layout/Navbar';
import { MobileMenu } from './components/layout/MobileMenu';
import Footer from './components/layout/Footer';
import { Home } from './pages/Home';
import { About } from './pages/About';
import { Projects } from './pages/Projects';
import { Contact } from './pages/Contact';

import { LoadingScreen } from './components/LoadingScreen';

function App() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      {!isLoaded && <LoadingScreen onComplete={() => setIsLoaded(true)} />}{' '}
      <div
        className={`min-h-screen transition-opacity duration-700 ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        } text-gray-100`}
        style={{ background: '#030612' }}
      >
        <Navbar menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
        <MobileMenu menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
        <Home />
        <About />
        <Projects />
        <Contact />
        <Footer />
      </div>
    </>
  );
}

export default App;
