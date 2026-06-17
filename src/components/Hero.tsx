import { useRef, useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, ArrowDown, Phone } from 'lucide-react';
import TrueFocus from './TrueFocus';

const socialLinks = [
  { icon: Github, label: 'GitHub', href: 'https://github.com/mustapha-moutaki' },
  { icon: Linkedin, label: 'LinkedIn', href: 'https://linkedin.com/in/mustapha-moutaki' },
  { icon: Phone, label: 'Phone', href: 'tel:+212650744504' },
  { icon: Mail, label: 'Email', href: 'mailto:mustaphaamoutaki@gmail.com' },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};

/* ─── Dual-image hover reveal for Hero ─── */
function HeroImage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [reveal, setReveal] = useState({ x: 50, y: 50, active: false });

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setReveal({ x, y, active: true });
  }, []);

  const handleMouseLeave = useCallback(() => {
    setReveal(prev => ({ ...prev, active: false }));
  }, []);

  const revealRadius = reveal.active ? 30 : 0;

  return (
    <div
      ref={containerRef}
      className="relative w-64 h-72 lg:w-full lg:h-[500px] rounded-[2rem] overflow-hidden cursor-none mx-auto lg:mx-0"
      style={{ 
        border: '1px solid rgba(255,255,255,0.1)',
        boxShadow: '0 20px 50px rgba(0,0,0,0.3)' 
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Base image — pic1 (sketch) */}
      <img
        src="https://res.cloudinary.com/df1wxfrxu/image/upload/v1781717901/pic1_p6mosa.png"
        alt="Mustapha Moutaki"
        className="absolute inset-0 w-full h-full object-cover"
        draggable={false}
      />

      {/* Overlay image — pic2 (pixel art) */}
      <div
        className="absolute inset-0 w-full h-full"
        style={{
          clipPath: `circle(${revealRadius}% at ${reveal.x}% ${reveal.y}%)`,
          transition: reveal.active
            ? 'clip-path 0.05s linear'
            : 'clip-path 0.6s cubic-bezier(0.22, 1, 0.36, 1)',
        }}
      >
        <img
          // src="https://res.cloudinary.com/df1wxfrxu/image/upload/v1781717901/pic2_ctfcys.png"
          src="https://res.cloudinary.com/df1wxfrxu/image/upload/v1781717483/pic2_ovlqvn.png"
          alt="Mustapha Moutaki Reveal"
          className="w-full h-full object-cover"
          draggable={false}
        />
      </div>

      {/* Vignette/Glow overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'linear-gradient(to top, rgba(9,9,9,0.4) 0%, transparent 60%)' }}
      />

      {/* Hover Hint */}
      <div
        className="absolute bottom-6 left-1/2 -translate-x-1/2 pointer-events-none whitespace-nowrap"
        style={{
          opacity: reveal.active ? 0 : 1,
          transition: 'opacity 0.4s ease',
        }}
      >
       
      </div>
    </div>
  );
}

