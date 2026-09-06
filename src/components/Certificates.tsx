import { useEffect, useRef, useState } from 'react';
import { Award, Download, ExternalLink, GraduationCap, ShieldCheck, ZoomIn } from 'lucide-react';
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
    issuer: 'Certiport / Pearson VUE',
    period: '2025',
    description:
      'Sertifikasi kompetensi global IT Specialist bidang Networking, membuktikan penguasaan konsep jaringan TCP/IP, model OSI, subnetting, switching, routing, dan troubleshooting koneksi.',
    preview: '/proof/preview-Sertifikat_IT_Specialist_Networking_2025.webp',
    tags: ['Networking', 'TCP/IP', 'Routing & Switching', 'Certiport Global'],
  },
  {
    title: 'Sertifikat Praktek Kerja Lapangan (PKL)',
    issuer: 'PT Rekadaya Multi Adiprima',
    period: '2024 — 2025',
    description:
      'Bukti pelaksanaan PKL industri di PT Rekadaya Multi Adiprima dengan predikat sangat baik dalam kedisiplinan, ketelitian perakitan komponen felt manufaktur otomotif, dan standar quality control.',
    preview: '/proof/preview-Sertifikat_PKL_PT_Rekadaya_2025.webp',
    tags: ['PKL Industri', 'Quality Control', 'Manufacturing Assembly'],
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

  // Exact iqmal.dev scroll animations for Certificates & Activity
  useGSAP(
    () => {
      const section = sectionRef.current;
      const watermark = watermarkRef.current;
      const counter = counterRef.current;
      if (!section || !watermark || !counter) return;

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
            { y: -60, opacity: 0 },
            {
              y: 60,
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

          // Staggered contribution matrix cells pop
          gsap.fromTo(
            '.contrib-cell',
            { scale: 0, opacity: 0, transformOrigin: 'center center' },
            {
              scale: 1,
              opacity: 1,
              stagger: { grid: [7, 53], from: 'start', amount: 1.2 },
              duration: 0.5,
              ease: 'back.out(1.5)',
              scrollTrigger: {
                trigger: '.contrib-grid-wrapper',
                start: 'top 85%',
              },
            }
          );

          // Counter number roll
          const counterObj = { val: 0 };
          gsap.to(counterObj, {
            val: totalContrib,
            duration: 1.8,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: counter,
              start: 'top 90%',
            },
            onUpdate: () => {
              if (counter) {
                counter.innerText = Math.floor(counterObj.val).toLocaleString();
              }
            },
          });
        }
      );
    },
    { scope: sectionRef, dependencies: [totalContrib] }
  );

  return (
    <section
      ref={sectionRef}
      id="certificates"
      aria-labelledby="certificates-heading"
      className="relative z-30 bg-[#e8e8e5] text-[#111114] px-6 py-20 pb-28 sm:px-10 sm:py-28 lg:px-20 overflow-hidden"
    >
      {/* Watermark text */}
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
              04 / Credentials &amp; Verifications
            </p>
            <h2
              id="certificates-heading"
              className="mt-3 font-serif text-4xl sm:text-6xl text-[#111114] tracking-tight"
            >
              Sertifikasi &amp;{' '}
              <span className="font-editorial italic font-normal text-[#111114]/80">
                Riwayat Edukasi.
              </span>
            </h2>
          </div>
          <p className="max-w-md text-xs sm:text-sm text-[#111114]/70 leading-relaxed">
            Dokumentasi sertifikat keahlian industri yang terverifikasi, riwayat kontribusi open-source, dan catatan kelulusan SMK Negeri 1 Cileungsi.
          </p>
        </div>

        {/* 1. GitHub Contributions Bento Card (exact iqmal.dev) */}
        <div className="mb-14 sm:mb-18 rounded-3xl border border-[#111114]/12 bg-white/70 p-6 sm:p-10 shadow-sm backdrop-blur-sm">
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
            <div data-lenis-prevent="true" className="lg:col-span-8 overflow-x-auto pb-2 [scrollbar-width:thin]">
              <div className="flex items-center justify-between mb-3 text-xs font-mono text-[#111114]/60">
                <span className="flex items-center gap-2">
                  <span>@shwtrya</span>
                  <span className="lg:hidden inline-flex items-center gap-1 rounded bg-[#111114]/5 px-2 py-0.5 text-[10px] text-emerald-800 font-sans font-medium">
                    ← geser untuk riwayat penuh →
                  </span>
                </span>
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

        {/* 2. Enlarged Official Certificates Grid (Prominent 2-Column on Desktop, Full-Width on Mobile) */}
        <div className="mb-10 sm:mb-14">
          <div className="mb-6 flex items-center justify-between">
            <h3 className="font-mono text-xs uppercase tracking-[0.25em] text-[#111114]/65 font-bold">
              Sertifikat Keahlian &amp; Uji Kompetensi
            </h3>
            <span className="font-mono text-xs text-[#111114]/40">
              2 Sertifikat Resmi
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 items-stretch">
            {certificates.map((cert) => (
              <div
                key={cert.title}
                className="flex flex-col justify-between rounded-3xl border border-[#111114]/15 bg-white/75 overflow-hidden shadow-md transition-all duration-300 hover:border-[#111114]/30 hover:shadow-2xl group"
              >
                {/* Large Preview Image with Aspect Ratio 16/11 for Maximum Legibility */}
                <div
                  onClick={() => setActiveCert(cert)}
                  className="relative aspect-[16/11] sm:aspect-[16/10] w-full cursor-pointer overflow-hidden bg-neutral-100 border-b border-[#111114]/10"
                >
                  <img
                    src={cert.preview}
                    alt={cert.title}
                    loading="eager"
                    className="h-full w-full object-contain p-2 sm:p-3 transition-transform duration-500 group-hover:scale-[1.03]"
                    onError={(e) => {
                      (e.target as HTMLElement).style.display = 'none';
                    }}
                  />

                  {/* Desktop Hover & Mobile Tap Action Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center bg-[#111114]/35 opacity-0 transition-opacity duration-300 group-hover:opacity-100 backdrop-blur-[2px]">
                    <span className="inline-flex items-center gap-2 rounded-full bg-[#111114] px-5 py-2.5 font-mono text-xs font-semibold text-white shadow-xl">
                      <ZoomIn size={15} />
                      <span>Perbesar Resolusi Penuh</span>
                    </span>
                  </div>

                  {/* Corner Badge */}
                  <div className="absolute top-4 right-4 z-10 pointer-events-none">
                    <span className="rounded-full bg-[#111114]/85 px-3 py-1 font-mono text-[10px] uppercase font-semibold text-white backdrop-blur-sm shadow-sm">
                      {cert.period}
                    </span>
                  </div>
                </div>

                {/* Content Details */}
                <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between text-xs font-mono text-[#111114]/60 mb-2.5">
                      <span className="flex items-center gap-1.5 font-semibold text-[#111114]/80">
                        <ShieldCheck size={15} className="text-emerald-700" />
                        {cert.issuer}
                      </span>
                      <button
                        type="button"
                        onClick={() => setActiveCert(cert)}
                        className="inline-flex items-center gap-1 text-emerald-700 hover:underline font-mono text-xs font-semibold cursor-pointer"
                      >
                        <ZoomIn size={12} />
                        <span>Detail &amp; Zoom</span>
                      </button>
                    </div>

                    <h4 className="font-serif text-2xl sm:text-3xl text-[#111114] font-normal leading-snug">
                      {cert.title}
                    </h4>

                    <p className="mt-3.5 text-xs sm:text-sm text-[#111114]/75 leading-relaxed">
                      {cert.description}
                    </p>
                  </div>

                  <div className="mt-6 pt-5 border-t border-[#111114]/10 flex flex-wrap gap-2">
                    {cert.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full bg-[#111114]/5 px-3 py-1 font-mono text-[11px] text-[#111114]/80 font-medium"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 3. Education Bento Card (SMK Negeri 1 Cileungsi - Wide Featured Format) */}
        <div className="rounded-3xl border border-[#111114]/15 bg-white/75 p-6 sm:p-10 shadow-md">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left School Icon & Identification */}
            <div className="lg:col-span-4 flex flex-col items-start gap-4">
              <div className="flex items-center gap-4">
                <div className="h-16 w-16 rounded-2xl bg-[#111114] flex items-center justify-center text-white shadow-md">
                  <GraduationCap size={34} className="text-emerald-400" />
                </div>
                <div>
                  <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#111114]/50 font-bold block">
                    Pendidikan Formal
                  </span>
                  <h4 className="font-serif text-2xl text-[#111114] font-bold">
                    SMK Negeri 1 Cileungsi
                  </h4>
                  <span className="font-mono text-xs text-[#111114]/65">
                    Angkatan 2022 — 2025
                  </span>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mt-2">
                <span className="rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300/60 px-3 py-1 font-mono text-[10px] font-semibold uppercase">
                  Akreditasi A
                </span>
                <span className="rounded-full bg-[#111114]/5 text-[#111114]/75 px-3 py-1 font-mono text-[10px] font-semibold uppercase">
                  Teknik Komputer &amp; Jaringan
                </span>
              </div>
            </div>

            {/* Right Educational Details & Competency Highlights */}
            <div className="lg:col-span-8 lg:border-l lg:border-[#111114]/10 lg:pl-8">
              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 border-b border-[#111114]/10 pb-4 mb-4">
                <h5 className="font-serif text-xl sm:text-2xl text-[#111114]">
                  Kompetensi Keahlian Teknik Komputer &amp; Jaringan (TKJ)
                </h5>
                <div className="inline-flex items-center gap-1 font-mono text-xs font-semibold text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                  <Award size={14} />
                  <span>Rata-Rata Nilai Ijazah: 85 / 100</span>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-[#111114]/75 leading-relaxed">
                Menyelesaikan program vokasi 3 tahun dengan pembelajaran intensif pada konfigurasi router MikroTik, pemetaan dan penyambungan kabel fiber optik (FTTH), protokol routing LAN/WAN, administrasi jaringan komputer, dan perakitan embedded system IoT berbasis ESP8266/Arduino.
              </p>

              <div className="mt-4 flex flex-wrap gap-2 font-mono text-[11px] text-[#111114]/70">
                <span className="rounded-lg bg-neutral-100 px-2.5 py-1 border border-neutral-200/80">
                  Perakitan Splicer FTTH
                </span>
                <span className="rounded-lg bg-neutral-100 px-2.5 py-1 border border-neutral-200/80">
                  Routing MikroTik &amp; VLAN
                </span>
                <span className="rounded-lg bg-neutral-100 px-2.5 py-1 border border-neutral-200/80">
                  IoT Sensor &amp; Microcontroller
                </span>
                <span className="rounded-lg bg-neutral-100 px-2.5 py-1 border border-neutral-200/80">
                  Disiplin Magang Industri Manufaktur
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Large Lightbox Modal for Full-Resolution Certificate Inspection */}
      {activeCert && (
        <Modal
          isOpen={!!activeCert}
          onClose={() => setActiveCert(null)}
          maxWidth="max-w-5xl"
          title={activeCert.title}
          subtitle={`Penerbit: ${activeCert.issuer} · Tahun ${activeCert.period}`}
          toolbar={
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#111114]/10 bg-[#f0f0ed] px-6 py-3 sm:px-8">
              <span className="font-mono text-xs text-[#111114]/70">
                Verifikasi Dokumen Resmi
              </span>

              <div className="flex items-center gap-2.5">
                <a
                  href={activeCert.preview}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-full border border-[#111114]/15 bg-white px-3.5 py-1.5 font-mono text-xs font-semibold text-[#111114] shadow-sm hover:bg-[#111114] hover:text-white transition-all"
                >
                  <ExternalLink size={13} />
                  <span>Buka Gambar Asli</span>
                </a>
                <a
                  href={activeCert.preview}
                  download={`${activeCert.title.replace(/\s+/g, '_')}.webp`}
                  className="inline-flex items-center gap-1.5 rounded-full bg-[#111114] px-3.5 py-1.5 font-mono text-xs font-semibold text-white shadow-sm hover:bg-[#25252a] transition-all"
                >
                  <Download size={13} />
                  <span>Unduh</span>
                </a>
              </div>
            </div>
          }
        >
          <div className="flex flex-col gap-6">
            {/* Enlarged Certificate Viewport */}
            <div className="relative overflow-hidden rounded-2xl border border-[#111114]/15 bg-neutral-100 p-2 sm:p-4 flex items-center justify-center shadow-inner">
              <img
                src={activeCert.preview}
                alt={activeCert.title}
                className="max-h-[70vh] w-full object-contain rounded-lg"
                loading="eager"
              />
            </div>

            {/* Credential Details Description */}
            <div className="rounded-2xl border border-[#111114]/10 bg-white/70 p-5 sm:p-6 text-[#111114]">
              <h5 className="font-mono text-xs uppercase tracking-wider text-[#111114]/60 font-semibold">
                Keterangan Kompetensi &amp; Verifikasi
              </h5>
              <p className="mt-2 text-sm sm:text-base leading-relaxed text-[#111114]/85">
                {activeCert.description}
              </p>

              <div className="mt-4 pt-4 border-t border-[#111114]/10 flex flex-wrap gap-2">
                {activeCert.tags.map((t) => (
                  <span
                    key={t}
                    className="rounded-full bg-[#111114]/5 px-3 py-1 font-mono text-xs text-[#111114]/75"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </Modal>
      )}
    </section>
  );
};

export default Certificates;
