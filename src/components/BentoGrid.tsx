import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, MapPin, Layers, ArrowRight, Terminal, GitBranch, Phone } from 'lucide-react';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { GitHubCalendar } from 'react-github-calendar';
import {
  SiAngular,
  SiReact,
  SiNextdotjs,
  SiSpringboot,
  SiLaravel,
  SiDocker,
  SiLinux,
  SiJenkins,
} from "react-icons/si";
import { FaAws } from "react-icons/fa6";


/* ─── LogoLoop component ─── */
const ANIMATION_CONFIG = {
  SMOOTH_TAU: 0.25,
  MIN_COPIES: 2,
  COPY_HEADROOM: 2
} as const;

const cx = (...parts: Array<string | false | null | undefined>) => parts.filter(Boolean).join(' ');

const toCssLength = (value?: number | string): string | undefined =>
  typeof value === 'number' ? `${value}px` : (value ?? undefined);

type LogoItem = { node: React.ReactNode; href?: string; title?: string; ariaLabel?: string };

interface LogoLoopProps {
  logos: LogoItem[];
  speed?: number;
  direction?: 'left' | 'right';
  width?: number | string;
  logoHeight?: number;
  gap?: number;
  pauseOnHover?: boolean;
  fadeOut?: boolean;
  fadeOutColor?: string;
  className?: string;
  style?: React.CSSProperties;
}

import React from 'react';

const LogoLoop = React.memo<LogoLoopProps>(({
  logos,
  speed = 120,
  direction = 'left',
  width = '100%',
  logoHeight = 28,
  gap = 32,
  pauseOnHover,
  fadeOut = false,
  fadeOutColor,
  className,
  style,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const seqRef = useRef<HTMLUListElement>(null);
  const [seqWidth, setSeqWidth] = useState(0);
  const [copyCount, setCopyCount] = useState(ANIMATION_CONFIG.MIN_COPIES);
  const [isHovered, setIsHovered] = useState(false);
  const rafRef = useRef<number | null>(null);
  const lastTsRef = useRef<number | null>(null);
  const offsetRef = useRef(0);
  const velocityRef = useRef(0);

  const targetVelocity = useMemo(() => {
    const mag = Math.abs(speed);
    return mag * (direction === 'left' ? 1 : -1);
  }, [speed, direction]);

  const updateDimensions = useCallback(() => {
    const containerWidth = containerRef.current?.clientWidth ?? 0;
    const sw = seqRef.current?.getBoundingClientRect?.().width ?? 0;
    if (sw > 0) {
      setSeqWidth(Math.ceil(sw));
      const copies = Math.ceil(containerWidth / sw) + ANIMATION_CONFIG.COPY_HEADROOM;
      setCopyCount(Math.max(ANIMATION_CONFIG.MIN_COPIES, copies));
    }
  }, []);

  useEffect(() => {
    updateDimensions();
    const obs = new ResizeObserver(updateDimensions);
    if (containerRef.current) obs.observe(containerRef.current);
    if (seqRef.current) obs.observe(seqRef.current);
    return () => obs.disconnect();
  }, [logos, gap, logoHeight, updateDimensions]);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    if (seqWidth > 0) {
      offsetRef.current = ((offsetRef.current % seqWidth) + seqWidth) % seqWidth;
      track.style.transform = `translate3d(${-offsetRef.current}px, 0, 0)`;
    }

    const animate = (ts: number) => {
      if (lastTsRef.current === null) lastTsRef.current = ts;
      const dt = Math.max(0, ts - lastTsRef.current) / 1000;
      lastTsRef.current = ts;
      const target = isHovered && pauseOnHover ? 0 : targetVelocity;
      const ease = 1 - Math.exp(-dt / ANIMATION_CONFIG.SMOOTH_TAU);
      velocityRef.current += (target - velocityRef.current) * ease;
      if (seqWidth > 0) {
        let next = offsetRef.current + velocityRef.current * dt;
        next = ((next % seqWidth) + seqWidth) % seqWidth;
        offsetRef.current = next;
        track.style.transform = `translate3d(${-next}px, 0, 0)`;
      }
      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);
    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
      lastTsRef.current = null;
    };
  }, [targetVelocity, seqWidth, isHovered, pauseOnHover]);

  const cssVars = useMemo(() => ({
    '--logoloop-gap': `${gap}px`,
    '--logoloop-logoHeight': `${logoHeight}px`,
    ...(fadeOutColor && { '--logoloop-fadeColor': fadeOutColor }),
  }) as React.CSSProperties, [gap, logoHeight, fadeOutColor]);

  const containerStyle = useMemo((): React.CSSProperties => ({
    width: toCssLength(width) ?? '100%',
    ...cssVars,
    ...style,
  }), [width, cssVars, style]);

  const lists = useMemo(() => Array.from({ length: copyCount }, (_, ci) => (
    <ul
      className="flex items-center"
      key={`copy-${ci}`}
      role="list"
      aria-hidden={ci > 0}
      ref={ci === 0 ? seqRef : undefined}
    >
      {logos.map((item, ii) => (
        <li
          className="flex-none mr-[var(--logoloop-gap)]"
          key={`${ci}-${ii}`}
          role="listitem"
        >
          {item.href ? (
            <a href={item.href} target="_blank" rel="noreferrer noopener" aria-label={item.ariaLabel ?? item.title ?? 'logo'}>
              {item.node}
            </a>
          ) : item.node}
        </li>
      ))}
    </ul>
  )), [copyCount, logos]);

  return (
    <div
      ref={containerRef}
      className={cx('relative overflow-x-hidden', className)}
      style={containerStyle}
      role="region"
    >
      {fadeOut && (
        <>
          <div
            aria-hidden
            className="pointer-events-none absolute inset-y-0 left-0 z-10 w-[clamp(24px,8%,80px)]"
            style={{ background: `linear-gradient(to right, ${fadeOutColor ?? 'rgba(0,0,0,0.9)'} 0%, rgba(0,0,0,0) 100%)` }}
          />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-y-0 right-0 z-10 w-[clamp(24px,8%,80px)]"
            style={{ background: `linear-gradient(to left, ${fadeOutColor ?? 'rgba(0,0,0,0.9)'} 0%, rgba(0,0,0,0) 100%)` }}
          />
        </>
      )}
      <div
        className="flex flex-row w-max will-change-transform select-none"
        ref={trackRef}
        onMouseEnter={() => { if (pauseOnHover) setIsHovered(true); }}
        onMouseLeave={() => { if (pauseOnHover) setIsHovered(false); }}
      >
        {lists}
      </div>
    </div>
  );
});