export default function Hero() {
  const scrollToAbout = () => {
    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="hero" className="relative min-h-screen flex items-center overflow-hidden">
      {/* Aurora background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at 20% 50%, rgba(0,0,0,0) 0%, #090909 70%)' }} />
        <div
          className="aurora-1 absolute -top-32 right-0 w-[700px] h-[600px] rounded-full opacity-40"
          style={{ background: 'radial-gradient(ellipse, rgba(0, 100, 180, 0.5) 0%, rgba(0, 60, 120, 0.3) 40%, transparent 70%)', filter: 'blur(60px)' }}
        />
        <div
          className="aurora-2 absolute top-1/3 right-1/4 w-[500px] h-[500px] rounded-full opacity-30"
          style={{ background: 'radial-gradient(ellipse, rgba(0, 160, 120, 0.4) 0%, rgba(0, 80, 80, 0.2) 40%, transparent 70%)', filter: 'blur(80px)' }}
        />
        {/* Animated Background Noise */}
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
            backgroundRepeat: 'repeat',
            backgroundSize: '128px',
          }}
        />
      </div>

      {/* Grid lines */}
      <div className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-12 pt-20 pb-32">
        <div className="grid lg:grid-cols-[1.2fr,0.8fr] gap-12 lg:gap-20 items-center">
          
          {/* Left Column: Content */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div variants={itemVariants} className="mb-10">
              <span
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium"
                style={{
                  background: 'rgba(79, 255, 176, 0.08)',
                  border: '1px solid rgba(79, 255, 176, 0.2)',
                  color: '#4fffb0',
                }}
              >
                <span className="w-2 h-2 rounded-full pulse-glow" style={{ background: '#4fffb0' }} />
                Available for projects
              </span>
            </motion.div>

            <motion.div variants={itemVariants} className="mb-6">
              <div className="font-display text-5xl sm:text-6xl lg:text-7xl font-bold leading-[1.08] tracking-tight mb-3">
                <span className="text-gradient block mb-1">Hi, I'm Mustapha.</span>
              </div>
              <div className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold">
                <TrueFocus
                  sentence="A full-stack engineer."
                  focusDuration={2000}
                  blurOpacity={0.2}
                  accentColor="#4fffb0"
                  className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-white"
                />
              </div>
            </motion.div>

            <motion.p
              variants={itemVariants}
              className="text-lg sm:text-xl text-gray-400 leading-relaxed max-w-xl mb-12"
            >
              Specializing in Java Spring Boot and Angular, I build scalable RESTful APIs
              and enterprise web applications. Passionate about clean architecture and
              delivering high-impact software solutions.
            </motion.p>

            <motion.div variants={itemVariants} className="flex items-center gap-3 flex-wrap">
              {socialLinks.map(({ icon: Icon, label, href }) => (
                <motion.a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ y: -4, boxShadow: '0 12px 30px rgba(0,0,0,0.5)', borderColor: 'rgba(79,255,176,0.4)' }}
                  whileTap={{ scale: 0.96 }}
                  className="flex items-center justify-center w-12 h-12 rounded-2xl transition-colors"
                  style={{
                    background: 'rgba(255,255,255,0.05)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    color: '#ccc',
                  }}
                >
                  <Icon size={18} strokeWidth={1.8} />
                </motion.a>
              ))}

              <motion.button
                onClick={scrollToAbout}
                whileHover={{ y: -4, boxShadow: '0 12px 30px rgba(0,0,0,0.5)' }}
                whileTap={{ scale: 0.96 }}
                className="flex items-center gap-3 px-6 py-3 rounded-2xl font-display font-semibold text-sm tracking-widest uppercase"
                style={{
                  background: 'rgba(255,255,255,0.06)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  color: '#ccc',
                  letterSpacing: '0.1em',
                }}
              >
                Explore more
                <ArrowDown size={14} strokeWidth={2} />
              </motion.button>
            </motion.div>
          </motion.div>

          {/* Right Column: Interactive Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
            className="relative group"
          >
            {/* Background Glow for Image */}
            <div 
              className="absolute -inset-10 rounded-full opacity-20 blur-[100px] pointer-events-none group-hover:opacity-30 transition-opacity"
              style={{ background: 'radial-gradient(circle, #4fffb0, #0064c8)' }}
            />
            <HeroImage />
          </motion.div>

        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="w-5 h-8 rounded-full border border-white/20 flex items-start justify-center pt-1.5"
        >
          <div className="w-1 h-1.5 rounded-full bg-white/40" />
        </motion.div>
      </motion.div>
    </section>
  );
}

// import { motion } from 'framer-motion';
// import { Github, Linkedin, Mail, ArrowDown, Phone } from 'lucide-react';
// import TrueFocus from './TrueFocus';

// const socialLinks = [
//   { icon: Github, label: 'GitHub', href: 'https://github.com/mustapha-moutaki' },
//   { icon: Linkedin, label: 'LinkedIn', href: 'https://linkedin.com/in/mustapha-moutaki' },
//   { icon: Phone, label: 'Phone', href: 'tel:+212650744504' },
//   { icon: Mail, label: 'Email', href: 'mailto:mustaphaamoutaki@gmail.com' },
// ];

// const containerVariants = {
//   hidden: {},
//   visible: { transition: { staggerChildren: 0.12 } },
// };

// const itemVariants = {
//   hidden: { opacity: 0, y: 28 },
//   visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
// };

// export default function Hero() {
//   const scrollToAbout = () => {
//     document.getElementById('bento')?.scrollIntoView({ behavior: 'smooth' });
//   };

//   return (
//     <section
//       id="hero"
//       className="relative min-h-screen flex items-center overflow-hidden"
//     >
//       {/* Aurora background */}
//       <div className="absolute inset-0 overflow-hidden">
//         <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at 20% 50%, rgba(0,0,0,0) 0%, #090909 70%)' }} />
//         <div
//           className="aurora-1 absolute -top-32 right-0 w-[700px] h-[600px] rounded-full opacity-40"
//           style={{ background: 'radial-gradient(ellipse, rgba(0, 100, 180, 0.5) 0%, rgba(0, 60, 120, 0.3) 40%, transparent 70%)', filter: 'blur(60px)' }}
//         />
//         <div
//           className="aurora-2 absolute top-1/3 right-1/4 w-[500px] h-[500px] rounded-full opacity-30"
//           style={{ background: 'radial-gradient(ellipse, rgba(0, 160, 120, 0.4) 0%, rgba(0, 80, 80, 0.2) 40%, transparent 70%)', filter: 'blur(80px)' }}
//         />
//         <div
//           className="aurora-3 absolute bottom-0 right-1/3 w-[400px] h-[400px] rounded-full opacity-20"
//           style={{ background: 'radial-gradient(ellipse, rgba(79, 255, 176, 0.3) 0%, transparent 70%)', filter: 'blur(100px)' }}
//         />
//         <div
//           className="absolute inset-0 opacity-[0.025]"
//           style={{
//             backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
//             backgroundRepeat: 'repeat',
//             backgroundSize: '128px',
//           }}
//         />
//       </div>

