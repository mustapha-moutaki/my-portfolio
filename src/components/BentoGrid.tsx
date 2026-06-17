import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, MapPin, Layers, ArrowRight, Terminal, GitBranch, Phone } from 'lucide-react';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { GitHubCalendar } from 'react-github-calendar';

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
    label: 'Java',
    icon: (
      <svg viewBox="0 0 128 128" fill="currentColor">
        <path d="M47.617 98.12s-4.767 2.774 3.397 3.71c9.892 1.13 14.947.968 25.845-1.092 0 0 2.871 1.795 6.873 3.351-24.439 10.47-55.308-.607-36.115-5.969zM44.629 84.455s-5.348 3.959 2.823 4.805c10.567 1.091 18.91 1.18 33.354-1.6 0 0 1.993 2.025 5.132 3.131-29.542 8.64-62.446.68-41.309-6.336z"/>
        <path d="M69.802 61.271c6.025 6.935-1.58 13.17-1.58 13.17s15.289-7.891 8.269-17.777c-6.559-9.215-11.587-13.792 15.635-29.58 0 0-42.731 10.67-22.324 34.187z"/>
        <path d="M97.921 105.929s3.523 2.91-3.882 5.159c-14.087 4.272-58.636 5.56-71.011.171-4.444-1.932 3.886-4.613 6.508-5.178 2.73-.593 4.289-.485 4.289-.485-4.937-3.478-31.882 6.82-13.693 9.769 49.58 8.043 90.456-3.625 77.789-9.436zM49.912 70.294s-22.686 5.389-8.033 7.348c6.188.828 18.518.638 30.011-.326 9.386-.782 18.813-2.454 18.813-2.454s-3.308 1.419-5.704 3.053c-23.042 6.061-67.544 3.238-54.731-2.958 10.832-5.239 19.644-4.663 19.644-4.663zM86.48 90.458c23.421-12.17 12.583-23.86 5.032-22.285-1.848.385-2.677.72-2.677.72s.688-1.079 2-1.543c14.953-5.255 26.451 15.503-4.823 23.725 0 .001.359-.327.468-.617z"/>
        <path d="M76.491 1.587S89.449 14.563 64.188 34.51c-20.266 16.006-4.621 25.13-.007 35.559-11.831-10.673-20.509-20.07-14.688-28.815C58.041 28.42 81.722 22.195 76.491 1.587z"/>
        <path d="M52.214 126.021c22.476 1.437 57-.8 57.817-11.436 0 0-1.571 4.032-18.577 7.231-19.186 3.612-42.854 3.191-56.887.874 0 .001 2.875 2.381 17.647 3.331z"/>
      </svg>
    ),
  },
  {
    label: 'Spring',
    icon: (
      <svg viewBox="0 0 128 128" fill="currentColor">
        <path d="M116.452 6.643a59.104 59.104 0 01-6.837 12.136C99.325 5.053 83.532-1.613 66.209.201 41.476 2.791 22.157 22.95 20.7 47.736c-1.603 27.495 19.568 50.906 46.741 51.668v-.005c13.013.366 25.523-4.89 34.554-14.078-.257-.187-21.843-16.078-21.843-16.078l12.562-3.457L109.6 87.48l.025-.024c-11.16 14.2-27.956 22.906-46.771 22.906C28.897 110.362.007 81.487 0 45.677-.003 20.373 14.436-.007 39.637-.002c14.415.003 27.08 6.605 35.477 16.976 0 0 8.157 11.759 7.988 16.665L116.452 6.643z"/>
      </svg>
    ),
  },
  {
    label: 'Angular',
    icon: (
      <svg viewBox="0 0 128 128" fill="currentColor">
        <path d="M63.81 2.317L4.553 24.291l9.363 81.431L63.81 128l49.891-22.278 9.363-81.431zm0 10.657l42.749 52.163H63.81V12.974zm0 0L21.062 65.137H63.81V12.974zM38.18 96.11l10.146-24.949H63.81v-.012h15.484l10.146 24.961-25.63 11.244z"/>
      </svg>
    ),
  },
  {
    label: 'React',
    icon: (
      <svg viewBox="0 0 128 128" fill="currentColor">
        <path d="M64 35.7a28.3 28.3 0 110 56.6 28.3 28.3 0 010-56.6zm0 10a18.3 18.3 0 100 36.6 18.3 18.3 0 000-36.6zM64 0c8.56 0 15.376 6.816 15.376 15.376S72.56 30.752 64 30.752 48.624 23.936 48.624 15.376 55.44 0 64 0zm0 97.248c8.56 0 15.376 6.816 15.376 15.376S72.56 128 64 128s-15.376-6.816-15.376-15.376S55.44 97.248 64 97.248zM15.376 48.624c8.56 0 15.376 6.816 15.376 15.376s-6.816 15.376-15.376 15.376S0 72.56 0 64s6.816-15.376 15.376-15.376zm97.248 0C121.184 48.624 128 55.44 128 64s-6.816 15.376-15.376 15.376S97.248 72.56 97.248 64s6.816-15.376 15.376-15.376z"/>
      </svg>
    ),
  },
  {
    label: 'TypeScript',
    icon: (
      <svg viewBox="0 0 128 128" fill="currentColor">
        <path d="M2 63.91v62.5h125v-125H2zm100.73-5a15.56 15.56 0 017.82 4.5 20.58 20.58 0 013 4c0 .16-5.4 3.81-8.69 5.85-.12.08-.6-.44-1.13-1.23a7.09 7.09 0 00-5.87-3.53c-3.79-.26-6.23 1.73-6.21 5a4.58 4.58 0 00.54 2.34c.83 1.73 2.38 2.76 7.24 4.86 8.95 3.85 12.78 6.39 15.16 10 2.66 4 3.25 10.46 1.45 15.24-2 5.2-6.9 8.73-13.83 9.9a38.32 38.32 0 01-9.52-.1 23 23 0 01-12.72-6.63c-1.15-1.27-3.39-4.58-3.25-4.82a9.4 9.4 0 011.15-.73l4.6-2.64 3.59-2.08.75 1.11a16.78 16.78 0 004.74 4.54c4 2.1 9.46 1.81 12.16-.62a5.43 5.43 0 00.69-6.92c-1-1.39-3-2.56-8.59-5-6.45-2.78-9.23-4.5-11.77-7.24a16.48 16.48 0 01-3.43-6.25 25 25 0 01-.22-8c1.33-6.23 6-10.58 12.82-11.87a31.66 31.66 0 019.49.26zm-29.34 5.24v5.12H57.16v46.23H45.65V69.26H29.38v-5a49.19 49.19 0 01.14-5.16c.06-.08 10-.12 22-.1l21.83.06z"/>
      </svg>
    ),
  },
  {
    label: 'Docker',
    icon: (
      <svg viewBox="0 0 128 128" fill="currentColor">
        <path d="M124.8 52.1c-4.3-2.5-10-2.8-14.8-1.4-.6-5.2-4-9.7-8-12.9l-1.6-1.3-1.4 1.6c-2.6 3.1-3.4 8.3-3 12.3-2-.9-4.6-1.4-6.8-.3-1.5.7-2.5 1.8-3.4 3.1H73v-9.4h-9.4v-9.4H54v9.4h-9.4v9.4H35v9.4h-9.4v9.4h-9.4v9.4H7.1c-.9 4.6.1 9.5 2.7 13.5 2.7 4.1 6.9 6.9 11.5 8.1 2.4.6 4.9.9 7.4.9 3.2 0 6.5-.6 9.5-1.9 4.4-1.9 8.3-5 11.3-8.9 2.6-3.4 4.5-7.4 5.6-11.7h1.1c5.2 0 10.5-1.9 13.9-5.9 1.6-1.9 2.8-4.2 3.3-6.7h.3c3.4 0 6.9-.9 9.8-2.8v-.1c0 .1 0 .1 0 0zM35 61.5h9.4V71H35zm9.6 0H54V71h-9.4zm9.4 0h9.4V71H54zm9.4 0H73V71h-9.6zM25.6 61.5H35V71h-9.4zm37.6-9.4H73v9.4h-9.6v-9.4zm-9.4 0h9.4v9.4H54v-9.4zm-9.4 0h9.4v9.4h-9.4v-9.4zm28.2 18.8v-9.4h9.4c0 3.2-.3 6.6-2 9.4h-7.4z"/>
      </svg>
    ),
  },
  {
    label: 'PostgreSQL',
    icon: (
      <svg viewBox="0 0 128 128" fill="currentColor">
        <path d="M93.809 90.443c.398-3.294.279-3.764 2.726-3.255l.621.056c1.88.085 4.338-.302 5.784-1.022 3.104-1.545 4.944-4.124 1.885-3.444-6.979 1.551-7.492-1.025-7.492-1.025 7.402-10.984 10.503-24.918 7.831-35.632-7.263-29.04-33.296-27.338-33.296-27.338-3.603-.066-7.772.06-12.271 1.129 0 0-38.176 15.79-36.409 56.496.388 8.715 1.228 16.887 4.789 16.887 5.885 0 11.306-15.361 11.306-15.361s2.761 18.423 14.576 18.423c3.987 0 7.927-5.23 10.147-10.256-.698 3.81-1.08 10.256 4.27 10.256 3.032 0 7.29-1.57 7.29-1.57-.059.585-.093 1.18-.075 1.801.228 7.829 6.3 8.31 10.294 6.97 7.386-2.499 14.046-12.221 17.024-24.116z"/>
        <path fill="#fff" d="M56.983 20.069c-.367-.024-.727-.035-1.08-.034 5.855-3.041 13.037-4.432 20.76-2.823 14.358 2.992 27.125 17.378 27.492 33.783-3.765-11.44-13.405-18.568-23.674-21.264-7.636-2.009-16.094-1.549-23.498-9.662z"/>
      </svg>
    ),
  },
  {
    label: 'Git',
    icon: (
      <svg viewBox="0 0 128 128" fill="currentColor">
        <path d="M124.737 58.378L69.621 3.264c-3.172-3.174-8.32-3.174-11.497 0L46.68 14.71l14.518 14.518c3.375-1.139 7.243-.375 9.932 2.314 2.703 2.706 3.461 6.607 2.294 9.993l13.992 13.993c3.385-1.167 7.292-.413 9.994 2.295 3.78 3.777 3.78 9.9 0 13.679a9.673 9.673 0 01-13.683 0 9.677 9.677 0 01-2.105-10.521L68.574 47.933l-.002 34.341a9.708 9.708 0 012.559 1.828c3.778 3.777 3.778 9.898 0 13.683-3.779 3.777-9.904 3.777-13.679 0-3.778-3.784-3.778-9.905 0-13.683a9.65 9.65 0 013.167-2.11V47.333a9.581 9.581 0 01-3.167-2.11c-2.862-2.861-3.551-7.06-2.083-10.576L40.911 20.16 3.264 57.799a8.123 8.123 0 000 11.498l55.115 55.104c3.172 3.177 8.316 3.177 11.497 0l54.861-54.860a8.124 8.124 0 000-11.163z"/>
      </svg>
    ),
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