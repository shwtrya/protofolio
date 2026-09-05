import { useEffect, useState } from 'react';
import { Award, ExternalLink, GraduationCap, ShieldCheck, ZoomIn } from 'lucide-react';
import Modal from './ui/Modal';

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

  return (
    <section
      id="certificates"
      aria-labelledby="certificates-heading"
      className="relative z-30 bg-[#e8e8e5] text-[#111114] px-6 py-20 pb-28 sm:px-10 sm:py-28 lg:px-20 overflow-hidden"
    >
      {/* Watermark text */}
      <div
        aria-hidden="true"
        className="watermark-bg top-8 sm:top-12 text-[#111114]/[0.035]"
      >
        CREDENTIALS
      </div>

      <div className="relative z-10 mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="mb-14 sm:mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#111114]/10 pb-8">
          <div>
            <p className="font-mono text-[0.65rem] uppercase tracking-[0.3em] text-[#111114]/60">
              Verified Records
            </p>
            <h2
              id="certificates-heading"
              className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-bold uppercase tracking-tight text-[#111114]"
            >
              GitHub &amp; Certifications
            </h2>
          </div>

          <p className="max-w-md text-xs sm:text-sm text-[#111114]/65 leading-relaxed">
            Rekam jejak komitmen belajar, riwayat aktivitas publik, serta bukti kelulusan formal dan sertifikasi keahlian teknis.
          </p>
        </div>

        {/* 1. GitHub Contributions Bento Card (exact iqmal.dev) */}
        <div className="mb-16 rounded-3xl border border-[#111114]/12 bg-white/60 p-6 sm:p-10 shadow-sm backdrop-blur-sm">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left summary */}
            <div className="lg:col-span-4 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-[#111114]/60 mb-2">
                  <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                  GitHub Activity
                </div>
                <div className="font-editorial text-5xl sm:text-6xl font-bold text-[#111114] leading-none">
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
              <div className="min-w-[620px] rounded-2xl border border-[#111114]/10 bg-[#111114]/[0.02] p-4">
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
                            className={`h-2.5 w-2.5 rounded-sm ${color} transition-transform hover:scale-125`}
                          />
                        );
                      })
                    : Array.from({ length: 371 }).map((_, i) => {
                        const isFilled = (i % 7 === 1 || i % 7 === 3) && (i % 4 === 0 || i % 5 === 0);
                        return (
                          <div
                            key={i}
                            className={`h-2.5 w-2.5 rounded-sm ${
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
              className="group flex flex-col justify-between rounded-2xl border border-[#111114]/12 bg-white/60 overflow-hidden transition-all duration-300 hover:shadow-lg hover:border-[#111114]/30"
            >
              <div
                onClick={() => setActiveCert(cert)}
                className="relative aspect-[16/10] w-full overflow-hidden bg-[#dededb] cursor-pointer"
              >
                <img
                  src={cert.preview}
                  alt={cert.title}
                  width={600}
                  height={400}
                  loading="eager"
                  decoding="async"
                  className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/25 opacity-0 transition-opacity group-hover:opacity-100 flex items-center justify-center">
                  <span className="flex items-center gap-1.5 rounded-full bg-white/95 px-3.5 py-1.5 font-mono text-[0.68rem] font-bold text-[#111114] shadow-md">
                    <ZoomIn size={14} />
                    Perbesar Dokumen
                  </span>
                </div>
                <span className="absolute top-3 left-3 font-mono text-[0.65rem] font-bold uppercase rounded-md bg-[#111114]/85 text-white px-2.5 py-1 backdrop-blur-md">
                  {cert.period}
                </span>
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 text-[#111114]/60 font-mono text-[0.65rem] uppercase tracking-wider mb-2">
                    <ShieldCheck size={14} className="text-emerald-600" />
                    <span>{cert.issuer}</span>
                  </div>

                  <h3 className="text-lg font-bold text-[#111114] leading-snug">
                    {cert.title}
                  </h3>

                  <p className="mt-2 text-sm text-[#111114]/70 leading-relaxed">
                    {cert.description}
                  </p>
                </div>

                <div className="mt-5 pt-4 border-t border-[#111114]/10 flex items-center justify-between">
                  <div className="flex flex-wrap gap-1.5">
                    {cert.tags.map((t) => (
                      <span
                        key={t}
                        className="rounded bg-[#111114]/5 px-2 py-0.5 font-mono text-[0.62rem] text-[#111114]/70"
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  <button
                    type="button"
                    onClick={() => setActiveCert(cert)}
                    className="font-mono text-xs font-semibold text-[#111114] underline hover:no-underline cursor-pointer"
                  >
                    Buka
                  </button>
                </div>
              </div>
            </div>
          ))}

          {/* Education Card matching aspect ratio & height */}
          <div className="flex flex-col justify-between rounded-2xl border border-[#111114]/12 bg-white/60 overflow-hidden transition-all duration-300 hover:shadow-lg hover:border-[#111114]/30">
            {/* Header banner */}
            <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#18181c] text-white p-6 flex flex-col justify-between">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[0.65rem] font-bold uppercase rounded-md bg-white/15 text-white px-2.5 py-1 backdrop-blur-sm">
                  LULUS: 2025
                </span>
                <GraduationCap size={22} className="text-white/60" />
              </div>
              <div>
                <span className="font-mono text-[0.62rem] uppercase tracking-wider text-white/50 block">
                  NILAI RATA-RATA IJAZAH
                </span>
                <span className="font-editorial text-4xl sm:text-5xl font-bold text-white italic">
                  85.00
                </span>
                <span className="text-xs text-white/60 ml-2">/ 100</span>
              </div>
            </div>

            <div className="p-6 flex-1 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 text-[#111114]/60 font-mono text-[0.65rem] uppercase tracking-wider mb-2">
                  <Award size={14} className="text-[#111114]/80" />
                  <span>Pendidikan Formal</span>
                </div>

                <h3 className="text-lg font-bold text-[#111114] leading-snug">
                  SMK Negeri 1 Cileungsi
                </h3>
                <p className="mt-1 font-mono text-xs text-[#111114]/70 font-semibold">
                  Teknik Komputer dan Jaringan (TKJ)
                </p>

                <p className="mt-3 text-sm text-[#111114]/70 leading-relaxed">
                  Fokus kurikulum pada arsitektur komputer, TCP/IP, konfigurasi router Mikrotik &amp; Cisco Packet Tracer, serta dasar perakitan IoT berbasis mikrokontroler.
                </p>
              </div>

              <div className="mt-5 pt-4 border-t border-[#111114]/10 flex items-center justify-between text-xs font-mono text-[#111114]/60">
                <span>AKREDITASI: A</span>
                <span>KAB. BOGOR</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Certificate Modal Lightbox */}
      {activeCert && (
        <Modal
          isOpen={Boolean(activeCert)}
          onClose={() => setActiveCert(null)}
          title={activeCert.title}
          subtitle={`${activeCert.issuer} · ${activeCert.period}`}
        >
          <div className="space-y-4">
            <div className="overflow-hidden rounded-xl border border-line bg-black/5">
              <img
                src={activeCert.preview}
                alt={activeCert.title}
                width={1584}
                height={1224}
                className="h-auto w-full"
              />
            </div>
            <p className="text-sm text-foreground/80 leading-relaxed">
              {activeCert.description}
            </p>
          </div>
        </Modal>
      )}
    </section>
  );
};

export default Certificates;
