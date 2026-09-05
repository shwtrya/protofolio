import { useEffect, useState } from 'react';
import { ArrowDown, ArrowUpRight, Github, Linkedin, Mail, MapPin, MessageCircle } from 'lucide-react';
import { profile } from '../data/navigation';
import { scrollToSectionById } from '../utils/scrollToSection';
import CvPreview from './CvPreview';

const roles = [
  'Network & IoT Technician',
  'Hardware & Mikrokontroler Enthusiast',
  'Data Entry Specialist',
  'Lulusan SMKN 1 Cileungsi',
];

export const Hero = () => {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  // Typewriter effect
  useEffect(() => {
    const currentRole = roles[roleIndex];
    let timeout: NodeJS.Timeout;

    if (!isDeleting && displayedText !== currentRole) {
      timeout = setTimeout(() => {
        setDisplayedText(currentRole.slice(0, displayedText.length + 1));
      }, 70);
    } else if (!isDeleting && displayedText === currentRole) {
      timeout = setTimeout(() => {
        setIsDeleting(true);
      }, 2400);
    } else if (isDeleting && displayedText !== '') {
      timeout = setTimeout(() => {
        setDisplayedText(currentRole.slice(0, displayedText.length - 1));
      }, 35);
    } else if (isDeleting && displayedText === '') {
      setIsDeleting(false);
      setRoleIndex((prev) => (prev + 1) % roles.length);
    }

    return () => clearTimeout(timeout);
  }, [displayedText, isDeleting, roleIndex]);

  return (
    <section
      id="home"
      aria-label="Beranda"
      className="relative min-h-[92vh] flex flex-col justify-between pt-28 pb-10 sm:pt-36 sm:pb-14 lg:pt-40 lg:pb-16 overflow-hidden"
    >
      <div className="container-responsive flex-1 flex flex-col justify-center">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Greeting, dynamic role, details, CTA */}
          <div className="lg:col-span-7 flex flex-col items-start z-10">
            {/* Top social pill row */}
            <div className="flex items-center gap-3 mb-6">
              <a
                href={profile.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-foreground/15 bg-background/60 text-foreground transition-all hover:bg-foreground hover:text-background"
                aria-label="GitHub Shawava"
              >
                <Github size={16} />
              </a>
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-foreground/15 bg-background/60 text-foreground transition-all hover:bg-foreground hover:text-background"
                aria-label="LinkedIn Shawava"
              >
                <Linkedin size={16} />
              </a>
              <a
                href={`https://wa.me/${profile.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-foreground/15 bg-background/60 text-foreground transition-all hover:bg-foreground hover:text-background"
                aria-label="WhatsApp Shawava"
              >
                <MessageCircle size={16} />
              </a>
              <a
                href={`mailto:${profile.email}`}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-foreground/15 bg-background/60 text-foreground transition-all hover:bg-foreground hover:text-background"
                aria-label="Email Shawava"
              >
                <Mail size={16} />
              </a>

              <div className="h-4 w-px bg-foreground/15 mx-1" />

              <div className="flex items-center gap-1.5 font-mono text-[0.68rem] tracking-[0.2em] text-foreground/60 uppercase">
                <MapPin size={13} className="text-foreground/70" />
                <span>BOGOR · INDONESIA</span>
              </div>
            </div>

            {/* Giant Greeting */}
            <h1 className="text-5xl sm:text-7xl lg:text-8xl font-extrabold tracking-[-0.04em] text-foreground leading-[1.02]">
              Hi, I’m{' '}
              <span className="font-editorial font-normal italic inline-block pr-2">
                Shawava.
              </span>
            </h1>

            {/* Dynamic Typewriter Role */}
            <div className="mt-4 sm:mt-5 min-h-[2.5rem] flex items-center">
              <p className="font-mono text-base sm:text-xl lg:text-2xl font-medium tracking-tight text-foreground/80">
                {displayedText}
                <span className="inline-block animate-cursor text-foreground ml-1 font-mono font-bold">
                  █
                </span>
              </p>
            </div>

            {/* Concise Bio / Summary */}
            <p className="mt-6 max-w-xl text-base sm:text-lg text-foreground/70 leading-relaxed">
              Lulusan SMK Negeri 1 Cileungsi (TKJ). Berpengalaman merakit prototype IoT berbasis ESP8266/Arduino, praktik instalasi ISP hingga router, serta disiplin kerja dari pengalaman magang produksi dan data entry.
            </p>

            {/* Action Buttons */}
            <div className="mt-8 sm:mt-10 flex flex-wrap items-center gap-4">
              <CvPreview
                className="btn-pill btn-pill-dark"
                label="RESUME"
              />

              <button
                type="button"
                onClick={() => scrollToSectionById('contact')}
                className="btn-pill btn-pill-outline"
              >
                <span>HUBUNGI SAYA</span>
                <ArrowUpRight size={16} />
              </button>
            </div>
          </div>

          {/* Right Column: 3D-styled Dark Card with Photo */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end z-10">
            <div className="relative w-full max-w-sm sm:max-w-md aspect-[4/5] rounded-[2.5rem] p-3 border border-foreground/15 bg-[#0e0e11] shadow-2xl group overflow-hidden">
              {/* Circuit / Tech decorative watermark behind image */}
              <div
                aria-hidden="true"
                className="absolute inset-0 opacity-10 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none"
              />

              {/* Photo wrapper */}
              <div className="relative h-full w-full rounded-[2rem] overflow-hidden bg-[#18181c]">
                <img
                  src="https://i.ibb.co.com/JWBQMssz/image.png?auto=compress&cs=tinysrgb&dpr=2&h=400&w=400"
                  alt="Shawava Tritya"
                  width={500}
                  height={625}
                  className="h-full w-full object-cover object-center grayscale contrast-105 transition-all duration-700 group-hover:grayscale-0 group-hover:scale-105"
                  loading="eager"
                />

                {/* Bottom dark vignette */}
                <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#0e0e11] via-[#0e0e11]/60 to-transparent pointer-events-none" />

                {/* Floating Glass Pill Badge */}
                <div className="absolute inset-x-4 bottom-4 flex items-center justify-between rounded-2xl border border-white/20 bg-black/60 px-4 py-3 backdrop-blur-md">
                  <div className="flex flex-col">
                    <span className="font-mono text-xs font-semibold text-white tracking-wide">
                      @shwtrya
                    </span>
                    <span className="font-mono text-[0.62rem] text-white/50 tracking-wider">
                      SHAWAVA TRITYA
                    </span>
                  </div>

                  <div className="flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1">
                    <span className="relative flex h-2 w-2">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                      <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
                    </span>
                    <span className="font-mono text-[0.62rem] font-semibold uppercase tracking-wider text-emerald-300">
                      Available for work!
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Scroll Indicator */}
      <div className="mt-12 flex flex-col items-center justify-center gap-2">
        <button
          type="button"
          onClick={() => scrollToSectionById('about')}
          className="group flex flex-col items-center gap-2 font-mono text-[0.65rem] tracking-[0.25em] text-foreground/50 hover:text-foreground transition-colors"
          aria-label="Scroll ke bagian Tentang"
        >
          <span>SCROLL DOWN</span>
          <div className="flex h-7 w-4 items-start justify-center rounded-full border border-foreground/30 p-1">
            <div className="h-1.5 w-1 rounded-full bg-foreground/60 animate-bounce" />
          </div>
        </button>
      </div>
    </section>
  );
};

export default Hero;
