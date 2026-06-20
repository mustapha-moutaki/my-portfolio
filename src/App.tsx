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
import { Toaster } from 'react-hot-toast';
import { Route, Routes } from 'react-router-dom';
// import BlogPost from './components/pages/blogs/BlogPost';
import Blogs from './components/pages/blogs/Blogs';
import { Github, Linkedin, Rss, Mail, Twitter } from "lucide-react";
import BlogPost from './components/pages/blogs/BlogPost';
import ClickSpark from './components/ClickSpark';
import NotFound from './components/pages/404/NotFound';
import { HelmetProvider } from "react-helmet-async";

function Footer() {
  return (
    <footer
      className="py-16 border-t"
      style={{ borderColor: "rgba(255,255,255,0.06)" }}
    >
       < ClickSpark
                             sparkColor="#ffffff"
                             sparkSize={10}
                             sparkRadius={15}
                             sparkCount={8}
                             duration={400}
                           >
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Top section: bio + link columns */}
        <div className="flex flex-col lg:flex-row justify-between gap-12 lg:gap-6">
          {/* Left: Identity */}
          <div className="max-w-xs">
            <p className="font-display font-bold text-white text-lg mb-3">
              Mustapha <span style={{ color: "#4fffb0" }}>.</span>
            </p>
            <p className="text-sm text-gray-500 leading-relaxed">
              A dedicated problem-solver who thrives on learning and building.
            </p>
          </div>

          {/* Right: Link columns */}
          <div className="flex gap-16 lg:gap-24">
            <div>
              <p className="text-sm text-gray-500 mb-4">Me</p>
              <ul className="space-y-3">
                <li>
                  <a href="#projects"
                    aria-label="Projects"
                    title="Projects"
                  className="text-sm text-white hover:text-[#4fffb0] transition-colors">
                    Projects
                  </a>
                </li>
                <li>
                  <a href="blogs"
                   aria-label="blog"
                    title="blog"
                  className="text-sm text-white hover:text-[#4fffb0] transition-colors">
                    Blog
                  </a>
                </li>
                <li>
                  <a href="/bookmarks"
                   aria-label="bookmarks"
                    title="bookmarks"
                  className="text-sm text-white hover:text-[#4fffb0] transition-colors">
                    Bookmarks
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <p className="text-sm text-gray-500 mb-4">This site</p>
              <ul className="space-y-3">
                <li>
                  <a href="/analytics"
                     aria-label="analytics"
                    title="analytics"
                  className="text-sm text-white hover:text-[#4fffb0] transition-colors">
                    Analytics
                  </a>
                </li>
                <li>
                  <a href="/rss"
                     aria-label="rss"
                    title="rss"
                  className="text-sm text-white hover:text-[#4fffb0] transition-colors">
                    RSS
                  </a>
                </li>
                <li>
                  <a
                    href="https://github.com/mustapha-moutaki/portfolio"
                    aria-label="https://github.com/mustapha-moutaki/portfolio"
                    title="https://github.com/mustapha-moutaki/portfolio"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-white hover:text-[#4fffb0] transition-colors"
                  >
                    Source code
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <p className="text-sm text-gray-500 mb-4">Elsewhere</p>
              <ul className="space-y-3">
                <li>
                  <a
                    href="https://www.linkedin.com/in/mustapha-moutaki-6528a2242/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-white hover:text-[#4fffb0] transition-colors inline-flex items-center gap-1"
                  >
                    LinkedIn <span className="text-xs">↗</span>
                  </a>
                </li>
                <li>
                  <a
                    href="https://github.com/mustapha-moutaki"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-white hover:text-[#4fffb0] transition-colors inline-flex items-center gap-1"
                  >
                    GitHub <span className="text-xs">↗</span>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        

        {/* Social icons row */}
        <div className="flex items-center gap-4 mt-10">
          <a
            href="https://github.com/mustapha-moutaki"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-500 hover:text-white transition-colors"
            aria-label="GitHub"
          >
            <Github size={18} />
          </a>
          <a
            href="https://www.linkedin.com/in/mustapha-moutaki-6528a2242/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-500 hover:text-white transition-colors"
            aria-label="LinkedIn"
          >
            <Linkedin size={18} />
          </a>
          <a href="/rss" className="text-gray-500 hover:text-white transition-colors" aria-label="RSS feed">
            <Rss size={18} />
          </a>
          <a
            href="mailto:mustaphaamoutaki@gmail.com"
            className="text-gray-500 hover:text-white transition-colors"
            aria-label="Email"
          >
            <Mail size={18} />
          </a>
          <a
            href="https://x.com/mustapha_moutaki"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-500 hover:text-white transition-colors"
            aria-label="X (Twitter)"
          >
            <Twitter size={18} />
          </a>
        </div>

        {/* Bottom bar */}
        <div
          className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 mt-10 pt-6 border-t"
          style={{ borderColor: "rgba(255,255,255,0.06)" }}
        >
          <p className="text-xs text-gray-600">
            &copy; {new Date().getFullYear()} Mustapha Moutaki. All rights reserved.
          </p>
          <p className="text-xs text-gray-600">
            Last updated {new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}{" "}
            at {new Date().toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit", hour12: true })}
          </p>
        </div>
      </div>
      </ClickSpark>
    </footer>
    
  );
}

export default function App() {
   

  useEffect(() => {
    document.title = 'Mustapha Moutaki — Full-Stack Java & Angular Developer';
    
   
    document.body.style.cursor = 'none';
    return () => { document.body.style.cursor = ''; };
  }, []);

  return (
     <HelmetProvider>
    <div className="relative bg-bg min-h-screen">
      <Toaster position="top-right" />
      <CustomCursor />
      <AnimatePresence>
        <motion.div
          key="page"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
        >
          
        
          
          <Routes>
            <Route
            path="/"
            element ={
              <main>
                <Navbar />
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
            }
            
            />
            
             {/* BLOG PAGES */}
            <Route path="/blogs" element={<Blogs />} />
            <Route path="/blogs/:slug" element={<BlogPost />} />
            <Route path="*" element={<NotFound />} />

          </Routes>
         
          <Footer />
        </motion.div>
      </AnimatePresence>
    </div>
    </HelmetProvider>
  );
}
