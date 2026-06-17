import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import BentoGrid from './components/BentoGrid';
import About from './components/About';
import Skills from './components/Skills';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Education from './components/Education';
import Blog from './components/Blog';
import Contact from './components/Contact';
import CustomCursor from './components/CustomCursor';

function Footer() {
  return (
    <footer
      className="py-8 border-t"
      style={{ borderColor: 'rgba(255,255,255,0.06)' }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="font-display font-bold text-white text-lg">
          Mustapha<span style={{ color: '#4fffb0' }}>.</span>
        </p>
        <p className="text-xs text-gray-600">
          &copy; {new Date().getFullYear()} Mustapha Moutaki. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

export default function App() {
  useEffect(() => {
    document.title = 'Mustapha Moutaki — Full-Stack Java & Angular Developer';
    // Hide default cursor globally
    document.body.style.cursor = 'none';
    return () => { document.body.style.cursor = ''; };
  }, []);

  return (
    <div className="relative bg-bg min-h-screen">
      <CustomCursor />
      <AnimatePresence>
        <motion.div
          key="page"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
        >
          <Navbar />
        
          
          <main>
            <Hero />
            <div style={{ background: 'linear-gradient(to bottom, #090909 0%, #0d0d0d 100%)' }}>
              <BentoGrid />
              <About />
              <Skills />
              <Experience />
              <Projects />
              <Education />
              <Blog />
              <Contact />
            </div>
          </main>
          <Footer />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
