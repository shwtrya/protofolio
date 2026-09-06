import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

export const CustomCursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const followerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    // Only activate on fine pointer devices (desktop mouse/trackpad) and if no reduced motion
    const hasFinePointer = window.matchMedia('(pointer: fine)').matches;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!hasFinePointer || prefersReducedMotion) return;

    const cursor = cursorRef.current;
    const follower = followerRef.current;
    if (!cursor || !follower) return;

    // Use gsap.quickTo for hardware-accelerated 60fps tracking without lag
    const xDot = gsap.quickTo(cursor, 'x', { duration: 0.08, ease: 'power3.out' });
    const yDot = gsap.quickTo(cursor, 'y', { duration: 0.08, ease: 'power3.out' });
    const xFollower = gsap.quickTo(follower, 'x', { duration: 0.35, ease: 'power3.out' });
    const yFollower = gsap.quickTo(follower, 'y', { duration: 0.35, ease: 'power3.out' });

    const handleMouseMove = (e: MouseEvent) => {
      xDot(e.clientX);
      yDot(e.clientY);
      xFollower(e.clientX);
      yFollower(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseEnter = () => setIsVisible(true);
    const handleMouseLeave = () => setIsVisible(false);

    // Detect clickable elements for cursor expansion
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;
      const clickable = target.closest('a, button, [role="button"], input, textarea, .cursor-pointer, [data-project-card], .profile-card');
      setIsHovered(!!clickable);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseover', handleMouseOver, { passive: true });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseover', handleMouseOver);
    };
  }, [isVisible]);

  return (
    <div
      className={`pointer-events-none fixed inset-0 z-[9999] transition-opacity duration-300 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
      aria-hidden="true"
    >
      {/* Inner precise dot */}
      <div
        ref={cursorRef}
        className={`fixed left-0 top-0 -ml-1 -mt-1 h-2 w-2 rounded-full bg-[#111114] transition-transform duration-150 ${
          isHovered ? 'scale-0' : 'scale-100'
        }`}
        style={{ willChange: 'transform' }}
      />

      {/* Outer fluid follower ring */}
      <div
        ref={followerRef}
        className={`fixed left-0 top-0 -ml-4 -mt-4 h-8 w-8 rounded-full border border-[#111114]/40 transition-[width,height,background-color,border-color,transform] duration-300 ${
          isHovered
            ? 'scale-150 border-transparent bg-[#111114]/15 backdrop-blur-[1px]'
            : 'scale-100'
        }`}
        style={{ willChange: 'transform' }}
      />
    </div>
  );
};

export default CustomCursor;