LogoLoop.displayName = 'LogoLoop';

/* ─── Tech stack mini icons ─── */
const techItems = [
  {
    label: "Spring Boot",
    icon: <SiSpringboot size={56} />,
  },
  {
    label: "Laravel",
    icon: <SiLaravel size={56} />,
  },
  {
    label: "Next.js",
    icon: <SiNextdotjs size={56} />,
  },
  {
    label: "React",
    icon: <SiReact size={56} />,
  },
  {
    label: "Angular",
    icon: <SiAngular size={56} />,
  },
  {
    label: "AWS",
    icon: <FaAws size={56} />,
  },
  {
    label: "Docker",
    icon: <SiDocker size={56} />,
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.97 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07 } },
};

function CasablancaMap() {
  const initialized = useRef(false);

  const init = useCallback((node: HTMLDivElement | null) => {
    if (!node || initialized.current) return;
    initialized.current = true;

    if (!document.getElementById('leaflet-css')) {
      const link = document.createElement('link');
      link.id = 'leaflet-css';
      link.rel = 'stylesheet';
      link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
      document.head.appendChild(link);
    }

    const boot = () => {
      const L = (window as any).L;
      const el = document.getElementById('casablanca-map');
      if (!el || (el as any)._leaflet_id) return;

      const map = L.map('casablanca-map', {
        center: [33.5928, -7.6192],
        zoom: 13,
        zoomControl: false,
        attributionControl: false,
        scrollWheelZoom: false,
        dragging: false,
      });

      L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
        maxZoom: 19,
      }).addTo(map);

      const zoomOut = L.Control.extend({
        options: { position: 'bottomleft' },
        onAdd: () => {
          const btn = L.DomUtil.create('button');
          btn.innerHTML = '−';
          btn.style.cssText = `
            width: 36px; height: 36px; border-radius: 50%;
            background: rgba(0,0,0,0.85); border: 1px solid rgba(255,255,255,0.15);
            color: white; font-size: 20px; line-height: 1;
            cursor: pointer; backdrop-filter: blur(8px);
            display: flex; align-items: center; justify-content: center;
            margin-bottom: 16px; margin-left: 16px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.4);
          `;
          L.DomEvent.on(btn, 'click', (e: Event) => {
            L.DomEvent.stopPropagation(e);
            map.zoomOut();
          });
          return btn;
        },
      });

      const zoomIn = L.Control.extend({
        options: { position: 'bottomright' },
        onAdd: () => {
          const btn = L.DomUtil.create('button');
          btn.innerHTML = '+';
          btn.style.cssText = `
            width: 36px; height: 36px; border-radius: 50%;
            background: rgba(0,0,0,0.85); border: 1px solid rgba(255,255,255,0.15);
            color: white; font-size: 20px; line-height: 1;
            cursor: pointer; backdrop-filter: blur(8px);
            display: flex; align-items: center; justify-content: center;
            margin-bottom: 16px; margin-right: 16px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.4);
          `;
          L.DomEvent.on(btn, 'click', (e: Event) => {
            L.DomEvent.stopPropagation(e);
            map.zoomIn();
          });
          return btn;
        },
      });

      new zoomOut().addTo(map);
      new zoomIn().addTo(map);
    };

    if (!(window as any).L) {
      const script = document.createElement('script');
      script.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
      script.onload = boot;
      document.head.appendChild(script);
    } else {
      boot();
    }
  }, []);

  return <div ref={init} style={{ display: 'none' }} />;
}

