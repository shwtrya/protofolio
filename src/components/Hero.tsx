import { ArrowUpRight, Github, Linkedin, Mail, MapPin } from 'lucide-react';
import { profile } from '../data/navigation';
import { scrollToSectionById } from '../utils/scrollToSection';
import { Parallax } from './ui/Scroll3D';
import CvPreview from './CvPreview';

export const Hero = () => {
  return (
    <section id="home" className="depth-stage relative pt-24 pb-14 sm:pt-28 sm:pb-16 md:pt-36 md:pb-24">
      {/* Depth layer: technical grid that drifts slower than the content */}
      <Parallax className="depth-grid" speed={0.4} fade aria-hidden="true">
        <span />
      </Parallax>

      <div className="container-responsive relative">
        {/* Availability status line */}
        <div className="status-pill">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
          </span>
          <span className="t-mono t-mono-accent">SIAP MAGANG / KERJA TEKNIS</span>
        </div>

        {/* Main headline */}
        <h1 className="t-display mt-6 max-w-4xl">Shawava Tritya</h1>

        <p className="mt-4 text-xl font-semibold text-fg sm:text-2xl">
          Lulusan TKJ — Fokus pada Jaringan, Mikrokontroler, Hardware &amp; IoT
        </p>

        <p className="t-lead mt-6 max-w-2xl">
          SMK Negeri 1 Cileungsi (Nilai Ijazah: 85). Berpengalaman merakit prototype IoT berbasis ESP8266/Arduino, praktik instalasi ISP hingga router, serta disiplin kerja dari pengalaman magang produksi dan data entry.
        </p>

        {/* Technical quick-facts strip */}
        <div className="mt-7 flex flex-col gap-2 text-sm text-muted sm:mt-8 sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-6 sm:gap-y-2">
          <div className="flex items-center gap-1.5">
            <MapPin size={16} className="text-accent" />
            <span>{profile.location}</span>
          </div>
          <div className="flex items-center gap-1.5 font-mono text-[0.8125rem]">
            <span className="font-semibold text-accent">NET:</span>
            <span>LAN · FTTH · Router Config</span>
          </div>
          <div className="flex items-center gap-1.5 font-mono text-[0.8125rem]">
            <span className="font-semibold text-accent">HW:</span>
            <span>ESP8266 · Arduino · Relay · Sensor</span>
          </div>
        </div>

        {/* Action CTAs — full-width stack on phones, inline from sm up */}
        <div className="mt-9 grid gap-2.5 sm:mt-10 sm:flex sm:flex-wrap sm:items-center sm:gap-3">
          <button
            type="button"
            onClick={() => scrollToSectionById('projects')}
            className="btn btn-primary btn-lg w-full sm:w-auto"
          >
            Lihat Proyek
            <ArrowUpRight size={18} />
          </button>

          <CvPreview className="btn btn-secondary btn-lg w-full sm:w-auto" />

          <button
            type="button"
            onClick={() => scrollToSectionById('contact')}
            className="btn btn-ghost btn-lg w-full sm:w-auto"
          >
            <Mail size={18} />
            Hubungi Saya
          </button>
        </div>

        {/* External links */}
        <div className="mt-9 flex flex-wrap items-center gap-3 border-t border-line pt-6 sm:mt-10">
          <span className="t-mono text-faint">PROFIL:</span>
          <a
            href={profile.github}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-icon"
            aria-label="GitHub Shawava Tritya"
          >
            <Github size={18} />
          </a>
          <a
            href={profile.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-icon"
            aria-label="LinkedIn Shawava Tritya"
          >
            <Linkedin size={18} />
          </a>
          <a
            href={`mailto:${profile.email}`}
            className="btn-icon"
            aria-label="Email Shawava Tritya"
          >
            <Mail size={18} />
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;
