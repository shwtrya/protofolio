import { useEffect, useRef, useState } from 'react';
import { Calendar, MapPin } from 'lucide-react';
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
    title: 'Operator Produksi',
    org: 'PT Rekadaya Multi Adiprima',
    place: 'Ciangsana, Bogor',
    period: 'Sep 2024 — Des 2024',
    duration: '4 bulan',
    type: 'PKL / Industri',
    overview:
      'Menjalankan tugas lini produksi manufaktur otomotif dengan memprioritaskan ketelitian sortasi material, perakitan part presisi, dan standardisasi kualitas.',
    highlights: [
      'Sortir material & verifikasi spesifikasi fisik komponen',
      'Assembly double tape pada part felt secara presisi dan rapi',
      'Quality check produk akhir sebelum masuk packaging distribusi',
      'Mencapai target output kerja harian dengan kedisiplinan tinggi',
    ],
  },
  {
    id: 'serin',
    num: '02',
    title: 'Operator Produksi',
    org: 'PT Serin Indonesia',
    place: 'Bekasi, Jawa Barat',
    period: 'Jun 2024 — Sep 2024',
    duration: '4 bulan',
    type: 'PKL / Industri',
    overview:
      'Mendukung kelancaran lini produksi perlengkapan dan tas dengan mematuhi instruksi kerja, persiapan komponen, serta pengeleman rapi sesuai standar.',
    highlights: [
      'Pemasangan aksesoris silinder pada zipper tas sesuai SOP',
      'Aplikasi perekat dan lem presisi pada material sebelum penjahitan',
      'Pemeriksaan kerapian visual dan fungsi mekanik komponen',
      'Menjaga kebersihan area kerja (5S) serta perawatan alat produksi',
    ],
  },
  {
    id: 'wova',
    num: '03',
    title: 'Data Entry Specialist',
    org: 'PT Wova Group Indonesia',
    place: 'Cileungsi, Bogor',
    period: '2023 — 2025',
    duration: 'Freelance',
    type: 'Administrasi',
    overview:
      'Menginput, merapikan, dan memverifikasi data operasional pelanggan secara teliti untuk memastikan konsistensi database digital dan kemudahan pembuatan laporan.',
    highlights: [
      'Input data berkala dan validasi field untuk mencegah duplikasi',
      'Pembersihan dan standardisasi format record berulang',
      'Penyusunan rekapitulasi data siap baca untuk tim administrasi',
      'Pemanfaatan spreadsheet digital mempercepat verifikasi data',
    ],
  },
];

