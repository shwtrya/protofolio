import { useEffect, useRef, useState } from 'react';
import { Building, Calendar, CheckCircle2, MapPin } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface ExperienceItem {
  id: string;
  num: string;
  title: string;
  org: string;
  place: string;
  period: string;
  duration: string;
  type: string;
  overview: string;
  highlights: string[];
}

const experiences: ExperienceItem[] = [
  {
    id: 'rekadaya',
    num: '01',
    title: 'Operator Produksi (PKL)',
    org: 'PT Rekadaya Multi Adiprima',
    place: 'Ciangsana, Jawa Barat',
    period: 'Sep 2025 — Des 2025',
    duration: '4 bulan',
    type: 'PKL / Industri',
    overview:
      'Menjalankan tugas pada lini produksi manufaktur komponen otomotif dengan memprioritaskan ketelitian sortir material, perakitan part presisi, dan standardisasi kualitas.',
    highlights: [
      'Sortir material & verifikasi spesifikasi fisik komponen',
      'Assembly double tape pada part felt secara presisi dan rapi',
      'Quality check produk akhir sebelum packaging distribusi',
      'Mencapai target output kerja harian dengan kedisiplinan tinggi',
    ],
  },
  {
    id: 'serin',
    num: '02',
    title: 'Operator Produksi (PKL)',
    org: 'PT Serin Indonesia',
    place: 'Bekasi, Jawa Barat',
    period: 'Jun 2025 — Sep 2025',
    duration: '4 bulan',
    type: 'PKL / Industri',
    overview:
      'Mendukung kelancaran lini produksi perlengkapan dan tas dengan mematuhi instruksi kerja, persiapan komponen, serta pengeleman rapi sesuai standar.',
    highlights: [
      'Pemasangan aksesoris silinder pada zipper tas sesuai SOP',
      'Aplikasi perekat dan lem presisi pada material sebelum jahit',
      'Pemeriksaan kerapian visual dan fungsi mekanik komponen',
      'Menjaga kebersihan area kerja (5S) serta perawatan alat',
    ],
  },
  {
    id: 'wova',
    num: '03',
    title: 'Data Entry Specialist',
    org: 'PT Wova Group Indonesia',
    place: 'Cileungsi, Jawa Barat',
    period: '2023 — 2025',
    duration: 'Freelance',
    type: 'Administrasi / Data',
    overview:
      'Menginput, merapikan, dan memverifikasi data operasional pelanggan secara teliti untuk memastikan konsistensi database digital dan kemudahan pembuatan laporan.',
    highlights: [
      'Input data berkala dan validasi field untuk mencegah duplikasi',
      'Pembersihan dan standardisasi format record berulang',
      'Penyusunan rekapitulasi data siap dibaca oleh tim administrasi',
      'Pemanfaatan spreadsheet digital untuk mempercepat verifikasi data',
    ],
  },
];

