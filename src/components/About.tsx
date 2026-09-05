import { Award, Briefcase, Cpu } from 'lucide-react';

export const About = () => {
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

  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="relative flex h-fit flex-col items-center justify-center gap-14 sm:gap-16 bg-[#18181c] text-[#f4f4f1] px-6 pb-28 pt-20 sm:pb-36 sm:pt-28"
    >
      {/* Giant curved dark entry oval (exact iqmal.dev) */}
      <div
        aria-hidden="true"
        className="absolute left-1/2 -top-24 sm:-top-32 h-[160px] sm:h-[180px] w-[130vw] -translate-x-1/2 rounded-[50%] bg-[#18181c] pointer-events-none"
      />

      <h2 id="about-heading" className="sr-only">
        Tentang Shawava Tritya
      </h2>

      {/* Kicker */}
      <p
        data-aos="fade-up"
        className="font-mono text-[0.65rem] sm:text-[0.68rem] uppercase tracking-[0.3em] text-white/50"
      >
        About &amp; Overview
      </p>

      {/* Big Statement Typography */}
      <p
        data-aos="fade-up"
        data-aos-delay="100"
        className="max-w-5xl text-center font-sans text-[clamp(1.65rem,3.5vw,3.4rem)] leading-[1.2] tracking-[-0.035em] text-white/70"
      >
        <span>Saya merancang </span>
        <span className="font-semibold text-white">
          solusi jaringan &amp; perangkat keras IoT
        </span>
        <span> dengan </span>
        <span className="font-semibold text-white">eksekusi disiplin</span>
        <span>, </span>
        <span className="font-semibold text-white">infrastruktur andal</span>
        <span>, dan </span>
        <span className="font-semibold text-white">alur kerja terstruktur</span>
        <span>—membantu tim mewujudkan sistem teknis yang efisien dan siap pakai.</span>
      </p>

      {/* Embedded Marquee Ticker with Mask (exact iqmal.dev setup) */}
      <div
        data-aos="fade-up"
        data-aos-delay="150"
        className="relative z-10 w-full max-w-7xl overflow-hidden border-y border-white/10 py-5"
        style={{
          maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)',
          WebkitMaskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)',
        }}
      >
        <div className="animate-marquee flex gap-12 sm:gap-16 font-mono text-xs uppercase tracking-[0.25em] text-white/85 font-medium select-none">
          {marqueeSkills.concat(marqueeSkills).map((skill, index) => (
            <div key={index} className="flex items-center gap-4 sm:gap-6 shrink-0">
              <span>{skill}</span>
              <span className="text-white/30 text-sm">✦</span>
            </div>
          ))}
        </div>
      </div>

      {/* Bento Stats Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 w-full max-w-7xl text-left">
        <div
          data-aos="fade-up"
          data-aos-delay="200"
          className="rounded-2xl border border-white/10 bg-white/[0.035] p-6 sm:p-8 backdrop-blur-sm transition-all duration-300 hover:border-white/25 hover:bg-white/[0.05]"
        >
          <div className="flex items-center gap-3 text-white/40 mb-3">
            <Award size={18} />
            <span className="font-mono text-[0.65rem] tracking-[0.2em] uppercase">
              Pendidikan
            </span>
          </div>
          <div className="font-editorial text-4xl sm:text-5xl font-bold text-white italic">
            85 / 100
          </div>
          <p className="mt-2 text-xs sm:text-sm text-white/60 leading-relaxed">
            Nilai rata-rata Ijazah SMK Negeri 1 Cileungsi kompetensi Teknik Komputer dan Jaringan.
          </p>
        </div>

        <div
          data-aos="fade-up"
          data-aos-delay="300"
          className="rounded-2xl border border-white/10 bg-white/[0.035] p-6 sm:p-8 backdrop-blur-sm transition-all duration-300 hover:border-white/25 hover:bg-white/[0.05]"
        >
          <div className="flex items-center gap-3 text-white/40 mb-3">
            <Briefcase size={18} />
            <span className="font-mono text-[0.65rem] tracking-[0.2em] uppercase">
              Pengalaman
            </span>
          </div>
          <div className="font-editorial text-4xl sm:text-5xl font-bold text-white italic">
            3+ Peran
          </div>
          <p className="mt-2 text-xs sm:text-sm text-white/60 leading-relaxed">
            Magang industri manufaktur di PT Rekadaya &amp; PT Serin, serta freelance data entry.
          </p>
        </div>

        <div
          data-aos="fade-up"
          data-aos-delay="400"
          className="rounded-2xl border border-white/10 bg-white/[0.035] p-6 sm:p-8 backdrop-blur-sm transition-all duration-300 hover:border-white/25 hover:bg-white/[0.05]"
        >
          <div className="flex items-center gap-3 text-white/40 mb-3">
            <Cpu size={18} />
            <span className="font-mono text-[0.65rem] tracking-[0.2em] uppercase">
              Kompetensi
            </span>
          </div>
          <div className="font-editorial text-4xl sm:text-5xl font-bold text-white italic">
            100% Praktik
          </div>
          <p className="mt-2 text-xs sm:text-sm text-white/60 leading-relaxed">
            Fokus hands-on: perakitan prototype mikrokontroler, instalasi FTTH, &amp; router mikrotik.
          </p>
        </div>
      </div>
    </section>
  );
};

export default About;
