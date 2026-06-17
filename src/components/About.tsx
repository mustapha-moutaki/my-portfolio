import { useRef, useState, useCallback } from 'react';
import { motion, useInView } from 'framer-motion';
import { MapPin, Calendar, Code2, Globe } from 'lucide-react';

const stats = [
  { value: '1+', label: 'Year experience' },
  { value: '3+', label: 'Projects shipped' },
  { value: '5', label: 'Certifications' },
  { value: '3', label: 'Languages spoken' },
];

const highlights = [
  { icon: MapPin, text: 'Casablanca, Morocco' },
  { icon: Calendar, text: 'Available from July 2025' },
  { icon: Code2, text: 'Java & Angular specialist' },
  { icon: Globe, text: 'Open to remote worldwide' },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } },
};

/* ─── Dual-image hover reveal ─── */
function ProfileImage() {
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

  const revealRadius = reveal.active ? 28 : 0;

  return (
    <div
      ref={containerRef}
      className="relative w-72 h-80 lg:w-80 lg:h-96 rounded-3xl overflow-hidden cursor-none"
      style={{ border: '1px solid rgba(255,255,255,0.08)' }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Base image — pic1 (sketch) */}
      <img
        src="https://res.cloudinary.com/df1wxfrxu/image/upload/v1781717483/pic1_jycu2c.png"
        alt="Mustapha Moutaki — sketch portrait"
        className="absolute inset-0 w-full h-full object-cover"
        draggable={false}
      />

      {/* Overlay image — pic2 (pixel art), revealed via circle mask */}
      <div
        className="absolute inset-0 w-full h-full transition-none"
        style={{
          clipPath: `circle(${revealRadius}% at ${reveal.x}% ${reveal.y}%)`,
          transition: reveal.active
            ? 'clip-path 0.05s linear'
            : 'clip-path 0.55s cubic-bezier(0.22, 1, 0.36, 1)',
        }}
      >
        <img
          src="https://res.cloudinary.com/df1wxfrxu/image/upload/v1781717483/pic2_ovlqvn.png"
          alt="Mustapha Moutaki — pixel art portrait"
          className="w-full h-full object-cover"
          draggable={false}
        />
      </div>

      {/* Gradient overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'linear-gradient(to top, rgba(9,9,9,0.55) 0%, transparent 55%)' }}
      />

      {/* Hint label on hover start */}
      <div
        className="absolute bottom-4 left-4 right-4 pointer-events-none"
        style={{
          opacity: reveal.active ? 0 : 1,
          transition: 'opacity 0.3s ease',
        }}
      >
        <div
          className="px-3 py-2 rounded-xl text-xs font-medium text-white/80 text-center"
          style={{ background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.1)' }}
        >
          Hover to reveal
        </div>
      </div>
    </div>
  );
}

export default function About() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="about" className="relative py-32 overflow-hidden">
      <div
        className="absolute top-1/2 left-0 -translate-y-1/2 w-96 h-96 rounded-full opacity-10 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse, rgba(79,255,176,0.4) 0%, transparent 70%)', filter: 'blur(80px)' }}
      />

      <div ref={ref} className="max-w-7xl mx-auto px-6 lg:px-12">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="grid lg:grid-cols-2 gap-20 items-center"
        >
          {/* Left — Profile image with hover reveal */}
          <motion.div variants={itemVariants} className="relative flex justify-center lg:justify-start">
            <div className="relative">
              {/* Glow */}
              <div
                className="absolute -inset-4 rounded-3xl opacity-20 blur-2xl pointer-events-none"
                style={{ background: 'linear-gradient(135deg, rgba(79,255,176,0.5), rgba(0,100,200,0.3))' }}
              />

              <motion.div
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              >
                <ProfileImage />
              </motion.div>

              {/* Status card */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.4, duration: 0.6 }}
                className="absolute -right-6 top-8 glass rounded-2xl p-4 min-w-[140px]"
                style={{ boxShadow: '0 8px 32px rgba(0,0,0,0.5)' }}
              >
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-2 h-2 rounded-full pulse-glow" style={{ background: '#4fffb0' }} />
                  <span className="text-xs text-gray-400">Status</span>
                </div>
                <p className="text-sm font-semibold text-white">Open to work</p>
              </motion.div>

              {/* Stack card */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.5, duration: 0.6 }}
                className="absolute -left-6 bottom-12 glass rounded-2xl p-4"
                style={{ boxShadow: '0 8px 32px rgba(0,0,0,0.5)' }}
              >
                <p className="text-2xl font-display font-bold text-gradient-accent">Java</p>
                <p className="text-xs text-gray-400 mt-0.5">Spring Boot<br />specialist</p>
              </motion.div>
            </div>
          </motion.div>

          {/* Right — Content */}
          <div>
            <motion.div variants={itemVariants} className="mb-3">
              <div className="section-divider mb-4" />
              <span className="text-xs font-semibold tracking-[0.2em] uppercase" style={{ color: '#4fffb0' }}>
                About me
              </span>
            </motion.div>

            <motion.h2
              variants={itemVariants}
              className="font-display text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight"
            >
              Engineering solutions
              <span className="text-gradient-accent"> with precision.</span>
            </motion.h2>

            <motion.p variants={itemVariants} className="text-gray-400 text-lg leading-relaxed mb-6">
              I'm a Full-Stack Software Engineer specializing in Java Spring Boot and Angular,
              with expertise in building scalable RESTful APIs and enterprise web applications.
              Passionate about clean architecture, problem-solving, and continuous improvement
              in Agile environments.
            </motion.p>

            <motion.p variants={itemVariants} className="text-gray-500 leading-relaxed mb-10">
              Driven by discipline, focus, and confidence to deliver high-impact software solutions.
              I thrive in collaborative teams and enjoy tackling complex challenges with structured
              thinking and modern engineering practices.
            </motion.p>

            <motion.div variants={itemVariants} className="grid grid-cols-2 gap-3 mb-10">
              {highlights.map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-center gap-3">
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{ background: 'rgba(79,255,176,0.08)', border: '1px solid rgba(79,255,176,0.15)' }}
                  >
                    <Icon size={14} style={{ color: '#4fffb0' }} strokeWidth={2} />
                  </div>
                  <span className="text-sm text-gray-300">{text}</span>
                </div>
              ))}
            </motion.div>

            <motion.div variants={itemVariants} className="grid grid-cols-4 gap-4">
              {stats.map(({ value, label }) => (
                <div key={label} className="text-center">
                  <p className="font-display text-3xl font-bold text-gradient-accent">{value}</p>
                  <p className="text-xs text-gray-500 mt-1 leading-tight">{label}</p>
                </div>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
