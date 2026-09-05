import { useEffect, useRef, useState } from 'react';
import { Award, ExternalLink, GraduationCap, ShieldCheck, ZoomIn } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import Modal from './ui/Modal';

gsap.registerPlugin(ScrollTrigger);

interface Certificate {
  title: string;
  issuer: string;
  period: string;
  description: string;
  preview: string;
  tags: string[];
}

const certificates: Certificate[] = [
  {
    title: 'Sertifikat IT Specialist - Networking',
    issuer: 'Certiport / IT Specialist',
    period: '2025',
    description:
      'Bukti kompetensi IT Specialist bidang networking, mencakup pemahaman jaringan komputer, topologi, dan troubleshooting koneksi.',
    preview: '/proof/preview-Sertifikat_IT_Specialist_Networking_2025.webp',
    tags: ['Networking', 'TCP/IP', 'Troubleshooting'],
  },
  {
    title: 'Sertifikat Praktek Kerja Lapangan (PKL)',
    issuer: 'PT Rekadaya Multi Adiprima',
    period: '2025',
    description:
      'Bukti pelaksanaan PKL industri di PT Rekadaya Multi Adiprima dengan penilaian kedisiplinan, ketelitian perakitan, dan standar kualitas.',
    preview: '/proof/preview-Sertifikat_PKL_PT_Rekadaya_2025.webp',
    tags: ['PKL Industri', 'Quality Control', 'Assembly'],
  },
];

interface DayContribution {
  date: string;
  count: number;
  level: number;
}

