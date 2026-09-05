import { useEffect, useState } from 'react';
import { ArrowDown, Github, Linkedin, Mail, MessageCircle } from 'lucide-react';
import { profile } from '../data/navigation';
import CvPreview from './CvPreview';

export const Hero = () => {
  const roles = [
    'Network & IoT Technician',
    'Mikrokontroler & Hardware',
    'Data Entry Specialist',
    'Lulusan SMKN 1 Cileungsi',
  ];

  const [roleIndex, setRoleIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentRole = roles[roleIndex];
    const typingSpeed = isDeleting ? 40 : 80;

    const timer = setTimeout(() => {
      if (!isDeleting) {
        setDisplayText(currentRole.substring(0, displayText.length + 1));
        if (displayText === currentRole) {
          setTimeout(() => setIsDeleting(true), 2000);
        }
      } else {
        setDisplayText(currentRole.substring(0, displayText.length - 1));
        if (displayText === '') {
          setIsDeleting(false);
          setRoleIndex((prev) => (prev + 1) % roles.length);
        }
      }
    }, typingSpeed);

    return () => clearTimeout(timer);
  }, [displayText, isDeleting, roleIndex, roles]);

  return (
    <section
      id="home"
      aria-label="Beranda Shawava Tritya"
      className="hero-section relative min-h-screen grid content-start items-start gap-8 px-6 pb-16 pt-28 sm:gap-10 sm:px-10 sm:pt-32 lg:grid-cols-[minmax(0,1fr)_minmax(360px,0.72fr)] lg:content-center lg:items-center lg:gap-12 lg:px-20 lg:py-12 overflow-hidden"
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
      <div className="relative z-10 max-w-4xl">
        {/* Socials Row */}
        <div className="mb-4 flex items-center gap-5 sm:mb-6">
          <a
            href={profile.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#111114]/50 hover:text-[#111114] transition-colors"
            aria-label="GitHub"
          >
            <Github size={20} />
          </a>
          <a
            href={profile.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#111114]/50 hover:text-[#111114] transition-colors"
            aria-label="LinkedIn"
          >
            <Linkedin size={20} />
          </a>
          <a
            href={`https://wa.me/${profile.whatsapp}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#111114]/50 hover:text-[#111114] transition-colors"
            aria-label="WhatsApp"
          >
            <MessageCircle size={20} />
          </a>
          <a
            href={`mailto:${profile.email}`}
            className="text-[#111114]/50 hover:text-[#111114] transition-colors"
            aria-label="Email"
          >
            <Mail size={20} />
          </a>
        </div>

        {/* Location tag */}
        <p className="font-sans text-xs sm:text-sm uppercase tracking-[0.28em] text-[#111114]/60 font-medium">
          Bogor · Indonesia
        </p>

        {/* Main Display Headline */}
        <h1 className="mt-3 font-serif text-6xl leading-[0.95] tracking-tight sm:text-8xl lg:text-9xl text-[#111114]">
          Hi, I’m <span className="font-editorial italic font-normal">Shawava.</span>
        </h1>

        {/* Dynamic Typewriter Role */}
        <div className="mt-4 sm:mt-5 min-h-[2.5rem] sm:min-h-[3.25rem] flex items-center">
          <span className="font-sans text-xl sm:text-3xl lg:text-4xl font-light tracking-wide text-[#111114]/80">
            {displayText}
          </span>
          <span className="text-type-cursor ml-1 inline-block text-xl sm:text-3xl lg:text-4xl text-[#111114]">
            █
          </span>
        </div>

        {/* Description */}
        <p className="mt-6 max-w-xl text-base sm:text-lg leading-relaxed text-[#111114]/70">
          Lulusan SMK Negeri 1 Cileungsi (TKJ). Berpengalaman merakit prototype IoT berbasis ESP8266/Arduino, praktik instalasi ISP hingga router, serta disiplin kerja dari pengalaman magang produksi dan data entry.
        </p>

        {/* Action Button */}
        <div className="mt-8 flex items-center gap-4">
          <CvPreview
            className="inline-flex w-fit items-center rounded-full border border-[#111114]/15 bg-[#111114] px-6 py-3 font-mono text-xs font-semibold uppercase tracking-[0.18em] text-white transition-all duration-300 hover:bg-transparent hover:text-[#111114] cursor-pointer shadow-md"
            label="Resume"
          />
        </div>
      </div>

      {/* Right Column: 3D Profile Card (matching iqmal.dev) */}
      <div className="relative z-10 flex w-full justify-center [perspective:1200px] lg:justify-end">
        <div
          className="relative h-[460px] w-full max-w-[380px] overflow-hidden rounded-[2rem] border border-white/20 bg-[#0b0b0d] shadow-2xl transition-transform duration-500 ease-out hover:scale-[1.01] sm:h-[540px] sm:max-w-[440px] lg:h-[600px] lg:max-w-[480px]"
          style={{
            transformStyle: 'preserve-3d',
            boxShadow: '0 28px 70px rgba(17, 17, 20, 0.25)',
          }}
        >
          {/* Background Gradients */}
          <div className="absolute inset-0 rounded-[2rem] bg-[linear-gradient(180deg,rgba(255,255,255,0.12),rgba(255,255,255,0)_34%),linear-gradient(180deg,#25252a_0%,#131418_48%,#050506_100%)]" />
          <div className="absolute inset-x-8 top-8 h-px bg-white/10" />

          {/* Background Code SVG Glyphs */}
          <svg
            viewBox="0 0 16 16"
            fill="none"
            aria-hidden="true"
            className="absolute left-6 top-20 h-20 w-20 -rotate-12 text-white/10"
          >
            <path d="M8 1L6 15L8 15.2L10 1.2L8 1Z" fill="currentColor" />
            <path d="M12.5 11.5L11.1 10.1L13.2 8L11.1 5.9L12.5 4.5L16 8L12.5 11.5Z" fill="currentColor" />
            <path d="M2.8 8L4.9 10.1L3.5 11.5L0 8L3.5 4.5L4.9 5.9L2.8 8Z" fill="currentColor" />
          </svg>
          <svg
            viewBox="0 0 16 16"
            fill="none"
            aria-hidden="true"
            className="absolute right-6 top-16 h-24 w-24 rotate-12 text-white/10"
          >
            <path d="M8 1L6 15L8 15.2L10 1.2L8 1Z" fill="currentColor" />
            <path d="M12.5 11.5L11.1 10.1L13.2 8L11.1 5.9L12.5 4.5L16 8L12.5 11.5Z" fill="currentColor" />
            <path d="M2.8 8L4.9 10.1L3.5 11.5L0 8L3.5 4.5L4.9 5.9L2.8 8Z" fill="currentColor" />
          </svg>

          {/* Profile Photo */}
          <img
            src="https://i.ibb.co.com/JWBQMssz/image.png?auto=compress&cs=tinysrgb&dpr=2&h=600&w=600"
            alt="Foto Shawava Tritya"
            width={600}
            height={600}
            className="absolute inset-0 h-full w-full object-cover object-top rounded-[2rem] grayscale contrast-105 hover:grayscale-0 transition-[filter] duration-700 ease-out"
          />

          {/* Bottom Dark Vignette Fade */}
          <div className="absolute inset-x-0 bottom-0 z-20 h-44 rounded-b-[2rem] bg-gradient-to-t from-[#050506] via-[#050506]/85 to-transparent" />

          {/* Floating Glass Status Pill */}
          <div className="absolute inset-x-5 bottom-5 z-30 flex items-center justify-between gap-4 rounded-2xl border border-white/15 bg-white/[0.08] px-5 py-3.5 backdrop-blur-md">
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

      {/* Scroll Down Indicator */}
      <div className="hero-scroll col-span-full mt-4 flex justify-center lg:mt-6 pointer-events-none opacity-50">
        <div className="flex flex-col items-center gap-1.5">
          <div className="w-5 h-8 border border-[#111114]/50 rounded-full flex justify-center p-1">
            <div className="w-1 h-2 bg-[#111114] rounded-full animate-bounce" />
          </div>
          <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-[#111114]/70">
            Scroll Down
          </span>
          <ArrowDown size={12} className="text-[#111114]/60 animate-bounce" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
