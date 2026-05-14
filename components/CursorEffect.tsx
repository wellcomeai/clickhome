'use client';

import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

type CursorState = 'default' | 'hover' | 'card' | 'video' | 'text';

export default function CursorEffect() {
  const [mounted, setMounted] = useState(false);
  const [isCoarse, setIsCoarse] = useState(false);
  const [state, setState] = useState<CursorState>('default');

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);
  const dotMouseX = useMotionValue(-100);
  const dotMouseY = useMotionValue(-100);

  const outerX = useSpring(mouseX, { stiffness: 120, damping: 20 });
  const outerY = useSpring(mouseY, { stiffness: 120, damping: 20 });
  const dotX = useSpring(dotMouseX, { stiffness: 400, damping: 30 });
  const dotY = useSpring(dotMouseY, { stiffness: 400, damping: 30 });

  useEffect(() => {
    setMounted(true);
    if (typeof window === 'undefined') return;
    const mq = window.matchMedia('(pointer: coarse)');
    setIsCoarse(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setIsCoarse(e.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  useEffect(() => {
    if (!mounted || isCoarse) return;

    const onMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX - 20);
      mouseY.set(e.clientY - 20);
      dotMouseX.set(e.clientX - 3);
      dotMouseY.set(e.clientY - 3);
    };

    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target || typeof target.closest !== 'function') return;

      if (target.closest('[data-cursor="card"]')) {
        setState('card');
        return;
      }
      if (target.closest('[data-cursor="video"]')) {
        setState('video');
        return;
      }
      if (target.matches('input, textarea, select')) {
        setState('text');
        return;
      }
      if (
        target.closest('a, button, [role="button"], [data-cursor="hover"]')
      ) {
        setState('hover');
        return;
      }
      setState('default');
    };

    window.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseover', onMouseOver);
    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseover', onMouseOver);
    };
  }, [mounted, isCoarse, mouseX, mouseY, dotMouseX, dotMouseY]);

  if (!mounted || isCoarse) return null;

  const outerScale =
    state === 'card'
      ? 2.2
      : state === 'hover'
      ? 1.6
      : state === 'video'
      ? 1.4
      : state === 'text'
      ? 1
      : 1;

  const outerScaleX = state === 'text' ? 0.3 : outerScale;
  const outerScaleY = state === 'text' ? 0.3 : outerScale;

  return (
    <>
      <motion.div
        style={{
          x: outerX,
          y: outerY,
          position: 'fixed',
          top: 0,
          left: 0,
          width: 40,
          height: 40,
          borderRadius: '50%',
          border: '1.5px solid rgba(255,255,255,0.6)',
          background: 'rgba(255,255,255,0.08)',
          backdropFilter: 'blur(4px) invert(0.15)',
          WebkitBackdropFilter: 'blur(4px) invert(0.15)',
          pointerEvents: 'none',
          zIndex: 9999,
          mixBlendMode: 'difference',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
        animate={{
          scaleX: outerScaleX,
          scaleY: outerScaleY,
          opacity: state === 'hover' ? 0.9 : 1,
        }}
        transition={{ type: 'spring', stiffness: 250, damping: 22 }}
      >
        {state === 'card' && (
          <span
            style={{
              fontSize: 9,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: 'white',
              fontFamily: 'var(--font-golos), system-ui, sans-serif',
            }}
          >
            Открыть
          </span>
        )}
      </motion.div>

      <motion.div
        style={{
          x: dotX,
          y: dotY,
          position: 'fixed',
          top: 0,
          left: 0,
          width: 6,
          height: 6,
          borderRadius: '50%',
          background: 'white',
          pointerEvents: 'none',
          zIndex: 9999,
          mixBlendMode: 'difference',
        }}
      />
    </>
  );
}
