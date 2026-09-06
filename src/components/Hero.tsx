import { useEffect, useRef, useState } from 'react';
import { ArrowDown, Github, Linkedin, Mail, MessageCircle } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { profile } from '../data/navigation';
import CvPreview from './CvPreview';

gsap.registerPlugin(ScrollTrigger);

export const Hero = () => {
  const heroRef = useRef<HTMLElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const [glare, setGlare] = useState({ x: 50, y: 50, opacity: 0 });

  const roles = [
    'Teknik Komputer & Jaringan',
    'Hardware & IoT Prototype',
    'FTTH & Network Technician',
    'Production Assembly & QC',
    'Data Entry Specialist',
  ];

  const [roleIndex, setRoleIndex] = useState(0);
  const [displayText, setDisplayText] = useState(roles[0]);
  const [isDeleting, setIsDeleting] = useState(false);

  // Typewriter effect
  useEffect(() => {
    const currentRole = roles[roleIndex];
    let timeout: NodeJS.Timeout;

    if (!isDeleting && displayText === currentRole) {
      timeout = setTimeout(() => setIsDeleting(true), 2400);
    } else if (isDeleting && displayText === '') {
      setIsDeleting(false);
      setRoleIndex((prev) => (prev + 1) % roles.length);
    } else {
      const speed = isDeleting ? 30 : 60;
      timeout = setTimeout(() => {
        setDisplayText((prev) =>
          isDeleting
            ? currentRole.substring(0, prev.length - 1)
            : currentRole.substring(0, prev.length + 1)
        );
      }, speed);
    }

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, roleIndex, roles]);

  // Entrance & Scroll Animation matching iqmal.dev
  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add(
        {
          isDesktop: '(min-width: 768px)',
          isMobile: '(max-width: 767px)',
          reduceMotion: '(prefers-reduced-motion: reduce)',
        },
        (context) => {
          const { isDesktop, reduceMotion } = context.conditions ?? {};

          if (reduceMotion) {
            gsap.set(
              [
                '.hero-socials a',
                '.location',
                '.greetings',
                '.profile-card',
                '.hero-resume',
                '.hero-scroll-indicator',
              ],
              { clearProps: 'all' }
            );
            return;
          }

          const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

          if (isDesktop) {
            tl.from('.hero-socials a', { opacity: 0, y: -20, stagger: 0.1, duration: 0.8 })
              .from('.location', { opacity: 0, x: -160, duration: 0.7 }, '-=0.6')
              .from('.greetings', { opacity: 0, x: 160, duration: 1.4 }, '-=0.7')
              .from('.profile-card', { scale: 0.88, opacity: 0, duration: 1.1, rotate: 3 }, '-=1.4')
              .from('.hero-resume', { opacity: 0, y: 10, duration: 0.6 }, '-=0.8')
              .from('.hero-scroll-indicator', { opacity: 0, y: 15, duration: 0.9 }, '-=0.8');

            // Parallax exit when scrolling down towards About
            if (heroRef.current) {
              gsap.to(heroRef.current, {
                opacity: 0.35,
                scale: 0.96,
                y: 30,
                ease: 'none',
                scrollTrigger: {
                  trigger: heroRef.current,
                  start: 'bottom 85%',
                  end: 'bottom top',
                  scrub: true,
                },
              });
            }
          } else {
            tl.from('.hero-socials a', { opacity: 0, stagger: 0.08, duration: 0.45 })
              .from('.location', { opacity: 0, duration: 0.4 }, '-=0.25')
              .from('.greetings', { opacity: 0, duration: 0.55 }, '-=0.2')
              .from('.hero-resume', { opacity: 0, duration: 0.35 }, '-=0.1')
              .from('.hero-scroll-indicator', { opacity: 0, duration: 0.35 }, '-=0.15');
          }
        }
      );
    },
    { scope: heroRef }
  );

  // Interactive 3D Cursor Tilt for Desktop View
  const handleCardMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    const clampedX = Math.min(Math.max(x, 0), 1);
    const clampedY = Math.min(Math.max(y, 0), 1);

    const rotX = -9 * (clampedY - 0.5);
    const rotY = 9 * (clampedX - 0.5);

    gsap.to(cardRef.current, {
      rotateX: rotX,
      rotateY: rotY,
      scale: 1.015,
      duration: 0.3,
      ease: 'power2.out',
      transformPerspective: 1200,
    });

    setGlare({ x: clampedX * 100, y: clampedY * 100, opacity: 1 });
  };

  const handleCardMouseLeave = () => {
    if (!cardRef.current) return;
    gsap.to(cardRef.current, {
      rotateX: 0,
      rotateY: 0,
      scale: 1,
      duration: 0.8,
      ease: 'power3.out',
    });
    setGlare((prev) => ({ ...prev, opacity: 0 }));
  };

  return (
    <section
      ref={heroRef}
      id="home"
      aria-label="Beranda Shawava Tritya"
      className="hero-section relative min-h-[calc(100vh-4rem)] grid content-start items-start gap-8 px-6 pb-16 pt-24 sm:gap-10 sm:px-10 sm:pt-28 lg:grid-cols-[minmax(0,1fr)_minmax(340px,0.7fr)] lg:content-center lg:items-center lg:gap-12 lg:px-20 lg:py-12 overflow-hidden bg-[#e8e8e5]"
    >
      {/* Radial dot grid background (exact iqmal.dev) */}
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(rgba(17,17,20,0.06)_1.5px,transparent_1.5px)] [background-size:32px_32px]"
        style={{
          maskImage: 'radial-gradient(ellipse at center, white 40%, transparent 100%)',
          WebkitMaskImage: 'radial-gradient(ellipse at center, white 40%, transparent 100%)',
        }}
      />

      {/* Left Column: Intro & Info */}
      <div className="relative z-10 max-w-3xl">
        {/* Socials Row */}
        <div className="hero-socials mb-4 flex items-center gap-5 sm:mb-5">
          <a
            href={profile.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#111114]/50 hover:text-[#111114] transition-colors"
            aria-label="GitHub"
          >
            <Github size={19} />
          </a>
          <a
            href={profile.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#111114]/50 hover:text-[#111114] transition-colors"
            aria-label="LinkedIn"
          >
            <Linkedin size={19} />
          </a>
          <a
            href={`https://wa.me/${profile.whatsapp}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#111114]/50 hover:text-[#111114] transition-colors"
            aria-label="WhatsApp"
          >
            <MessageCircle size={19} />
          </a>
          <a
            href={`mailto:${profile.email}`}
            className="text-[#111114]/50 hover:text-[#111114] transition-colors"
            aria-label="Email"
          >
            <Mail size={19} />
          </a>
        </div>

        {/* Location tag with pulse indicator */}
        <div className="location flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
          <p className="font-sans text-xs sm:text-sm uppercase tracking-[0.28em] text-[#111114]/60 font-medium">
            Bogor · Indonesia
          </p>
        </div>

        {/* Main Display Headline (exact iqmal.dev proportions) */}
        <h1 className="greetings mt-3 font-serif text-5xl sm:text-7xl lg:text-[5.25rem] xl:text-[6.5rem] leading-[0.95] tracking-tight max-w-[11ch] text-[#111114]">
          Hi, I’m <span className="font-editorial italic font-normal">Shawava.</span>
        </h1>

        {/* Dynamic Typewriter Role */}
        <div className="mt-3 sm:mt-4 min-h-[2.25rem] sm:min-h-[2.75rem] flex items-center">
          <span className="font-sans text-lg sm:text-2xl lg:text-3xl font-light tracking-wide text-[#111114]/80">
            {displayText}
          </span>
          <span className="inline-block w-0.5 h-5 sm:h-7 bg-[#111114] ml-1.5 animate-pulse align-middle" />
        </div>

        {/* Compact Description */}
        <p className="mt-4 max-w-lg text-sm sm:text-base leading-relaxed text-[#111114]/70">
          Lulusan SMK Negeri 1 Cileungsi (TKJ). Berpengalaman merakit prototype IoT berbasis ESP8266/Arduino, praktik instalasi ISP hingga router, serta disiplin kerja manufaktur dan data entry.
        </p>

        {/* Action Button */}
        <div className="hero-resume mt-6 flex items-center gap-4">
          <CvPreview
            className="inline-flex w-fit items-center gap-2 rounded-full border border-[#111114]/15 bg-[#111114] px-6 py-3 font-mono text-xs font-semibold uppercase tracking-[0.18em] text-white transition-all duration-300 hover:bg-[#25252a] hover:scale-105 cursor-pointer shadow-md"
            label="Resume"
            showIcon={true}
          />
        </div>
      </div>

      {/* Right Column: 3D Profile Card (proportional desktop scale) */}
      <div className="profile-card relative z-10 flex w-full justify-center [perspective:1200px] lg:justify-end">
        <div
          ref={cardRef}
          onMouseMove={handleCardMouseMove}
          onMouseLeave={handleCardMouseLeave}
          data-profile-card="true"
          className="relative h-[420px] w-full max-w-[340px] overflow-hidden rounded-[2rem] border border-white/20 bg-[#0b0b0d] will-change-transform sm:h-[480px] sm:max-w-[400px] lg:h-[540px] lg:max-w-[440px] transition-transform duration-300 ease-out"
          style={{
            transformStyle: 'preserve-3d',
            boxShadow: '0 24px 60px rgba(17, 17, 20, 0.22)',
          }}
        >
          {/* Dynamic Specular Glare Overlay */}
          <div
            className="pointer-events-none absolute inset-0 z-30 transition-opacity duration-300"
            style={{
              background: `radial-gradient(circle 360px at ${glare.x}% ${glare.y}%, rgba(255,255,255,0.18), transparent 70%)`,
              opacity: glare.opacity,
            }}
          />

          {/* Background Gradients */}
          <div className="absolute inset-0 rounded-[2rem] bg-[linear-gradient(180deg,rgba(255,255,255,0.12),rgba(255,255,255,0)_34%),linear-gradient(180deg,#25252a_0%,#131418_48%,#050506_100%)]" />
          <div className="absolute inset-x-8 top-8 h-px bg-white/10" />

          {/* Background Code SVG Glyphs */}
          <svg
            viewBox="0 0 16 16"
            fill="none"
            aria-hidden="true"
            className="absolute left-6 top-20 h-16 w-16 -rotate-12 text-white/10"
          >
            <path d="M8 1L6 15L8 15.2L10 1.2L8 1Z" fill="currentColor" />
            <path d="M12.5 11.5L11.1 10.1L13.2 8L11.1 5.9L12.5 4.5L16 8L12.5 11.5Z" fill="currentColor" />
            <path d="M2.8 8L4.9 10.1L3.5 11.5L0 8L3.5 4.5L4.9 5.9L2.8 8Z" fill="currentColor" />
          </svg>

          {/* Profile Photo */}
          <img
            src="/profile.webp"
            alt="Foto Shawava Tritya"
            width={600}
            height={600}
            loading="eager"
            className="absolute inset-0 h-full w-full object-cover object-top rounded-[2rem] grayscale contrast-105 hover:grayscale-0 transition-[filter] duration-700 ease-out"
          />

          {/* Bottom Dark Vignette Fade */}
          <div className="absolute inset-x-0 bottom-0 z-20 h-40 rounded-b-[2rem] bg-gradient-to-t from-[#050506] via-[#050506]/85 to-transparent" />

          {/* Floating Glass Status Pill */}
          <div className="absolute inset-x-4 bottom-4 z-30 flex items-center justify-between gap-3 rounded-2xl border border-white/15 bg-white/[0.08] px-4 py-3 backdrop-blur-md">
            <div>
              <span className="block font-mono text-xs font-semibold text-white/90">
                @shwtrya
              </span>
              <span className="flex items-center gap-1.5 text-[0.72rem] text-white/70">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Available for work!
              </span>
            </div>
            <span className="font-mono text-[10px] uppercase tracking-wider text-white/40">
              Bogor, ID
            </span>
          </div>
        </div>
      </div>

      {/* Scroll Down Indicator matching iqmal.dev */}
      <div className="hero-scroll-indicator absolute bottom-3 sm:bottom-5 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 pointer-events-none opacity-50">
        <div className="w-5 h-7 border border-[#111114]/35 rounded-full flex justify-center p-1">
          <div className="w-1 h-2 bg-[#111114] rounded-full animate-bounce" style={{ animationDuration: '1.8s' }} />
        </div>
        <span className="font-mono text-[8px] uppercase tracking-[0.25em] text-[#111114]/60">Scroll Down</span>
      </div>
    </section>
  );
};

export default Hero;
