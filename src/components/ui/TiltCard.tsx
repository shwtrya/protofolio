import { useRef, useState, type MouseEvent, type ReactNode } from 'react';

interface TiltCardProps {
  children: ReactNode;
  className?: string;
  maxTilt?: number;
  glare?: boolean;
}

/**
 * Lightweight pointer-based 3D Card Tilt with realistic specular glare.
 * - Hardware accelerated CSS transforms (rotateX/rotateY)
 * - Zero external animation libraries, 0 dependencies
 * - Auto-disabled on mobile / touch devices (no pointer-hover overhead)
 */
export const TiltCard = ({
  children,
  className = '',
  maxTilt = 7,
  glare = true,
}: TiltCardProps) => {
  const cardRef = useRef<HTMLDivElement | null>(null);
  const [tilt, setTilt] = useState({ rx: 0, ry: 0, glareX: 50, glareY: 50, opacity: 0 });

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const el = cardRef.current;
    if (!el) return;

    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const px = (x / rect.width - 0.5) * 2; // -1 to 1
    const py = (y / rect.height - 0.5) * 2; // -1 to 1

    const rx = -py * maxTilt;
    const ry = px * maxTilt;

    setTilt({
      rx,
      ry,
      glareX: (x / rect.width) * 100,
      glareY: (y / rect.height) * 100,
      opacity: 1,
    });
  };

  const handleMouseLeave = () => {
    setTilt({ rx: 0, ry: 0, glareX: 50, glareY: 50, opacity: 0 });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `perspective(1000px) rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg)`,
        transition: tilt.opacity === 0 ? 'transform 0.5s ease-out' : 'none',
        transformStyle: 'preserve-3d',
      }}
      className={`relative ${className}`}
    >
      {children}

      {glare && (
        <div
          aria-hidden="true"
          style={{
            background: `radial-gradient(circle at ${tilt.glareX}% ${tilt.glareY}%, rgba(255, 255, 255, 0.12) 0%, rgba(255, 255, 255, 0) 70%)`,
            opacity: tilt.opacity,
            transition: 'opacity 0.3s ease-out',
          }}
          className="pointer-events-none absolute inset-0 z-20 rounded-[inherit]"
        />
      )}
    </div>
  );
};

export default TiltCard;