export default function BentoGrid() {
  return (
    <section id="bento" className="relative py-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          className="mb-12"
        >
          <div className="section-divider mb-4" />
          <span className="text-xs font-semibold tracking-[0.2em] uppercase" style={{ color: '#4fffb0' }}>
            Overview
          </span>
          <h2 className="font-display text-4xl lg:text-5xl font-bold text-white mt-3">
            A glimpse into my world
          </h2>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 auto-rows-[minmax(140px,auto)]"
        >
          {/* Card 1: Location — spans 2 cols */}
          <motion.div
            variants={cardVariants}
            whileHover={{ scale: 1.01, y: -2 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            className="relative rounded-3xl overflow-hidden sm:col-span-2 row-span-2"
            style={{
              border: '1px solid rgba(255,255,255,0.07)',
              minHeight: '280px',
            }}
          >
            <div
              id="casablanca-map"
              className="absolute inset-0 w-full h-full"
              style={{ zIndex: 1 }}
            />
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                zIndex: 10,
                background: 'radial-gradient(ellipse at 50% 50%, transparent 25%, rgba(9,9,9,0.6) 100%)',
              }}
            />
            <div
              className="absolute inset-0 flex flex-col justify-between p-6"
              style={{ zIndex: 20, pointerEvents: 'none' }}
            >
              <div
                className="self-start flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium"
                style={{
                  background: 'rgba(0,0,0,0.75)',
                  border: '1px solid rgba(255,255,255,0.15)',
                  backdropFilter: 'blur(8px)',
                  WebkitBackdropFilter: 'blur(8px)',
                  color: '#ddd',
                  pointerEvents: 'auto',
                  zIndex: 30,
                }}
              >
                <MapPin size={12} style={{ color: '#4fffb0' }} />
                Location
              </div>
              <div
                className="absolute inset-0 flex items-center justify-center"
                style={{ pointerEvents: 'none' }}
              >
                <div className="relative flex items-center justify-center">
                  <motion.div
                    animate={{ scale: [1, 2.4, 1], opacity: [0.45, 0, 0.45] }}
                    transition={{ duration: 2.5, repeat: Infinity, ease: 'easeOut' }}
                    className="absolute rounded-full"
                    style={{ background: 'rgba(79,255,176,0.3)', width: 52, height: 52 }}
                  />
                  <motion.div
                    animate={{ scale: [1, 1.8, 1], opacity: [0.5, 0, 0.5] }}
                    transition={{ duration: 2.5, repeat: Infinity, ease: 'easeOut', delay: 0.4 }}
                    className="absolute rounded-full"
                    style={{ background: 'rgba(79,255,176,0.25)', width: 36, height: 36 }}
                  />
                  <div
                    style={{
                      width: 16,
                      height: 16,
                      borderRadius: '50%',
                      background: '#4fffb0',
                      border: '2.5px solid rgba(9,9,9,0.9)',
                      boxShadow: '0 0 16px rgba(79,255,176,0.8), 0 0 32px rgba(79,255,176,0.4)',
                      position: 'relative',
                      zIndex: 10,
                    }}
                  />
                </div>
              </div>
              <div>
                <p className="font-display text-2xl font-bold text-white">Casablanca</p>
                <p className="text-sm text-gray-400 mt-0.5">Morocco · GMT+1</p>
              </div>
            </div>
            <CasablancaMap />
          </motion.div>

          {/* Card 2: Featured project */}
          <motion.div
            variants={cardVariants}
            whileHover={{ scale: 1.02, y: -3 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            className="relative rounded-3xl overflow-hidden"
            style={{
              background: 'rgba(79,255,176,0.06)',
              border: '1px solid rgba(79,255,176,0.15)',
              minHeight: '140px',
            }}
          >
            <div className="p-6 h-full flex flex-col justify-between">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center"
                style={{ background: 'rgba(79,255,176,0.12)', border: '1px solid rgba(79,255,176,0.2)' }}
              >
                <Terminal size={18} style={{ color: '#4fffb0' }} strokeWidth={1.8} />
              </div>
              <div>
                <p className="font-display font-bold text-white text-lg leading-snug">AlexIS</p>
                <p className="text-xs text-gray-400 mt-1">Intelligent Support Platform</p>
              </div>
            </div>
          </motion.div>

          {/* Card 3: Availability */}
          <motion.div
            variants={cardVariants}
            whileHover={{ scale: 1.02, y: -3 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            className="relative rounded-3xl overflow-hidden"
            style={{
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(255,255,255,0.07)',
              minHeight: '140px',
            }}
          >
            <div className="p-6 h-full flex flex-col justify-between">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full pulse-glow" style={{ background: '#4fffb0' }} />
                <span className="text-xs text-gray-400 font-medium">Status</span>
              </div>
              <div>
                <p className="font-display font-bold text-white text-lg">Open to work</p>
                <p className="text-xs text-gray-500 mt-1">Available from July 2026</p>
              </div>
            </div>
          </motion.div>

          {/* Card 4: Social links */}
          <motion.div
            variants={cardVariants}
            className="sm:col-span-2 lg:col-span-1 flex gap-3 items-stretch"
          >
            {[
              { icon: Github, href: 'https://github.com/mustapha-moutaki', color: '#ffffff', bg: 'rgba(255,255,255,0.05)', border: 'rgba(255,255,255,0.1)', glow: 'rgba(255,255,255,0.15)' },
              { icon: Linkedin, href: 'https://www.linkedin.com/in/mustapha-moutaki-6528a2242/', color: '#0a66c2', bg: 'rgba(10,102,194,0.08)', border: 'rgba(10,102,194,0.2)', glow: 'rgba(10,102,194,0.25)' },
              { icon: Mail, href: 'mailto:mustaphaamoutaki@gmail.com', color: '#4fffb0', bg: 'rgba(79,255,176,0.06)', border: 'rgba(79,255,176,0.15)', glow: 'rgba(79,255,176,0.2)' },
              { icon: Phone, href: 'tel:+212650744504', color: '#f97316', bg: 'rgba(249,115,22,0.06)', border: 'rgba(249,115,22,0.15)', glow: 'rgba(249,115,22,0.2)' },
            ].map(({ icon: Icon, href, color, bg, border, glow }) => (
              <motion.a
                key={href}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -5, boxShadow: `0 14px 32px ${glow}`, scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: 'spring', stiffness: 400, damping: 18 }}
                className="flex-1 flex items-center justify-center rounded-2xl min-h-[60px]"
                style={{ background: bg, border: `1px solid ${border}` }}
              >
                <Icon size={20} style={{ color }} strokeWidth={1.8} />
              </motion.a>
            ))}
          </motion.div>

          {/* Card 5: Discover more projects */}
          <motion.a
            href="#projects"
            aria-label="Projects"
            title="Projects"
            variants={cardVariants}
            whileHover={{ scale: 1.02, y: -3, boxShadow: '0 12px 40px rgba(79,255,176,0.12)' }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            className="rounded-3xl flex items-center justify-between px-6 cursor-pointer"
            style={{
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(255,255,255,0.08)',
              minHeight: '60px',
            }}
            onClick={e => { e.preventDefault(); document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' }); }}
          >
            <span className="font-display font-semibold text-white text-sm">Discover more projects</span>
            <div
              className="w-8 h-8 rounded-xl flex items-center justify-center"
              style={{ background: 'rgba(79,255,176,0.1)', border: '1px solid rgba(79,255,176,0.2)' }}
            >
              <ArrowRight size={14} style={{ color: '#4fffb0' }} strokeWidth={2.5} />
            </div>
          </motion.a>

          {/* Card 6: GitHub activity — spans 2 cols */}
          <motion.div
            variants={cardVariants}
            whileHover={{ scale: 1.01, y: -2 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            className="rounded-3xl p-6 sm:col-span-2"
            style={{
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(255,255,255,0.07)',
            }}
          >
            <div className="flex items-center gap-2 mb-5">
              <div
                className="flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium"
                style={{
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  color: '#aaa',
                }}
              >
                <Github size={12} />
                GitHub activity
              </div>
              <span className="text-xs text-gray-500 ml-auto">@mustapha-moutaki</span>
            </div>
            <div className="overflow-x-auto">
              <div className="min-w-max">
                <GitHubCalendar
                  username="mustapha-moutaki"
                  blockSize={12}
                  blockMargin={4}
                  fontSize={12}
                  theme={{
                    dark: [
                      'rgba(255,255,255,0.04)',
                      'rgba(79,255,176,0.2)',
                      'rgba(79,255,176,0.45)',
                      'rgba(79,255,176,0.7)',
                      '#4fffb0',
                    ],
                  }}
                />
              </div>
            </div>
            <p className="text-xs text-gray-600 mt-4">Live contribution activity from GitHub</p>
          </motion.div>

          {/* Card 7: Tech stack — spans 2 cols */}
          <motion.div
            variants={cardVariants}
            whileHover={{ scale: 1.01, y: -2 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            className="rounded-3xl p-6 sm:col-span-2"
            style={{
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(255,255,255,0.07)',
            }}
          >
            <div className="flex items-center gap-2 mb-5">
              <div
                className="flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium"
                style={{ background: 'rgba(79,255,176,0.06)', border: '1px solid rgba(79,255,176,0.15)', color: '#4fffb0' }}
              >
                <Layers size={12} />
                Tech stack
              </div>
            </div>

            <div className="mb-5">
  <LogoLoop
    logos={techItems.map((t) => ({
      node: (
        <motion.div
          whileHover={{ y: -3, scale: 1.15 }}
          transition={{ type: 'spring', stiffness: 400, damping: 18 }}
          className="flex items-center justify-center"
          style={{
            width: 84,
            height: 84,
            borderRadius: 12,
            background: 'rgba(255,255,255,0.05)',
            border: '1px solid rgba(255,255,255,0.1)',
            color: 'rgba(255,255,255,0.65)',
            padding: 16,
          }}
          title={t.label}
        >
          {t.icon}
        </motion.div>
      ),
    }))}
    speed={55}
    direction="left"
    logoHeight={44}
    gap={14}
    pauseOnHover
    fadeOut
    fadeOutColor="rgba(9,9,9,0.9)"
  />
</div>

            <div>
              <p className="font-display font-semibold text-white text-sm">Tech stacks I'm familiar with</p>
              <p className="text-xs text-gray-500 mt-1">
                Primarily focused on Java/Spring & React/Angular ecosystem,<br />
                but always eager to explore and learn new technologies.
              </p>
            </div>
          </motion.div>

          {/* Card 8: Experience count */}
          <motion.div
            variants={cardVariants}
            whileHover={{ scale: 1.02, y: -3 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            className="rounded-3xl p-6 flex flex-col justify-between"
            style={{
              background: 'rgba(79,255,176,0.04)',
              border: '1px solid rgba(79,255,176,0.1)',
            }}
          >
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center"
              style={{ background: 'rgba(79,255,176,0.1)', border: '1px solid rgba(79,255,176,0.2)' }}
            >
              <GitBranch size={18} style={{ color: '#4fffb0' }} strokeWidth={1.8} />
            </div>
            <div>
              <p className="font-display text-4xl font-bold text-gradient-accent">3+</p>
              <p className="text-xs text-gray-500 mt-1">Projects shipped</p>
            </div>
          </motion.div>

          {/* Card 9: Certifications count */}
          <motion.div
            variants={cardVariants}
            whileHover={{ scale: 1.02, y: -3 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            className="rounded-3xl p-6 flex flex-col justify-between"
            style={{
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(255,255,255,0.07)',
            }}
          >
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center"
              style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)' }}
            >
              <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" stroke="rgba(255,255,255,0.7)" strokeWidth="1.8">
                <path d="M12 15l-2 5 2-1 2 1-2-5zM8.5 9a3.5 3.5 0 1 0 7 0 3.5 3.5 0 0 0-7 0z" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M20 12a8 8 0 1 0-16 0 8 8 0 0 0 16 0z" strokeLinecap="round" />
              </svg>
            </div>
            <div>
              <p className="font-display text-4xl font-bold text-white">5</p>
              <p className="text-xs text-gray-500 mt-1">Certifications earned</p>
            </div>
          </motion.div>

        </motion.div>
      </div>
    </section>
  );
}