export const Experience = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const watermarkRef = useRef<HTMLDivElement>(null);

  const [activeIdx, setActiveIdx] = useState(0);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Watermark zoom/blur
      if (watermarkRef.current && sectionRef.current) {
        gsap.fromTo(
          watermarkRef.current,
          { opacity: 0, filter: 'blur(16px)', scale: 0.85 },
          {
            opacity: 1,
            filter: 'blur(3px)',
            scale: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top bottom',
              end: 'top top',
              scrub: true,
            },
          }
        );
      }

      // Horizontal pinning only on desktop (lg+)
      const isDesktop = window.matchMedia('(min-width: 1024px)').matches;
      if (isDesktop && trackRef.current && viewportRef.current && sectionRef.current) {
        const getScrollDistance = () =>
          Math.max(0, trackRef.current!.scrollWidth - viewportRef.current!.clientWidth);

        const tl = gsap.timeline({
          defaults: { ease: 'none' },
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top top',
            end: () => `+=${getScrollDistance() + window.innerHeight * 0.7}`,
            pin: true,
            scrub: 0.8,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });

        // Horizontal slide
        tl.to(trackRef.current, {
          x: () => -getScrollDistance(),
          ease: 'none',
        });

        // Progress bar fill
        if (progressBarRef.current) {
          tl.to(
            progressBarRef.current,
            {
              scaleX: 1,
              ease: 'none',
            },
            0
          );
        }
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="experience"
      aria-labelledby="experience-heading"
      className="relative z-20 bg-[#18181c] text-[#f4f4f1] px-6 py-20 sm:px-10 sm:py-24 lg:px-20 lg:h-screen lg:flex lg:flex-col lg:justify-between overflow-hidden"
    >
      {/* Background blurred watermark text */}
      <div
        ref={watermarkRef}
        aria-hidden="true"
        className="watermark-bg top-8 sm:top-12 text-white/[0.035]"
      >
        EXPERIENCES
      </div>

      <div className="relative z-10 mx-auto w-full max-w-7xl flex flex-col h-full justify-between">
        {/* Header */}
        <div className="mb-8 sm:mb-10 flex shrink-0 items-end justify-between gap-6 border-b border-white/10 pb-6">
          <div>
            <p className="font-mono text-[0.65rem] uppercase tracking-[0.28em] text-white/45">
              Career Archive
            </p>
            <h2
              id="experience-heading"
              className="mt-2 text-3xl sm:text-4xl lg:text-5xl font-bold uppercase tracking-tight text-white"
            >
              Experiences
            </h2>
          </div>
          <p className="hidden max-w-md text-right text-xs sm:text-sm leading-relaxed text-white/45 md:block">
            Roles, systems, and the work behind them.
          </p>
        </div>

        {/* Mobile View: Tabbed Cards (< lg) */}
        <div className="lg:hidden flex flex-col gap-6">
          {/* Tabs */}
          <div className="flex flex-wrap gap-2">
            {experiences.map((exp, idx) => (
              <button
                key={exp.id}
                type="button"
                onClick={() => setActiveIdx(idx)}
                className={`rounded-full border px-4 py-2 font-mono text-xs uppercase tracking-wider transition-all ${
                  activeIdx === idx
                    ? 'border-white bg-white text-[#111114] font-bold shadow-md'
                    : 'border-white/15 bg-transparent text-white/60 hover:border-white/30'
                }`}
              >
                {exp.num} {exp.org.split(' ')[1] ?? exp.org}
              </button>
            ))}
          </div>

          {/* Active Card Content */}
          <div className="rounded-2xl border border-white/12 bg-white/[0.04] p-6 sm:p-8 backdrop-blur-md">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/10 pb-4">
              <span className="font-mono text-xs text-white/40">{experiences[activeIdx].num} / 03</span>
              <span className="rounded-full border border-white/20 px-3 py-1 font-mono text-[10px] uppercase tracking-wider text-white/80">
                {experiences[activeIdx].type}
              </span>
            </div>
            <h3 className="mt-4 text-2xl font-bold uppercase text-white">
              {experiences[activeIdx].title}
            </h3>
            <p className="mt-1 text-sm font-semibold text-white/80">
              {experiences[activeIdx].org} · {experiences[activeIdx].place}
            </p>
            <p className="font-mono text-xs text-white/40 mt-1">
              {experiences[activeIdx].period} ({experiences[activeIdx].duration})
            </p>
            <p className="mt-4 text-sm text-white/70 leading-relaxed">
              {experiences[activeIdx].overview}
            </p>
            <div className="mt-6 border-t border-white/10 pt-4 space-y-2.5">
              {experiences[activeIdx].highlights.map((h, i) => (
                <div key={i} className="flex items-start gap-3 text-xs sm:text-sm text-white/80">
                  <span className="font-mono text-white/40">0{i + 1}</span>
                  <span>{h}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Desktop View: Horizontal Track (Pinned on lg+) */}
        <div
          ref={viewportRef}
          data-experience-viewport="true"
          className="hidden min-h-0 flex-1 overflow-hidden lg:block my-auto"
        >
          <div
            ref={trackRef}
            className="flex gap-8 items-stretch w-max will-change-transform py-4"
          >
            {experiences.map((exp) => (
              <article
                key={exp.id}
                className="w-[480px] lg:w-[520px] shrink-0 rounded-2xl border border-white/12 bg-white/[0.04] p-8 flex flex-col justify-between backdrop-blur-md shadow-xl transition-colors duration-300 hover:border-white/25 hover:bg-white/[0.06]"
              >
                <div>
                  <div className="flex items-center justify-between border-b border-white/10 pb-4">
                    <span className="font-mono text-xs text-white/40">{exp.num} / 03</span>
                    <span className="rounded-full border border-white/20 px-3 py-1 font-mono text-[10px] uppercase tracking-wider text-white/80">
                      {exp.type}
                    </span>
                  </div>

                  <h3 className="mt-5 text-2xl lg:text-3xl font-bold uppercase tracking-tight text-white">
                    {exp.title}
                  </h3>

                  <p className="mt-2 text-sm lg:text-base font-semibold text-white/90">
                    {exp.org}
                  </p>

                  <div className="mt-2 flex items-center gap-4 font-mono text-xs text-white/45">
                    <span className="flex items-center gap-1.5">
                      <Calendar size={13} />
                      {exp.period}
                    </span>
                    <span>·</span>
                    <span className="flex items-center gap-1">
                      <MapPin size={12} />
                      {exp.place}
                    </span>
                  </div>

                  <p className="mt-5 text-sm leading-relaxed text-white/70">
                    {exp.overview}
                  </p>
                </div>

                <div className="mt-8 border-t border-white/10 pt-5">
                  <p className="font-mono text-[10px] uppercase tracking-widest text-white/40 mb-3">
                    Key Highlights
                  </p>
                  <div className="space-y-2.5">
                    {exp.highlights.map((h, i) => (
                      <div
                        key={i}
                        className="flex items-center gap-3 text-xs text-white/80 border-t border-white/5 pt-2"
                      >
                        <span className="font-mono text-[11px] text-white/40">0{i + 1}</span>
                        <span className="leading-snug">{h}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>

        {/* Progress Bar (Desktop only) */}
        <div
          aria-hidden="true"
          className="mt-6 hidden h-1 shrink-0 overflow-hidden rounded-full bg-white/10 lg:block"
        >
          <div
            ref={progressBarRef}
            className="h-full w-full origin-left scale-x-0 bg-white/80 rounded-full will-change-transform"
          />
        </div>
      </div>
    </section>
  );
};

export default Experience;
