import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { useRef, type ReactNode } from 'react';

/**
 * Scroll-driven 3D depth. The element tilts + drifts as it crosses the
 * viewport and resolves perfectly flat at center, so text is never read
 * while skewed. GPU-only transforms; no layout thrash.
 *
 * Skipped entirely for prefers-reduced-motion.
 * ponytail: one shared perspective per element. Move to a single parent
 * perspective container if we ever need siblings sharing one vanishing point.
 */
export const Scroll3D = ({
  children,
  className = '',
  rotateX = 6,
  rotateY = 0,
  drift = 28,
  scaleAmount = 0.985,
}: {
  children: ReactNode;
  className?: string;
  /** Peak rotateX in degrees at viewport edges. */
  rotateX?: number;
  /** Peak rotateY in degrees at viewport edges. */
  rotateY?: number;
  /** Peak vertical parallax drift in px. */
  drift?: number;
  /** Scale at viewport edges (1 = flat at center). */
  scaleAmount?: number;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const prefersReduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const rx = useTransform(scrollYProgress, [0, 0.5, 1], [rotateX, 0, -rotateX]);
  const ry = useTransform(scrollYProgress, [0, 0.5, 1], [-rotateY, 0, rotateY]);
  const y = useTransform(scrollYProgress, [0, 0.5, 1], [drift, 0, -drift]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [scaleAmount, 1, scaleAmount]);

  if (prefersReduced) return <div className={className}>{children}</div>;

  return (
    <motion.div
      ref={ref}
      style={{
        transformPerspective: 1200,
        rotateX: rx,
        rotateY: ry,
        y,
        scale,
        willChange: 'transform',
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default Scroll3D;

/**
 * Depth parallax: moves a layer at a fraction of scroll speed. Used to give the
 * page a foreground/background split without a second render pass.
 */
export const Parallax = ({
  children,
  className = '',
  speed = 0.25,
  fade = false,
}: {
  children: ReactNode;
  className?: string;
  /** Fraction of scroll distance the layer travels. Negative = opposite direction. */
  speed?: number;
  /** Fade out as the element leaves the top of the viewport. */
  fade?: boolean;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const prefersReduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], ['0px', `${speed * 320}px`]);
  const opacity = useTransform(scrollYProgress, [0, 0.75], [1, fade ? 0 : 1]);

  if (prefersReduced) return <div className={className}>{children}</div>;

  return (
    <motion.div ref={ref} style={{ y, opacity, willChange: 'transform' }} className={className}>
      {children}
    </motion.div>
  );
};