//       {/* Grid lines */}
//       <div className="absolute inset-0 opacity-[0.03]"
//         style={{
//           backgroundImage: 'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
//           backgroundSize: '60px 60px',
//         }}
//       />

//       <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-12 pt-20 pb-32">
//         <motion.div
//           variants={containerVariants}
//           initial="hidden"
//           animate="visible"
//           className="max-w-4xl"
//         >
//           {/* Badge */}
//           <motion.div variants={itemVariants} className="mb-10">
//             <span
//               className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium"
//               style={{
//                 background: 'rgba(79, 255, 176, 0.08)',
//                 border: '1px solid rgba(79, 255, 176, 0.2)',
//                 color: '#4fffb0',
//               }}
//             >
//               <span className="w-2 h-2 rounded-full pulse-glow" style={{ background: '#4fffb0' }} />
//               Available for projects
//             </span>
//           </motion.div>

//           {/* Heading with TrueFocus */}
//           <motion.div variants={itemVariants} className="mb-6">
//             <div className="font-display text-5xl sm:text-6xl lg:text-7xl font-bold leading-[1.08] tracking-tight mb-3">
//               <span className="text-gradient block mb-1">Hi, I'm Mustapha.</span>
//             </div>
//             <div className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold">
//               <TrueFocus
//                 sentence="A full-stack engineer."
//                 focusDuration={2000}
//                 blurOpacity={0.2}
//                 accentColor="#4fffb0"
//                 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-white"
//               />
//             </div>
//           </motion.div>

//           {/* Description */}
//           <motion.p
//             variants={itemVariants}
//             className="text-lg sm:text-xl text-gray-400 leading-relaxed max-w-xl mb-12"
//           >
//             Specializing in Java Spring Boot and Angular, I build scalable RESTful APIs
//             and enterprise web applications. Passionate about clean architecture and
//             delivering high-impact software solutions.
//           </motion.p>

//           {/* Social + CTA */}
//           <motion.div variants={itemVariants} className="flex items-center gap-3 flex-wrap">
//             {socialLinks.map(({ icon: Icon, label, href }) => (
//               <motion.a
//                 key={label}
//                 href={href}
//                 aria-label={label}
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 data-cursor-target
//                 whileHover={{ y: -4, boxShadow: '0 12px 30px rgba(0,0,0,0.5), 0 0 0 1px rgba(79,255,176,0.2)' }}
//                 whileTap={{ scale: 0.96 }}
//                 transition={{ type: 'spring', stiffness: 400, damping: 20 }}
//                 className="flex items-center justify-center w-12 h-12 rounded-2xl"
//                 style={{
//                   background: 'rgba(255,255,255,0.05)',
//                   border: '1px solid rgba(255,255,255,0.1)',
//                   boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
//                   color: '#ccc',
//                 }}
//               >
//                 <Icon size={18} strokeWidth={1.8} />
//               </motion.a>
//             ))}

//             <motion.button
//               onClick={scrollToAbout}
//               data-cursor-target
//               whileHover={{ y: -4, boxShadow: '0 12px 30px rgba(0,0,0,0.5)' }}
//               whileTap={{ scale: 0.96 }}
//               transition={{ type: 'spring', stiffness: 400, damping: 20 }}
//               className="flex items-center gap-3 px-6 py-3 rounded-2xl font-display font-semibold text-sm tracking-widest uppercase"
//               style={{
//                 background: 'rgba(255,255,255,0.06)',
//                 border: '1px solid rgba(255,255,255,0.1)',
//                 boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
//                 color: '#ccc',
//                 letterSpacing: '0.1em',
//               }}
//             >
//               Explore more
//               <ArrowDown size={14} strokeWidth={2} />
//             </motion.button>
//           </motion.div>
//         </motion.div>
//       </div>

//       {/* Scroll indicator */}
//       <motion.div
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         transition={{ delay: 1.5 }}
//         className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
//       >
//         <motion.div
//           animate={{ y: [0, 8, 0] }}
//           transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
//           className="w-5 h-8 rounded-full border border-white/20 flex items-start justify-center pt-1.5"
//         >
//           <div className="w-1 h-1.5 rounded-full bg-white/40" />
//         </motion.div>
//       </motion.div>
//     </section>
//   );
// }
