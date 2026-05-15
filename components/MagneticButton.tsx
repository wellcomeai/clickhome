'use client';

import { useRef, ReactNode, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

type Props = {
  children: ReactNode;
  strength?: number;
  radius?: number;
  className?: string;
};

export default function MagneticButton({
  children,
  strength = 0.3,
  radius = 80,
  className,
}: Props) {
  const ref = useRef<HTMLSpanElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 150, damping: 15 });
  const sy = useSpring(y, { stiffness: 150, damping: 15 });

  const innerX = useTransform(sx, (v) => (v / strength) * 0.5);
  const innerY = useTransform(sy, (v) => (v / strength) * 0.5);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const onMove = (e: MouseEvent) => {
      const rect = node.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      const reachX = rect.width / 2 + radius;
      const reachY = rect.height / 2 + radius;

      if (Math.abs(dx) < reachX && Math.abs(dy) < reachY) {
        x.set(dx * strength);
        y.set(dy * strength);
      } else {
        x.set(0);
        y.set(0);
      }
    };

    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, [x, y, strength, radius]);

  return (
    <motion.span
      ref={ref}
      style={{ x: sx, y: sy, display: 'inline-block', willChange: 'transform' }}
      className={className}
    >
      <motion.span
        style={{ x: innerX, y: innerY, display: 'inline-block', willChange: 'transform' }}
      >
        {children}
      </motion.span>
    </motion.span>
  );
}
