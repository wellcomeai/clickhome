'use client';

import { useRef } from 'react';
import { motion, useInView, Variants } from 'framer-motion';

const wordVariants: Variants = {
  hidden: { y: 20, opacity: 0, filter: 'blur(4px)' },
  visible: (i: number) => ({
    y: 0,
    opacity: 1,
    filter: 'blur(0px)',
    transition: {
      delay: i * 0.04,
      duration: 0.5,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  }),
};

export default function RevealText({
  children,
  className,
  as: Tag = 'h2',
}: {
  children: string;
  className?: string;
  as?: 'h1' | 'h2' | 'h3' | 'p';
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-15% 0px' });
  const words = children.split(' ');

  const MotionTag = motion[Tag] as typeof motion.h2;

  return (
    <div ref={ref}>
      <MotionTag className={className}>
        {words.map((word, i) => (
          <motion.span
            key={i}
            custom={i}
            variants={wordVariants}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            style={{
              display: 'inline-block',
              marginRight: '0.25em',
              willChange: 'transform, opacity, filter',
            }}
          >
            {word}
          </motion.span>
        ))}
      </MotionTag>
    </div>
  );
}