export const Certificates = () => {
  const [activeCert, setActiveCert] = useState<Certificate | null>(null);
  const [contributions, setContributions] = useState<DayContribution[]>([]);
  const [totalContrib, setTotalContrib] = useState(316);

  const sectionRef = useRef<HTMLElement>(null);
  const watermarkRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLDivElement>(null);

  // Fetch GitHub contributions
  useEffect(() => {
    fetch('https://github-contributions-api.jogruber.de/v4/shwtrya?y=last')
      .then((res) => res.json())
      .then((data) => {
        if (data && data.contributions) {
          setContributions(data.contributions);
          if (data.total && data.total.lastYear) {
            setTotalContrib(data.total.lastYear);
          }
        }
      })
      .catch(() => {
        // Fallback: silently use baseline state
      });
  }, []);

  // Exact GSAP matchMedia scroll trigger from iqmal.dev
  useGSAP(
    () => {
      const section = sectionRef.current;
      const watermark = watermarkRef.current;
      const counterEl = counterRef.current;

      if (!section || !watermark) return;

      const mm = gsap.matchMedia();

      return mm.add(
        {
          isAll: '(min-width: 0px)',
          reduceMotion: '(prefers-reduced-motion: reduce)',
        },
        (context) => {
          const { reduceMotion } = context.conditions ?? {};

          if (reduceMotion) {
            gsap.set('.contrib-cell', { scale: 1, opacity: 1 });
            return;
          }

          // Watermark scrub
          gsap.fromTo(
            watermark,
            { y: -50, opacity: 0 },
            {
              y: 50,
              opacity: 1,
              ease: 'none',
              scrollTrigger: {
                trigger: section,
                start: 'top bottom',
                end: 'bottom top',
                scrub: true,
              },
            }
          );

          // Staggered grid cell pop in
          gsap.fromTo(
            '.contrib-cell',
            { scale: 0, opacity: 0, transformOrigin: 'center center' },
            {
              scale: 1,
              opacity: 1,
              stagger: { grid: [7, 53], from: 'start', amount: 1.2 },
              duration: 0.5,
              ease: 'back.out(1.5)',
              scrollTrigger: { trigger: '.contrib-grid-wrapper', start: 'top 85%' },
            }
          );

          // Number counter ticker
          if (counterEl) {
            const countObj = { val: 0 };
            gsap.to(countObj, {
              val: totalContrib,
              duration: 2,
              ease: 'power2.out',
              scrollTrigger: { trigger: counterEl, start: 'top 90%' },
              onUpdate: () => {
                if (counterEl) {
                  counterEl.innerText = Math.floor(countObj.val).toLocaleString();
                }
              },
            });
          }
        }
      );
    },
    { scope: sectionRef, dependencies: [totalContrib, contributions.length] }
  );

  return (
    <section
      ref={sectionRef}
      id="certificates"
      aria-labelledby="certificates-heading"
      className="relative z-30 bg-[#e8e8e5] text-[#111114] px-6 py-20 pb-28 sm:px-10 sm:py-28 lg:px-20 overflow-hidden"
    >
      {/* Parallax Watermark text (exact iqmal.dev) */}
      <div
        ref={watermarkRef}
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-16 select-none text-center font-serif text-[clamp(4.5rem,16vw,15rem)] font-bold italic tracking-tight text-[#111114]/[0.04] leading-none will-change-transform"
      >
        CREDENTIALS
      </div>

      <div className="relative z-10 mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-14 sm:mb-20 flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#111114]/10 pb-8">
          <div>
            <p className="font-mono text-[0.65rem] uppercase tracking-[0.3em] text-[#111114]/60">
              04 / Verified Credentials
            </p>
            <h2
              id="certificates-heading"
              className="mt-3 font-serif text-4xl sm:text-6xl text-[#111114] tracking-tight"
            >
              Sertifikasi &amp; <span className="font-editorial italic font-normal text-[#111114]/80">Edukasi.</span>
            </h2>
          </div>
          <p className="max-w-md text-xs sm:text-sm text-[#111114]/70 leading-relaxed">
            Sertifikat resmi kompetensi keahlian dan riwayat pendidikan formal yang dapat dipertanggungjawabkan keabsahannya.
          </p>
        </div>

        {/* 1. GitHub Contributions Bento Card (exact iqmal.dev) */}
        <div className="mb-16 rounded-3xl border border-[#111114]/12 bg-white/60 p-6 sm:p-10 shadow-sm backdrop-blur-sm">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Counter Info */}
            <div className="lg:col-span-4">
              <span className="font-mono text-[0.68rem] uppercase tracking-[0.25em] text-[#111114]/60">
                GitHub Activity (Past Year)
              </span>

              <div className="mt-4">
                <div
                  ref={counterRef}
                  className="font-editorial text-5xl sm:text-6xl font-bold text-[#111114] leading-none"
                >
                  {totalContrib}
                </div>
                <p className="mt-2 text-xs sm:text-sm text-[#111114]/70 leading-relaxed">
                  Kontribusi di GitHub dalam 365 hari terakhir. Menunjukkan konsistensi eksplorasi script, konfigurasi, dan open-source.
                </p>
              </div>

              <div className="mt-6 flex items-center gap-3">
                <span className="rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300/60 px-3 py-1 font-mono text-[10px] uppercase font-semibold">
                  Active Contributor
                </span>
                <span className="rounded-full bg-[#111114]/5 text-[#111114]/70 px-3 py-1 font-mono text-[10px] uppercase font-semibold">
                  Public Projects
                </span>
              </div>
            </div>

            {/* Right Heatmap preview */}
            <div data-lenis-prevent="true" className="lg:col-span-8 overflow-x-auto pb-2">
              <div className="flex items-center justify-between mb-3 text-xs font-mono text-[#111114]/60">
                <span>@shwtrya</span>
                <a
                  href="https://github.com/shwtrya"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-[#111114] font-semibold hover:underline"
                >
                  Lihat profil GitHub lengkap
                  <ExternalLink size={12} />
                </a>
              </div>

              {/* Grid representation */}
              <div className="contrib-grid-wrapper min-w-[620px] rounded-2xl border border-[#111114]/10 bg-[#111114]/[0.02] p-4">
                <div className="grid grid-flow-col grid-rows-7 gap-1.5 justify-start">
                  {contributions.length > 0
                    ? contributions.slice(-371).map((c, i) => {
                        const levelColors = [
                          'bg-[#111114]/[0.08]',
                          'bg-emerald-300',
                          'bg-emerald-400',
                          'bg-emerald-500',
                          'bg-emerald-600',
                        ];
                        const color = levelColors[c.level] ?? levelColors[0];
                        return (
                          <div
                            key={i}
                            title={`${c.date}: ${c.count} kontribusi`}
                            className={`contrib-cell h-2.5 w-2.5 rounded-sm ${color} transition-transform hover:scale-125`}
                          />
                        );
                      })
                    : Array.from({ length: 371 }).map((_, i) => {
                        const isFilled = (i % 7 === 1 || i % 7 === 3) && (i % 4 === 0 || i % 5 === 0);
                        return (
                          <div
                            key={i}
                            className={`contrib-cell h-2.5 w-2.5 rounded-sm ${
                              isFilled ? 'bg-emerald-500' : 'bg-[#111114]/[0.08]'
                            }`}
                          />
                        );
                      })}
                </div>

                <div className="mt-3 flex items-center justify-end gap-2 text-[10px] font-mono text-[#111114]/50">
                  <span>Less</span>
                  <span className="h-2 w-2 rounded-sm bg-[#111114]/[0.08]" />
                  <span className="h-2 w-2 rounded-sm bg-emerald-300" />
                  <span className="h-2 w-2 rounded-sm bg-emerald-400" />
                  <span className="h-2 w-2 rounded-sm bg-emerald-500" />
                  <span className="h-2 w-2 rounded-sm bg-emerald-600" />
                  <span>More</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 2. Credentials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {certificates.map((cert) => (
            <div
              key={cert.title}
              className="flex flex-col justify-between rounded-2xl border border-[#111114]/12 bg-white/60 overflow-hidden transition-all duration-300 hover:border-[#111114]/30 hover:shadow-xl group"
            >
              {/* Preview Image with fixed 16:10 aspect ratio */}
              <div
                onClick={() => setActiveCert(cert)}
                className="relative aspect-[16/10] w-full cursor-pointer overflow-hidden bg-neutral-200"
              >
                <img
                  src={cert.preview}
                  alt={cert.title}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  onError={(e) => {
                    (e.target as HTMLElement).style.display = 'none';
                  }}
                />
                <div className="absolute inset-0 flex items-center justify-center bg-[#111114]/40 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-white px-4 py-2 font-mono text-xs font-semibold text-[#111114] shadow-lg">
                    <ZoomIn size={14} /> Perbesar
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between text-xs font-mono text-[#111114]/50 mb-2">
                    <span className="flex items-center gap-1">
                      <ShieldCheck size={13} className="text-emerald-700" />
                      {cert.issuer}
                    </span>
                    <span>{cert.period}</span>
                  </div>

                  <h3 className="font-serif text-xl text-[#111114] font-normal leading-snug">
                    {cert.title}
                  </h3>

                  <p className="mt-3 text-xs sm:text-sm text-[#111114]/70 leading-relaxed">
                    {cert.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-[#111114]/10 flex flex-wrap gap-1.5">
                  {cert.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-[#111114]/5 px-2.5 py-0.5 font-mono text-[10px] text-[#111114]/75"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}

          {/* Education Card matching aspect ratio & height */}
          <div className="flex flex-col justify-between rounded-2xl border border-[#111114]/12 bg-white/60 overflow-hidden transition-all duration-300 hover:border-[#111114]/30 hover:shadow-xl group">
            <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#111114] flex flex-col items-center justify-center p-6 text-center text-white">
              <div className="h-16 w-16 rounded-2xl bg-white/10 flex items-center justify-center mb-3">
                <GraduationCap size={36} className="text-emerald-400" />
              </div>
              <span className="font-serif text-lg text-white">SMK Negeri 1 Cileungsi</span>
              <span className="font-mono text-[11px] text-white/60 uppercase tracking-widest mt-1">
                2022 — 2025
              </span>
            </div>

            <div className="p-6 flex-1 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between text-xs font-mono text-[#111114]/50 mb-2">
                  <span className="flex items-center gap-1">
                    <Award size={13} className="text-sky-700" />
                    Pendidikan Formal
                  </span>
                  <span>Lulus 2025</span>
                </div>

                <h3 className="font-serif text-xl text-[#111114] font-normal leading-snug">
                  Teknik Komputer &amp; Jaringan
                </h3>

                <p className="mt-3 text-xs sm:text-sm text-[#111114]/70 leading-relaxed">
                  Fokus kompetensi instalasi infrastruktur jaringan LAN/FTTH, administrasi sistem router, dan perakitan embedded system IoT. Nilai ijazah rata-rata: <strong>85 / 100</strong>.
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-[#111114]/10 flex flex-wrap gap-1.5">
                <span className="rounded-full bg-[#111114]/5 px-2.5 py-0.5 font-mono text-[10px] text-[#111114]/75">
                  SMKN 1 Cileungsi
                </span>
                <span className="rounded-full bg-[#111114]/5 px-2.5 py-0.5 font-mono text-[10px] text-[#111114]/75">
                  TKJ
                </span>
                <span className="rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 px-2.5 py-0.5 font-mono text-[10px] font-semibold">
                  Akreditasi A
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal Lightbox */}
      {activeCert && (
        <Modal isOpen={!!activeCert} onClose={() => setActiveCert(null)}>
          <div className="p-6 sm:p-8">
            <div className="flex items-center justify-between mb-4 border-b pb-4">
              <div>
                <h4 className="font-serif text-2xl text-[#111114] font-normal">
                  {activeCert.title}
                </h4>
                <p className="font-mono text-xs text-[#111114]/60 mt-1">
                  Penerbit: {activeCert.issuer} · {activeCert.period}
                </p>
              </div>
            </div>

            <div className="relative overflow-hidden rounded-xl border bg-black/5 max-h-[75vh] flex items-center justify-center">
              <img
                src={activeCert.preview}
                alt={activeCert.title}
                className="max-h-[75vh] w-auto object-contain"
              />
            </div>

            <div className="mt-4 flex justify-between items-center text-xs text-[#111114]/70">
              <span>{activeCert.description}</span>
              <a
                href={activeCert.preview}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 font-mono font-semibold text-[#111114] hover:underline"
              >
                Buka file asli <ExternalLink size={12} />
              </a>
            </div>
          </div>
        </Modal>
      )}
    </section>
  );
};

export default Certificates;