export const Experience = () => {
  const [activeIdx, setActiveIdx] = useState(0);
  const activeExp = experiences[activeIdx];

  const sectionRef = useRef<HTMLElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const watermarkRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Only apply horizontal pin scroll on desktop (lg: min-width 1024px)
    const mm = gsap.matchMedia();

    mm.add('(min-width: 1024px)', () => {
      if (!sectionRef.current || !viewportRef.current || !trackRef.current) return;

      const track = trackRef.current;
      const viewport = viewportRef.current;

      const getScrollAmount = () => Math.max(0, track.scrollWidth - viewport.clientWidth + 40);

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: () => `+=${getScrollAmount() + window.innerHeight}`,
          pin: true,
          scrub: 0.85,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            if (progressRef.current) {
              progressRef.current.style.width = `${self.progress * 100}%`;
            }
          },
        },
      });

      // Watermark zoom/blur effect on scroll
      if (watermarkRef.current) {
        tl.fromTo(
          watermarkRef.current,
          { opacity: 0.01, filter: 'blur(16px)', scale: 0.85 },
          { opacity: 0.05, filter: 'blur(3px)', scale: 1, duration: 0.5 },
          0
        );
      }

      // Horizontal track move
      tl.to(
        track,
        {
          x: () => -getScrollAmount(),
          ease: 'none',
        },
        0
      );
    });

    return () => mm.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="experience"
      aria-labelledby="experience-heading"
      className="relative z-20 bg-[#18181c] text-[#f4f4f1] px-6 py-16 sm:px-10 sm:py-20 lg:px-20 lg:h-screen lg:flex lg:flex-col lg:justify-between overflow-hidden"
    >
      {/* Background blurred watermark text */}
      <div
        ref={watermarkRef}
        aria-hidden="true"
        className="watermark-bg top-12 text-white/[0.035]"
      >
        EXPERIENCES
      </div>

      <div className="relative z-10 mx-auto max-w-7xl w-full flex-1 flex flex-col justify-between">
        {/* Section Header */}
        <div className="mb-8 lg:mb-6 flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/10 pb-6 shrink-0">
          <div>
            <p className="font-mono text-[0.68rem] uppercase tracking-[0.3em] text-white/50">
              CAREER ARCHIVE
            </p>
            <h2
              id="experience-heading"
              className="mt-2 text-3xl sm:text-4xl lg:text-5xl font-bold uppercase tracking-[-0.03em] text-white"
            >
              Experiences
            </h2>
          </div>

          <p className="hidden md:block max-w-md text-sm text-white/60 leading-relaxed text-right">
            Roles, systems, and the work behind them.
          </p>
        </div>

        {/* DESKTOP HORIZONTAL SCROLL CARDS (lg+) */}
        <div
          ref={viewportRef}
          className="hidden lg:block min-h-0 flex-1 overflow-hidden relative my-auto py-4"
        >
          <div
            ref={trackRef}
            className="flex items-stretch gap-8 will-change-transform pr-16"
          >
            {experiences.map((exp) => (
              <div
                key={exp.id}
                className="w-[620px] shrink-0 rounded-3xl border border-white/12 bg-white/[0.035] p-8 lg:p-10 backdrop-blur-md flex flex-col justify-between transition-colors hover:border-white/25 hover:bg-white/[0.05]"
              >
                <div>
                  <div className="flex items-center justify-between gap-4 font-mono text-xs uppercase tracking-widest text-white/45 pb-4 border-b border-white/10">
                    <span className="text-white/80 font-bold">{exp.type}</span>
                    <span className="rounded-full border border-white/20 px-3 py-1 text-[0.65rem] text-white/70">
                      {exp.period}
                    </span>
                  </div>

                  <div className="mt-6 flex items-baseline justify-between gap-4">
                    <h3 className="text-2xl lg:text-3xl font-bold tracking-tight text-white uppercase">
                      {exp.title}
                    </h3>
                    <span className="font-editorial text-3xl text-white/30 italic">
                      {exp.num}
                    </span>
                  </div>

                  <div className="mt-2 flex items-center gap-2 text-sm text-white/60 font-medium">
                    <Building size={16} className="text-white/40" />
                    <span>{exp.org}</span>
                    <span>·</span>
                    <MapPin size={15} className="text-white/40" />
                    <span>{exp.place}</span>
                  </div>

                  <p className="mt-6 text-sm lg:text-base text-white/70 leading-relaxed">
                    {exp.overview}
                  </p>
                </div>

                <div className="mt-8 pt-6 border-t border-white/10">
                  <p className="font-mono text-[0.65rem] uppercase tracking-widest text-white/40 mb-3">
                    HIGHLIGHTS
                  </p>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {exp.highlights.map((h, i) => (
                      <li
                        key={h}
                        className="flex items-start gap-2 text-xs text-white/80 leading-snug"
                      >
                        <span className="font-mono text-white/40 text-[0.65rem] mt-0.5">
                          0{i + 1}
                        </span>
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>

          {/* Desktop scroll progress indicator */}
          <div className="mt-6 h-1 w-full rounded-full bg-white/10 overflow-hidden">
            <div
              ref={progressRef}
              className="h-full bg-white transition-all duration-100 ease-out"
              style={{ width: '0%' }}
            />
          </div>
        </div>

        {/* MOBILE / TABLET TABBED CARDS (< lg) */}
        <div className="lg:hidden flex flex-col gap-6">
          {/* Experience Selector Tabs (Pills) */}
          <div className="flex flex-wrap gap-2">
            {experiences.map((exp, idx) => (
              <button
                key={exp.id}
                type="button"
                onClick={() => setActiveIdx(idx)}
                className={`flex items-center gap-2 rounded-full border px-4 py-2 font-mono text-[0.7rem] tracking-wider transition-all uppercase ${
                  activeIdx === idx
                    ? 'border-white bg-white text-[#111114] font-bold shadow-lg'
                    : 'border-white/15 bg-white/[0.04] text-white/70 hover:border-white/30 hover:text-white'
                }`}
              >
                <span>{exp.num}</span>
                <span>{exp.org.split(' ')[1] || exp.org}</span>
              </button>
            ))}
          </div>

          {/* Active Card Body */}
          <div className="rounded-2xl border border-white/12 bg-white/[0.035] p-6 sm:p-8 backdrop-blur-md">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-4">
              <span className="rounded-full border border-white/20 px-3 py-1 font-mono text-[0.68rem] tracking-wider uppercase text-white/80">
                {activeExp.type}
              </span>
              <span className="font-mono text-xs text-white/50">{activeExp.period}</span>
            </div>

            <h3 className="mt-5 text-xl sm:text-2xl font-bold tracking-tight text-white uppercase">
              {activeExp.title}
            </h3>

            <div className="mt-2 flex items-center gap-2 text-sm text-white/60">
              <span>{activeExp.org}</span>
              <span>·</span>
              <span>{activeExp.place}</span>
            </div>

            <p className="mt-5 text-sm sm:text-base text-white/70 leading-relaxed">
              {activeExp.overview}
            </p>

            <div className="mt-6 border-t border-white/10 pt-5">
              <p className="font-mono text-[0.65rem] uppercase tracking-widest text-white/40 mb-3">
                HIGHLIGHTS
              </p>
              <ul className="grid grid-cols-1 gap-2">
                {activeExp.highlights.map((h, i) => (
                  <li key={h} className="flex items-start gap-2 text-xs text-white/80">
                    <span className="font-mono text-white/40 text-[0.65rem] mt-0.5">
                      0{i + 1}
                    </span>
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
