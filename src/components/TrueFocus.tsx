import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface TrueFocusProps {
  sentence: string;
  className?: string;
  focusDuration?: number;
  blurOpacity?: number;
  accentColor?: string;
}

export default function TrueFocus({
  sentence,
  className = '',
  focusDuration = 1800,
  blurOpacity = 0.25,
  accentColor = '#4fffb0',
}: TrueFocusProps) {
  const words = sentence.split(' ');
  const [activeIndex, setActiveIndex] = useState(0);
  const [boxStyle, setBoxStyle] = useState({ left: 0, top: 0, width: 0, height: 0, opacity: 0 });
  const wordRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex(prev => (prev + 1) % words.length);
    }, focusDuration);
    return () => clearInterval(interval);
  }, [words.length, focusDuration]);

  useEffect(() => {
    const el = wordRefs.current[activeIndex];
    const container = containerRef.current;
    if (!el || !container) return;

    const elRect = el.getBoundingClientRect();
    const containerRect = container.getBoundingClientRect();
    const pad = 6;

    setBoxStyle({
      left: elRect.left - containerRect.left - pad,
      top: elRect.top - containerRect.top - pad,
      width: elRect.width + pad * 2,
      height: elRect.height + pad * 2,
      opacity: 1,
    });
  }, [activeIndex]);

  return (
    <div ref={containerRef} className={`relative inline-block ${className}`}>
      {/* Focus box */}
      <motion.div
        animate={boxStyle}
        transition={{ type: 'spring', stiffness: 260, damping: 28 }}
        className="absolute pointer-events-none z-10 rounded-lg"
        style={{
          border: `1.5px solid ${accentColor}`,
          boxShadow: `0 0 16px ${accentColor}40, inset 0 0 12px ${accentColor}08`,
          background: `${accentColor}06`,
        }}
      />

      {/* Words */}
      <span className="relative flex flex-wrap items-baseline gap-x-[0.28em] gap-y-1">
        {words.map((word, i) => {
          const isActive = i === activeIndex;
          return (
            <motion.span
              key={`${word}-${i}`}
              ref={el => { wordRefs.current[i] = el; }}
              animate={{
                opacity: isActive ? 1 : blurOpacity,
                filter: isActive ? 'blur(0px)' : 'blur(1.5px)',
              }}
              transition={{ duration: 0.4, ease: 'easeInOut' }}
              className="relative z-20 inline-block cursor-default"
              style={{
                color: isActive ? '#ffffff' : 'rgba(255,255,255,0.5)',
              }}
              onMouseEnter={() => setActiveIndex(i)}
            >
              {word}
            </motion.span>
          );
        })}
      </span>
    </div>
  );
}
