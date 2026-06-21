import React, { useEffect, useRef, RefObject, useState, useCallback } from 'react';
import { gsap } from 'gsap';
import { motion, useInView } from 'framer-motion';
import { MapPin, Calendar, Code2, Globe } from 'lucide-react';

/* ─── Crosshair Component ─── */
const lerp = (a: number, b: number, n: number): number => (1 - n) * a + n * b;

const getMousePos = (e: Event, container?: HTMLElement | null): { x: number; y: number } => {
  const mouseEvent = e as MouseEvent;
  if (container) {
    const bounds = container.getBoundingClientRect();
    return { x: mouseEvent.clientX - bounds.left, y: mouseEvent.clientY - bounds.top };
  }
  return { x: mouseEvent.clientX, y: mouseEvent.clientY };
};

interface CrosshairProps {
  color?: string;
  containerRef?: RefObject<HTMLElement | null>;
}

const Crosshair: React.FC<CrosshairProps> = ({ color = 'white', containerRef = { current: null } }) => {
  const cursorRef = useRef(null);
  const lineHorizontalRef = useRef<HTMLDivElement>(null);
  const lineVerticalRef = useRef<HTMLDivElement>(null);
  const filterXRef = useRef<SVGFETurbulenceElement>(null);
  const filterYRef = useRef<SVGFETurbulenceElement>(null);

  let mouse = { x: 0, y: 0 };

  useEffect(() => {
    const handleMouseMove = (ev: Event) => {
      const mouseEvent = ev as MouseEvent;
      mouse = getMousePos(mouseEvent, containerRef?.current);
      if (containerRef?.current) {
        const bounds = containerRef.current.getBoundingClientRect();
        if (
          mouseEvent.clientX < bounds.left ||
          mouseEvent.clientX > bounds.right ||
          mouseEvent.clientY < bounds.top ||
          mouseEvent.clientY > bounds.bottom
        ) {
          gsap.to([lineHorizontalRef.current, lineVerticalRef.current].filter(Boolean), { opacity: 0 });
        } else {
          gsap.to([lineHorizontalRef.current, lineVerticalRef.current].filter(Boolean), { opacity: 1 });
        }
      }
    };

    const target: HTMLElement | Window = containerRef?.current || window;
    target.addEventListener('mousemove', handleMouseMove);

    const renderedStyles: {
      [key: string]: { previous: number; current: number; amt: number };
    } = {
      tx: { previous: 0, current: 0, amt: 0.15 },
      ty: { previous: 0, current: 0, amt: 0.15 }
    };

    gsap.set([lineHorizontalRef.current, lineVerticalRef.current].filter(Boolean), { opacity: 0 });

    const onMouseMove = (_ev: Event) => {
      renderedStyles.tx.previous = renderedStyles.tx.current = mouse.x;
      renderedStyles.ty.previous = renderedStyles.ty.current = mouse.y;

      gsap.to([lineHorizontalRef.current, lineVerticalRef.current].filter(Boolean), {
        duration: 0.9,
        ease: 'Power3.easeOut',
        opacity: 1
      });

      requestAnimationFrame(render);
      target.removeEventListener('mousemove', onMouseMove);
    };

    target.addEventListener('mousemove', onMouseMove);

    const primitiveValues = { turbulence: 0 };

    const tl = gsap
      .timeline({
        paused: true,
        onStart: () => {
          if (lineHorizontalRef.current) lineHorizontalRef.current.style.filter = 'url(#filter-noise-x)';
          if (lineVerticalRef.current) lineVerticalRef.current.style.filter = 'url(#filter-noise-y)';
        },
        onUpdate: () => {
          if (filterXRef.current && filterYRef.current) {
            filterXRef.current.setAttribute('baseFrequency', primitiveValues.turbulence.toString());
            filterYRef.current.setAttribute('baseFrequency', primitiveValues.turbulence.toString());
          }
        },
        onComplete: () => {
          if (lineHorizontalRef.current && lineVerticalRef.current) {
            lineHorizontalRef.current.style.filter = 'none';
            lineVerticalRef.current.style.filter = 'none';
          }
        }
      })
      .to(primitiveValues, {
        duration: 0.5,
        ease: 'power1',
        startAt: { turbulence: 1 },
        turbulence: 0
      });

    const enter = () => tl.restart();
    const leave = () => { tl.progress(1).kill(); };

    const render = () => {
      renderedStyles.tx.current = mouse.x;
      renderedStyles.ty.current = mouse.y;

      for (const key in renderedStyles) {
        const style = renderedStyles[key];
        style.previous = lerp(style.previous, style.current, style.amt);
      }

      if (lineHorizontalRef.current && lineVerticalRef.current) {
        gsap.set(lineVerticalRef.current, { x: renderedStyles.tx.previous });
        gsap.set(lineHorizontalRef.current, { y: renderedStyles.ty.previous });
      }

      requestAnimationFrame(render);
    };

    const links: NodeListOf<HTMLAnchorElement> = containerRef?.current
      ? containerRef.current.querySelectorAll('a')
      : document.querySelectorAll('a');

    links.forEach(link => {
      link.addEventListener('mouseenter', enter);
      link.addEventListener('mouseleave', leave);
    });

    return () => {
      target.removeEventListener('mousemove', handleMouseMove);
      target.removeEventListener('mousemove', onMouseMove);
      links.forEach(link => {
        link.removeEventListener('mouseenter', enter);
        link.removeEventListener('mouseleave', leave);
      });
    };
  }, [containerRef]);

  return (
    <div ref={cursorRef} className={`${containerRef ? 'absolute' : 'fixed'} top-0 left-0 w-full h-full pointer-events-none z-[10000] overflow-hidden`}>
      <svg className="absolute w-0 h-0">
        <filter id="filter-noise-x">
          <feTurbulence ref={filterXRef} type="fractalNoise" baseFrequency="0.000001" numOctaves="1" result="warp" />
          <feOffset dx="-90" result="warpOffset" />
          <feDisplacementMap xChannelSelector="R" yChannelSelector="G" scale="30" in="SourceGraphic" in2="warpOffset" />
        </filter>
        <filter id="filter-noise-y">
          <feTurbulence ref={filterYRef} type="fractalNoise" baseFrequency="0.000001" numOctaves="1" result="warp" />
          <feDisplacementMap xChannelSelector="R" yChannelSelector="G" scale="30" in="SourceGraphic" in2="warp" />
        </filter>
      </svg>
      <div ref={lineHorizontalRef} className="absolute w-full h-px pointer-events-none opacity-0 transform translate-y-1/2" style={{ background: color }} />
      <div ref={lineVerticalRef} className="absolute h-full w-px pointer-events-none opacity-0 transform translate-x-1/2" style={{ background: color }} />
    </div>
  );
};

