import { useEffect, useRef, useState } from 'react';
import { Github, Linkedin, Mail, MessageCircle } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { profile } from '../data/navigation';
import CvPreview from './CvPreview';

gsap.registerPlugin(ScrollTrigger);

export const Hero = () => {
  const heroRef = useRef<HTMLElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  // 3D Tilt state
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 });
  const [isHovered, setIsHovered] = useState(false);

  const roles = [
    'Teknik Komputer & Jaringan',
    'IoT & Hardware Specialist',
    'IT Support & Networking',
    'Data Entry Specialist',
  ];

  // Typewriter effect
  useEffect(() => {
    const currentRole = roles[currentRoleIndex];
    const typeSpeed = isDeleting ? 30 : 60;
    const pauseTime = isDeleting ? 400 : 2000;

    const timer = setTimeout(() => {
      if (!isDeleting && displayText === currentRole) {
        setTimeout(() => setIsDeleting(true), pauseTime);
      } else if (isDeleting && displayText === '') {
        setIsDeleting(false);
        setCurrentRoleIndex((prev) => (prev + 1) % roles.length);
      } else {
        const nextText = isDeleting
          ? currentRole.substring(0, displayText.length - 1)
          : currentRole.substring(0, displayText.length + 1);
        setDisplayText(nextText);
      }
    }, typeSpeed);

    return () => clearTimeout(timer);
  }, [displayText, isDeleting, currentRoleIndex]);

  // Exact iqmal.dev GSAP matchMedia Entrance Animation
  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add('(min-width: 1024px)', () => {
        const tl = gsap.timeline();
        tl.from('.hero-socials', {
          y: -20,
          opacity: 0,
          duration: 0.8,
          ease: 'power3.out',
        })
          .from(
            '.location',
            {
              x: -200,
              opacity: 0,
              duration: 1,
              ease: 'power3.out',
            },
            '-=0.6'
          )
          .from(
            '.greetings',
            {
              x: -200,
              opacity: 0,
              duration: 1,
              ease: 'power3.out',
            },
            '-=0.8'
          )
          .from(
            '.role',
            {
              x: -200,
              opacity: 0,
              duration: 1,
              ease: 'power3.out',
            },
            '-=0.8'
          )
          .from(
            '.hero-resume',
            {
              x: -200,
              opacity: 0,
              duration: 1,
              ease: 'power3.out',
            },
            '-=0.8'
          )
          .from(
            '.profile-card',
            {
              x: 200,
              opacity: 0,
              duration: 1.2,
              ease: 'power3.out',
            },
            '-=1'
          );
      });

      mm.add('(max-width: 1023px)', () => {
        const tl = gsap.timeline();
        tl.from('.hero-socials', { y: -20, opacity: 0, duration: 0.8, ease: 'power3.out' })
          .from('.location', { y: 20, opacity: 0, duration: 0.8, ease: 'power3.out' }, '-=0.6')
          .from('.greetings', { y: 30, opacity: 0, duration: 0.8, ease: 'power3.out' }, '-=0.6')
          .from('.role', { y: 20, opacity: 0, duration: 0.8, ease: 'power3.out' }, '-=0.6')
          .from('.hero-resume', { y: 20, opacity: 0, duration: 0.8, ease: 'power3.out' }, '-=0.6')
          .from('.profile-card', { y: 40, opacity: 0, duration: 0.8, ease: 'power3.out' }, '-=0.6');
      });
    },
    { scope: heroRef }
  );

  // Realtime 3D tilt calculations
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    setMousePos({ x, y });
  };

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => {
    setIsHovered(false);
    setMousePos({ x: 0.5, y: 0.5 });
  };

  const rotateY = isHovered ? (mousePos.x - 0.5) * 20 : 0;
  const rotateX = isHovered ? (0.5 - mousePos.y) * 20 : 0;
  const glareX = mousePos.x * 100;
  const glareY = mousePos.y * 100;

  return (
    <section
      ref={heroRef}
      id="home"
      aria-label="Pengenalan Shawava Tritya"
      className="hero-section relative grid min-h-screen lg:h-screen lg:min-h-[720px] lg:max-h-[960px] content-start items-start gap-8 px-6 pb-12 pt-24 sm:gap-10 sm:px-10 sm:pt-28 lg:grid-cols-[minmax(0,1fr)_minmax(360px,0.7fr)] lg:content-center lg:items-center lg:gap-12 lg:px-24 lg:py-0 overflow-hidden"
    >
      {/* Background Dot Grid */}
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(rgba(17,17,20,0.05)_1.5px,transparent_1.5px)] [background-size:32px_32px]"
        style={{
          maskImage: 'radial-gradient(ellipse at center, white 40%, transparent 100%)',
          WebkitMaskImage: 'radial-gradient(ellipse at center, white 40%, transparent 100%)',
        }}
      />

      {/* LEFT COLUMN: Identity & Bio */}
      <div className="relative z-10 max-w-4xl">
        {/* Social Icons */}
        <div className="hero-socials mb-4 flex items-center gap-6 sm:mb-5 lg:mb-6">
          <a
            href={profile.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#111114]/45 hover:text-[#111114] transition-colors duration-300"
            aria-label="GitHub"
          >
            <Github className="h-5 w-5" />
          </a>
          <a
            href={profile.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#111114]/45 hover:text-[#111114] transition-colors duration-300"
            aria-label="LinkedIn"
          >
            <Linkedin className="h-5 w-5" />
          </a>
          <a
            href={`mailto:${profile.email}`}
            className="text-[#111114]/45 hover:text-[#111114] transition-colors duration-300"
            aria-label="Email"
          >
            <Mail className="h-5 w-5" />
          </a>
          <a
            href="https://wa.me/6285883281031"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#111114]/45 hover:text-[#111114] transition-colors duration-300"
            aria-label="WhatsApp"
          >
            <MessageCircle className="h-5 w-5" />
          </a>
        </div>

        {/* Location Tag */}
        <p className="location font-sans text-sm uppercase tracking-[0.28em] text-[#111114]/60">
          Bogor · Indonesia
        </p>

        {/* Main Display Headline */}
        <h1 className="greetings mt-4 min-h-[4.5rem] max-w-[11ch] font-serif text-6xl leading-none sm:mt-5 sm:min-h-[7rem] sm:text-8xl lg:min-h-[8.5rem] lg:text-[5.5rem] xl:text-9xl text-[#111114]">
          Hi, I’m <span className="italic">Shawava.</span>
        </h1>

        {/* Dynamic Typewriter Role */}
        <div className="inline-block">
          <div
            className="inline-block whitespace-pre-wrap tracking-tight role mt-1 block min-h-[2rem] min-w-[18ch] whitespace-nowrap text-xl font-thin leading-tight tracking-[0.06em] sm:mt-2 sm:min-h-[3rem] sm:text-3xl lg:mt-3 lg:min-h-[3.5rem] lg:text-4xl xl:text-5xl text-[#111114]"
            aria-label="Spesialisasi Teknis"
          >
            <span className="inline text-[#111114]">{displayText}</span>
            <span
              className="text-type-cursor ml-1 inline-block text-[#111114] font-normal"
              style={{ animationDuration: '0.6s' }}
            >
              |
            </span>
          </div>
        </div>

        {/* Action Button */}
        <div className="hero-resume mt-4 flex sm:mt-5 lg:mt-6">
          <CvPreview
            className="inline-flex w-fit items-center rounded-full border border-[#111114]/15 bg-[#111114] px-5 py-3 font-mono text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-white transition-colors duration-300 hover:bg-transparent hover:text-[#111114] cursor-pointer shadow-sm"
            label="Resume"
            showIcon={true}
          />
        </div>
      </div>

      {/* RIGHT COLUMN: 3D Interactive Tilt Profile Card */}
      <div className="profile-card relative z-10 flex w-full justify-center [perspective:1200px] lg:justify-end">
        <div
          ref={cardRef}
          onMouseMove={handleMouseMove}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          data-profile-card="true"
          className="relative h-[440px] w-full max-w-[360px] overflow-hidden rounded-[2rem] border border-white/18 bg-[#0b0b0d] will-change-transform sm:h-[500px] sm:max-w-[420px] lg:h-[560px] lg:max-w-[460px] xl:h-[600px] xl:max-w-[490px]"
          style={{
            transformStyle: 'preserve-3d',
            transform: isHovered
              ? `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`
              : 'rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)',
            transition: isHovered
              ? 'transform 0.1s cubic-bezier(0.1, 0.4, 0.2, 1)'
              : 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
            boxShadow: isHovered
              ? '0 35px 80px rgba(17, 17, 20, 0.3)'
              : '0 28px 70px rgba(17, 17, 20, 0.18)',
          }}
        >
          {/* Card background layers */}
          <div className="absolute inset-0 rounded-[2rem] bg-[linear-gradient(180deg,rgba(255,255,255,0.12),rgba(255,255,255,0)_34%),linear-gradient(180deg,#25252a_0%,#131418_48%,#050506_100%)]" />
          <div className="absolute inset-x-8 top-8 h-px bg-white/10" />

          {/* Decorative Technical Schematics SVGs (exact iqmal.dev overlay) */}
          <svg
            viewBox="0 0 16 16"
            fill="none"
            aria-hidden="true"
            className="size-8 absolute left-8 top-24 z-20 h-20 w-20 -rotate-12 text-white/25 pointer-events-none"
          >
            <path
              d="M8.01 0.86L6.01 14.86L7.99 15.14L9.99 1.14L8.01 0.86Z"
              fill="currentColor"
            />
            <path
              d="M12.5 11.5L11.08 10.08L13.17 8L11.08 5.91L12.5 4.5L16 8L12.5 11.5Z"
              fill="currentColor"
            />
            <path
              d="M2.83 8L4.91 10.08L3.5 11.5L0 8L3.5 4.5L4.91 5.91L2.83 8Z"
              fill="currentColor"
            />
          </svg>

          <svg
            viewBox="0 0 16 16"
            fill="none"
            aria-hidden="true"
            className="size-8 absolute right-8 top-16 z-20 h-24 w-24 rotate-12 text-white/25 pointer-events-none"
          >
            <path
              d="M8.01 0.86L6.01 14.86L7.99 15.14L9.99 1.14L8.01 0.86Z"
              fill="currentColor"
            />
            <path
              d="M12.5 11.5L11.08 10.08L13.17 8L11.08 5.91L12.5 4.5L16 8L12.5 11.5Z"
              fill="currentColor"
            />
            <path
              d="M2.83 8L4.91 10.08L3.5 11.5L0 8L3.5 4.5L4.91 5.91L2.83 8Z"
              fill="currentColor"
            />
          </svg>

          {/* Photo */}
          <img
            src="/profile.webp"
            alt="Shawava Tritya"
            width={520}
            height={640}
            loading="eager"
            className="relative z-10 h-full w-full object-cover object-[50%_25%] rounded-[2rem] grayscale contrast-105 transition-all duration-700 hover:grayscale-0"
            style={{
              position: 'absolute',
              height: '100%',
              width: '100%',
              left: 0,
              top: 0,
              right: 0,
              bottom: 0,
            }}
          />

          {/* Gradient fade at bottom */}
          <div className="absolute inset-x-0 bottom-0 z-20 h-40 rounded-b-[2rem] bg-gradient-to-t from-[#050506] via-[#050506]/80 to-transparent" />

          {/* Specular Glare */}
          {isHovered && (
            <div
              className="pointer-events-none absolute inset-0 z-20 rounded-[2rem] transition-opacity duration-300"
              style={{
                background: `radial-gradient(circle 350px at ${glareX}% ${glareY}%, rgba(255, 255, 255, 0.16) 0%, rgba(255, 255, 255, 0) 70%)`,
                mixBlendMode: 'overlay',
              }}
            />
          )}

          {/* Floating Availability Badge */}
          <div className="absolute inset-x-5 bottom-5 z-30 flex items-center justify-between gap-4 rounded-2xl border border-white/12 bg-white/[0.075] px-5 py-4 text-white shadow-[0_16px_40px_rgba(0,0,0,0.24)] backdrop-blur-md">
            <div>
              <p className="text-sm font-semibold leading-none text-white">@shwtrya</p>
              <p className="mt-2 text-sm leading-none text-white/60">Available for work!</p>
            </div>
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-400 shadow-[0_0_14px_rgba(52,211,153,0.8)] animate-pulse" />
          </div>
        </div>
      </div>

      {/* Scroll Down Indicator matching iqmal.dev */}
      <div className="hero-scroll-indicator absolute bottom-5 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 pointer-events-none opacity-45">
        <div className="w-5 h-8 border border-[#111114]/50 rounded-full flex justify-center p-1">
          <div
            className="w-1 h-2 bg-[#111114] rounded-full animate-bounce"
            style={{ animationDuration: '1.8s' }}
          />
        </div>
        <div className="flex flex-col items-center gap-1">
          <span className="font-mono text-[8px] uppercase tracking-[0.25em] text-[#111114]/65">
            Scroll Down
          </span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="10"
            height="10"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-2.5 w-2.5 animate-bounce text-[#111114]/50"
            style={{ animationDuration: '1.5s' }}
          >
            <path d="M12 5v14M19 12l-7 7-7-7" />
          </svg>
        </div>
      </div>
    </section>
  );
};

export default Hero;
