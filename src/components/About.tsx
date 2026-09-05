import { Award, Briefcase, CheckCircle2, Cpu } from 'lucide-react';

export const About = () => {
  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="relative z-20 bg-[#18181c] text-[#f4f4f1] px-6 pt-24 pb-20 sm:px-10 sm:pt-32 sm:pb-28 lg:px-20 curved-dark-entry shadow-[0_-25px_50px_rgba(0,0,0,0.2)]"
    >
      <h2 id="about-heading" className="sr-only">
        Tentang Shawava Tritya
      </h2>

      <div className="relative z-10 mx-auto max-w-5xl flex flex-col items-center text-center">
        {/* Kicker */}
        <p className="font-mono text-[0.68rem] uppercase tracking-[0.3em] text-white/50">
          PHILOSOPHY & BACKGROUND
        </p>

        {/* Big Statement Typography */}
        <p className="mt-8 text-2xl sm:text-4xl lg:text-5xl font-medium leading-[1.35] tracking-tight text-white/45">
          Saya merancang{' '}
          <span className="text-white font-semibold">
            solusi jaringan &amp; perangkat keras IoT
          </span>{' '}
          dengan{' '}
          <span className="text-white font-semibold">eksekusi disiplin</span>,{' '}
          <span className="text-white font-semibold">infrastruktur handal</span>, dan{' '}
          <span className="text-white font-semibold">alur kerja terstruktur</span>
          —membantu tim mewujudkan sistem teknis yang efisien dan siap pakai.
        </p>

        {/* Bento Stats Row */}
        <div className="mt-16 sm:mt-20 grid grid-cols-1 sm:grid-cols-3 gap-6 w-full text-left">
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 sm:p-8 backdrop-blur-sm">
            <div className="flex items-center gap-3 text-white/40 mb-4">
              <Award size={20} />
              <span className="font-mono text-[0.68rem] tracking-[0.2em] uppercase">
                Pendidikan
              </span>
            </div>
            <div className="font-editorial text-4xl sm:text-5xl font-bold text-white italic">
              85 / 100
            </div>
            <p className="mt-2 text-sm text-white/60 leading-relaxed">
              Nilai rata-rata Ijazah SMK Negeri 1 Cileungsi kompetensi Teknik Komputer dan Jaringan.
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 sm:p-8 backdrop-blur-sm">
            <div className="flex items-center gap-3 text-white/40 mb-4">
              <Briefcase size={20} />
              <span className="font-mono text-[0.68rem] tracking-[0.2em] uppercase">
                Pengalaman
              </span>
            </div>
            <div className="font-editorial text-4xl sm:text-5xl font-bold text-white italic">
              3+ Peran
            </div>
            <p className="mt-2 text-sm text-white/60 leading-relaxed">
              Pengalaman nyata: Magang produksi di PT Rekadaya, PT Serin, serta freelance data entry.
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 sm:p-8 backdrop-blur-sm">
            <div className="flex items-center gap-3 text-white/40 mb-4">
              <Cpu size={20} />
              <span className="font-mono text-[0.68rem] tracking-[0.2em] uppercase">
                Kompetensi
              </span>
            </div>
            <div className="font-editorial text-4xl sm:text-5xl font-bold text-white italic">
              100% Praktik
            </div>
            <p className="mt-2 text-sm text-white/60 leading-relaxed">
              Fokus pada wiring prototype, konfigurasi perangkat router/switch, dan troubleshooting langsung.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