/* ─── Existing Data ─── */
const stats = [
  { value: '3+', label: 'Year experience' },
  { value: '21+', label: 'Projects shipped' },
  { value: '5+', label: 'Certifications' },
  { value: '4', label: 'Languages spoken' },
];

const highlights = [
  { icon: MapPin, text: 'Casablanca, Morocco' },
  { icon: Calendar, text: 'Available from July 2025' },
  { icon: Code2, text: 'Java & Angular specialist' },
  { icon: Globe, text: 'Open to remote worldwide' },
];

const containerVariants = { hidden: {}, visible: { transition: { staggerChildren: 0.1 } } };
const itemVariants = { hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } } };

/* ─── Dual-image hover reveal ─── */
function ProfileImage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [reveal, setReveal] = useState({ x: 50, y: 50, active: false });

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
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
      <img
        src="https://res.cloudinary.com/df1wxfrxu/image/upload/f_auto,q_auto,w_600/v1781717901/pic1_p6mosa.png"
        alt="Mustapha Moutaki — sketch portrait"
        className="w-full h-full object-cover"
        draggable={false}
      />
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
          src="https://res.cloudinary.com/df1wxfrxu/image/upload/f_auto,q_auto,w_600/v1781717483/pic2_ovlqvn.png"
          alt="Mustapha Moutaki — pixel art portrait"
          className="w-full h-full object-cover"
          draggable={false}
        />
      </div>
      <div className="absolute inset-0 pointer-events-none" style={{ background: 'linear-gradient(to top, rgba(9,9,9,0.55) 0%, transparent 55%)' }} />
      <div className="absolute bottom-4 left-4 right-4 pointer-events-none" style={{ opacity: reveal.active ? 0 : 1, transition: 'opacity 0.3s ease' }}>
        <div className="px-3 py-2 rounded-xl text-xs font-medium text-white/80 text-center" style={{ background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.1)' }}>
          Hire me!
        </div>
      </div>
    </div>
  );
}

