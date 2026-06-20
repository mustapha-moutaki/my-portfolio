import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap, User, Layers, Briefcase, FolderOpen, GraduationCap, PenLine, MessageSquare, Download } from 'lucide-react';

const navItems = [
  { id: 'hero', icon: Zap, label: 'Home' },
  { id: 'about', icon: User, label: 'About' },
  { id: 'skills', icon: Layers, label: 'Skills' },
  { id: 'experience', icon: Briefcase, label: 'Experience' },
  { id: 'projects', icon: FolderOpen, label: 'Projects' },
  { id: 'education', icon: GraduationCap, label: 'Education' },
  { id: 'blog', icon: PenLine, label: 'Blog' },
  { id: 'contact', icon: MessageSquare, label: 'Contact' },
  { id: 'cv', icon: Download, label: 'Resume' },
];

export default function Navbar() {
  const [active, setActive] = useState('hero');
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      const sections = navItems.map(item => document.getElementById(item.id));
      const scrollY = window.scrollY + window.innerHeight / 2;

      for (let i = sections.length - 1; i >= 0; i--) {
        const el = sections[i];
        if (el && el.offsetTop <= scrollY) {
          setActive(navItems[i].id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <motion.nav
      initial={{ y: 80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.8, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
className="fixed bottom-8 left-0 right-0 z-50 flex justify-center"    >
      <div
  className="glass-dark rounded-2xl px-2 py-2 flex items-center justify-center gap-0.5"
        style={{ boxShadow: '0 20px 60px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.08)' }}
      >
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = active === item.id;
          const isHovered = hoveredItem === item.id;

          return (
            <div
              key={item.id}
              className="relative flex flex-col items-center"
              onMouseEnter={() => setHoveredItem(item.id)}
              onMouseLeave={() => setHoveredItem(null)}
            >
              <AnimatePresence>
                {isHovered && (
                  <motion.div
                    initial={{ opacity: 0, y: 4, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 4, scale: 0.9 }}
                    transition={{ duration: 0.15 }}
                    className="absolute -top-9 left-1/2 -translate-x-1/2 px-2.5 py-1 rounded-lg text-xs font-medium text-white whitespace-nowrap"
                    style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.12)', backdropFilter: 'blur(8px)' }}
                  >
                    {item.label}
                  </motion.div>
                )}
              </AnimatePresence>

             <motion.a
  href={item.id === 'cv'
    ? 'https://collection.cloudinary.com/df1wxfrxu/ecfeb2b6688417e0a272cb0973630d39'
    : `#${item.id}`
  }
  target={item.id === 'cv' ? '_blank' : undefined}
  whileHover={{ scale: 1.15, y: -3 }}
  whileTap={{ scale: 0.95 }}
  transition={{ type: 'spring', stiffness: 400, damping: 20 }}
  className="relative flex items-center justify-center w-10 h-10 rounded-xl transition-colors duration-200"
  style={{
    background: isActive
      ? 'rgba(79, 255, 176, 0.15)'
      : 'rgba(255, 255, 255, 0.04)',
    border: isActive
      ? '1px solid rgba(79, 255, 176, 0.3)'
      : '1px solid transparent',
  }}
>
  <Icon
    size={16}
    style={{ color: isActive ? '#4fffb0' : '#666' }}
    strokeWidth={1.8}
  />

  {isActive && (
    <motion.span
      layoutId="dock-indicator"
      className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full"
      style={{ background: '#4fffb0' }}
    />
  )}
</motion.a>
            </div>
          );
        })}
      </div>
    </motion.nav>
  );
}
