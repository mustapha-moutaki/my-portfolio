import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function CustomCursor() {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springX = useSpring(cursorX, { stiffness: 400, damping: 38, mass: 0.3 });
  const springY = useSpring(cursorY, { stiffness: 400, damping: 38, mass: 0.3 });

  const ringX = useSpring(cursorX, { stiffness: 110, damping: 20, mass: 0.7 });
  const ringY = useSpring(cursorY, { stiffness: 110, damping: 20, mass: 0.7 });

  const [state, setState] = useState<'default' | 'hover' | 'click'>('default');
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);

      const el = e.target as HTMLElement;
      const interactive = el.closest('a, button, [data-cursor-target], input, textarea, label, select');
      setState(interactive ? 'hover' : 'default');
    };

    const onDown = () => setState('click');
    const onUp = (e: MouseEvent) => {
      const el = e.target as HTMLElement;
      const interactive = el.closest('a, button, [data-cursor-target], input, textarea, label, select');
      setState(interactive ? 'hover' : 'default');
    };
    const onLeave = () => setHidden(true);
    const onEnter = () => setHidden(false);

    window.addEventListener('mousemove', onMove, { passive: true });
    window.addEventListener('mousedown', onDown);
    window.addEventListener('mouseup', onUp);
    document.documentElement.addEventListener('mouseleave', onLeave);
    document.documentElement.addEventListener('mouseenter', onEnter);

    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mousedown', onDown);
      window.removeEventListener('mouseup', onUp);
      document.documentElement.removeEventListener('mouseleave', onLeave);
      document.documentElement.removeEventListener('mouseenter', onEnter);
    };
  }, [cursorX, cursorY]);

  const ringSize = state === 'hover' ? 48 : state === 'click' ? 18 : 32;
  const dotSize = state === 'click' ? 2 : 4;
  const ringBorder = state === 'hover' ? '#4fffb0' : 'rgba(255,255,255,0.45)';
  const ringBg = state === 'hover' ? 'rgba(79,255,176,0.08)' : 'transparent';

  return (
    <>
      {/* Outer ring — lagging */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9998] rounded-full"
        style={{
          x: ringX,
          y: ringY,
          translateX: '-50%',
          translateY: '-50%',
          border: `1.5px solid ${ringBorder}`,
          background: ringBg,
          transition: 'border-color 0.22s ease, background 0.22s ease',
          opacity: hidden ? 0 : 1,
        }}
        animate={{ width: ringSize, height: ringSize }}
        transition={{ width: { type: 'spring', stiffness: 260, damping: 22 }, height: { type: 'spring', stiffness: 260, damping: 22 } }}
      />

      {/* Center dot — exact */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] rounded-full"
        style={{
          x: springX,
          y: springY,
          translateX: '-50%',
          translateY: '-50%',
          background: state === 'hover' ? '#4fffb0' : 'white',
          transition: 'background 0.18s ease',
          opacity: hidden ? 0 : 1,
        }}
        animate={{ width: dotSize, height: dotSize }}
        transition={{ width: { type: 'spring', stiffness: 600, damping: 30 }, height: { type: 'spring', stiffness: 600, damping: 30 } }}
      />
    </>
  );
}