/* ─── Main About Section ─── */
export default function About() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section ref={ref} className="relative py-24 lg:py-32 overflow-hidden" id="about">
      {/* Integration of Crosshair */}
      <Crosshair containerRef={ref} color="rgba(13, 219, 243, 0.5)" />

      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-96 h-96 rounded-full opacity-10 pointer-events-none" style={{ background: 'radial-gradient(ellipse, rgba(79,255,176,0.4) 0%, transparent 70%)', filter: 'blur(80px)' }} />

      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="grid lg:grid-cols-2 gap-20 items-center"
        >
          {/* Left — Profile image */}
          <motion.div variants={itemVariants} className="relative flex justify-center lg:justify-start">
            <div className="relative">
              <div className="absolute -inset-4 rounded-3xl opacity-20 blur-2xl pointer-events-none" style={{ background: 'linear-gradient(135deg, rgba(79,255,176,0.5), rgba(0,100,200,0.3))' }} />
              <motion.div whileHover={{ scale: 1.02 }} transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}>
                <ProfileImage />
              </motion.div>
              <motion.div initial={{ opacity: 0, x: 20 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ delay: 0.4, duration: 0.6 }} className="absolute -right-6 top-8 glass rounded-2xl p-4 min-w-[140px] pointer-events-none select-none" style={{ boxShadow: '0 8px 32px rgba(0,0,0,0.5)' }}>
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-2 h-2 rounded-full pulse-glow" style={{ background: '#4fffb0' }} />
                  <span className="text-xs text-gray-400">First solve</span>
                </div>
                <p className="text-sm font-semibold text-white"> the problem</p>
              </motion.div>
              <motion.div 
  initial={{ opacity: 0, x: -20 }} 
  animate={inView ? { opacity: 1, x: 0 } : {}} 
  transition={{ delay: 0.5, duration: 0.6 }} 

  className="absolute -left-6 bottom-12 glass rounded-2xl p-4 pointer-events-none select-none" 
  style={{ boxShadow: '0 8px 32px rgba(0,0,0,0.5)' }}
>
  <p className="text-2xl font-display font-bold text-gradient-accent">Then</p>
  <p className="text-xs text-gray-400 mt-0.5">Write the <br />code</p>
</motion.div>
            </div>
          </motion.div>

          {/* Right — Content */}
          <div>
            <motion.div variants={itemVariants} className="mb-3">
              <div className="section-divider mb-4" />
              <span className="text-xs font-semibold tracking-[0.2em] uppercase" style={{ color: '#4fffb0' }}>About me</span>
            </motion.div>
            <motion.h2 variants={itemVariants} className="font-display text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
              Engineering solutions<span className="text-gradient-accent"> with precision.</span>
            </motion.h2>
            <motion.p variants={itemVariants} className="text-gray-400 text-lg leading-relaxed mb-6">
              I'm a Full-Stack Software Engineer specializing in Java Spring Boot and Angular, with expertise in building scalable RESTful APIs and enterprise web applications. Passionate about clean architecture, problem-solving, and continuous improvement in Agile environments.
            </motion.p>
            <motion.p variants={itemVariants} className="text-gray-500 leading-relaxed mb-10">
              Driven by discipline, focus, and confidence to deliver high-impact software solutions. I thrive in collaborative teams and enjoy tackling complex challenges with structured thinking and modern engineering practices.
            </motion.p>
            <motion.div variants={itemVariants} className="grid grid-cols-2 gap-3 mb-10">
              {highlights.map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: 'rgba(79,255,176,0.08)', border: '1px solid rgba(79,255,176,0.15)' }}>
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