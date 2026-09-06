import { useRef } from 'react';
import { Award, Briefcase, Cpu } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

export const About = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const ovalRef = useRef<HTMLDivElement>(null);

  const marqueeSkills = [
    'MikroTik',
    'ESP8266 NodeMCU',
    'Arduino IDE',
    'FTTH & Fiber Optic',
    'LAN & TCP/IP',
    'Cisco Packet Tracer',
    'Data Entry',
    'Sensor DHT11',
    'Relay 4-Channel',
    'Routing & Switching',
    'Wiring & Solder',
    'Quality Control',
  ];

  // Scroll animations for About (dramatic pulled-up dark background curve)
  useGSAP(
    () => {
      // 1. Text lines scrub reveal
      gsap
        .timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 50%',
            end: 'bottom 90%',
            scrub: 1.4,
          },
        })
        .fromTo(
          '.line',
          { opacity: 0, yPercent: 120 },
          {
            opacity: 1,
            yPercent: 0,
            duration: 2.5,
            stagger: { each: 0.4, ease: 'power2.out' },
            ease: 'power3.out',
          },
          '-=0.1'
        );

      // 2. Giant curved oval dynamic stretch - background pulled up over Hero
      if (ovalRef.current && sectionRef.current) {
        gsap.fromTo(
          ovalRef.current,
          { scaleY: 0.15, y: 150 },
          {
            scaleY: 1.85,
            y: -50,
            ease: 'none',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top bottom',
              end: 'top 15%',
              scrub: 1.2,
            },
          }
        );
      }

      // 3. Bento cards desktop stagger reveal
      gsap.fromTo(
        '.bento-stat-card',
        { opacity: 0, y: 50, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.85,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.bento-stat-card',
            start: 'top 85%',
          },
        }
      );
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      id="about"
      aria-labelledby="about-heading"
      className="relative z-20 -mt-16 sm:-mt-24 flex h-fit flex-col items-center justify-center gap-14 sm:gap-16 bg-[#18181c] text-[#f4f4f1] px-6 pb-28 pt-16 sm:pb-36 sm:pt-24"
    >
      {/* Giant curved dark entry oval (pulled up over hero like a rising curtain) */}
      <div
        ref={ovalRef}
        aria-hidden="true"
        className="absolute left-1/2 -top-28 sm:-top-44 h-[220px] sm:h-[320px] w-[140vw] -translate-x-1/2 rounded-[50%] bg-[#18181c] pointer-events-none will-change-transform z-10"
      />

      <h2 id="about-heading" className="sr-only">
        Tentang Shawava Tritya
      </h2>

      {/* Kicker */}
      <p className="relative z-20 font-mono text-[0.65rem] sm:text-[0.68rem] uppercase tracking-[0.3em] text-white/50">
        About &amp; Overview
      </p>

      {/* Big Statement Typography with scrub line reveals */}
      <div className="relative z-20 max-w-5xl text-center font-sans text-[clamp(1.65rem,3.5vw,3.4rem)] leading-[1.25] tracking-[-0.035em] text-white/70">
        <div className="overflow-hidden py-1">
          <p className="line will-change-transform">
            <span>Saya merancang </span>
            <span className="font-semibold text-white">
              solusi jaringan &amp; perangkat keras IoT
            </span>
          </p>
        </div>
        <div className="overflow-hidden py-1">
          <p className="line will-change-transform">
            <span>dengan </span>
            <span className="font-semibold text-white">eksekusi disiplin</span>
            <span>, </span>
            <span className="font-semibold text-white">infrastruktur andal</span>
            <span>, dan </span>
            <span className="font-semibold text-white">alur kerja terstruktur</span>
          </p>
        </div>
        <div className="overflow-hidden py-1">
          <p className="line will-change-transform">
            <span>—membantu tim mewujudkan sistem teknis yang efisien dan siap pakai.</span>
          </p>
        </div>
      </div>

      {/* Embedded Marquee Ticker with Mask (exact iqmal.dev setup) */}
      <div
        className="relative z-20 w-full max-w-7xl overflow-hidden border-y border-white/10 py-5 group cursor-pointer"
        style={{
          maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)',
          WebkitMaskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)',
        }}
      >
        <div className="animate-marquee flex gap-12 sm:gap-16 font-mono text-xs uppercase tracking-[0.25em] text-white/85 font-medium select-none group-hover:[animation-play-state:paused]">
          {marqueeSkills.concat(marqueeSkills).map((skill, index) => (
            <div key={index} className="flex items-center gap-4 sm:gap-6 shrink-0">
              <span>{skill}</span>
              <span className="text-white/30 text-sm">✦</span>
            </div>
          ))}
        </div>
      </div>

      {/* Bento Stats Row */}
      <div className="relative z-20 grid grid-cols-1 sm:grid-cols-3 gap-6 w-full max-w-7xl text-left">
        <div className="bento-stat-card group rounded-2xl border border-white/10 bg-white/[0.035] p-6 sm:p-8 backdrop-blur-sm transition-all duration-300 hover:-translate-y-2 hover:border-white/30 hover:bg-white/[0.07] hover:shadow-[0_20px_40px_rgba(0,0,0,0.5)]">
          <div className="flex items-center gap-3 text-white/40 mb-3 group-hover:text-emerald-400 transition-colors">
            <Award size={18} />
            <span className="font-mono text-[0.65rem] tracking-[0.2em] uppercase">
              Pendidikan
            </span>
          </div>
          <div className="font-editorial text-4xl sm:text-5xl font-bold text-white italic">
            85 / 100
          </div>
          <p className="mt-2 text-xs sm:text-sm text-white/60 leading-relaxed group-hover:text-white/80 transition-colors">
            Nilai rata-rata Ijazah SMK Negeri 1 Cileungsi kompetensi Teknik Komputer dan Jaringan.
          </p>
        </div>

        <div className="bento-stat-card group rounded-2xl border border-white/10 bg-white/[0.035] p-6 sm:p-8 backdrop-blur-sm transition-all duration-300 hover:-translate-y-2 hover:border-white/30 hover:bg-white/[0.07] hover:shadow-[0_20px_40px_rgba(0,0,0,0.5)]">
          <div className="flex items-center gap-3 text-white/40 mb-3 group-hover:text-amber-400 transition-colors">
            <Briefcase size={18} />
            <span className="font-mono text-[0.65rem] tracking-[0.2em] uppercase">
              Pengalaman
            </span>
          </div>
          <div className="font-editorial text-4xl sm:text-5xl font-bold text-white italic">
            3+ Peran
          </div>
          <p className="mt-2 text-xs sm:text-sm text-white/60 leading-relaxed group-hover:text-white/80 transition-colors">
            Magang industri manufaktur di PT Rekadaya &amp; PT Serin, serta freelance data entry.
          </p>
        </div>

        <div className="bento-stat-card group rounded-2xl border border-white/10 bg-white/[0.035] p-6 sm:p-8 backdrop-blur-sm transition-all duration-300 hover:-translate-y-2 hover:border-white/30 hover:bg-white/[0.07] hover:shadow-[0_20px_40px_rgba(0,0,0,0.5)]">
          <div className="flex items-center gap-3 text-white/40 mb-3 group-hover:text-sky-400 transition-colors">
            <Cpu size={18} />
            <span className="font-mono text-[0.65rem] tracking-[0.2em] uppercase">
              Kompetensi
            </span>
          </div>
          <div className="font-editorial text-4xl sm:text-5xl font-bold text-white italic">
            100% Praktik
          </div>
          <p className="mt-2 text-xs sm:text-sm text-white/60 leading-relaxed group-hover:text-white/80 transition-colors">
            Fokus hands-on: perakitan prototype mikrokontroler, instalasi FTTH, &amp; router mikrotik.
          </p>
        </div>
      </div>
    </section>
  );
};

export default About;
