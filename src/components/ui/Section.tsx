import { motion, type HTMLMotionProps } from 'framer-motion';
import type { ReactNode } from 'react';

/**
  * Global micro-interaction timings.
  * Controlled, responsive, accessible (prefers-reduced-motion respected).
  */

interface RevealProps extends HTMLMotionProps<'div'> {
  children: ReactNode;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  distance?: number;
  className?: string;
}

export const Reveal = ({
  children,
  delay = 0,
  direction = 'up',
  distance = 18,
  className = '',
  ...rest
}: RevealProps) => {
  const initialOffset = {
    up: { y: distance, x: 0 },
    down: { y: -distance, x: 0 },
    left: { x: distance, y: 0 },
    right: { x: -distance, y: 0 },
    none: { x: 0, y: 0 },
  }[direction];

  return (
    <motion.div
      initial={{ opacity: 0, ...initialOffset }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{
        duration: 0.45,
        delay,
        ease: [0.16, 1, 0.3, 1], // snappy technical cubic-bezier
      }}
      className={className}
      {...rest}
    >
      {children}
    </motion.div>
  );
};

/** Staggered container for lists/grids of cards. */
export const StaggerContainer = ({
  children,
  className = '',
}: {
  children: ReactNode;
  className?: string;
}) => (
  <motion.div
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, margin: '-40px' }}
    variants={{
      hidden: {},
      visible: {
        transition: {
          staggerChildren: 0.08,
        },
      },
    }}
    className={className}
  >
    {children}
  </motion.div>
);

export const StaggerItem = ({
  children,
  className = '',
}: {
  children: ReactNode;
  className?: string;
}) => (
  <motion.div
    variants={{
      hidden: { opacity: 0, y: 16 },
      visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] },
      },
    }}
    className={className}
  >
    {children}
  </motion.div>
);

/** Section heading: mono kicker + h2 + optional lead paragraph. */
export const SectionHeader = ({
  kicker,
  title,
  lead,
  id,
}: {
  kicker: string;
  title: string;
  lead?: string;
  id?: string;
}) => (
  <Reveal className="max-w-prose">
    <p className="t-mono t-mono-accent">{kicker}</p>
    <h2 id={id} className="t-h2 mt-3">
      {title}
    </h2>
    {lead && <p className="t-lead mt-4">{lead}</p>}
  </Reveal>
);
