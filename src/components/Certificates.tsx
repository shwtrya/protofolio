import { useEffect, useState } from 'react';
import { Award, CheckCircle2, FileText, Github, GraduationCap, ShieldCheck, ZoomIn } from 'lucide-react';
import Modal from './ui/Modal';
import { profile } from '../data/navigation';

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
    issuer: 'Kompetensi Jaringan Komputer',
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
      aria-labelledby="credentials-heading"
      className="relative z-30 bg-[#e8e8e5] text-[#111114] px-6 pt-20 pb-28 sm:px-10 sm:pt-28 sm:pb-36 lg:px-20 border-t border-[#111114]/10 overflow-hidden"
    >
      <span id="credentials" className="sr-only" aria-hidden="true" />

      {/* Watermark */}
      <div
        aria-hidden="true"
        className="watermark-bg top-12 text-[#111114]/[0.04]"
      >
        CREDENTIALS
      </div>

      <div className="relative z-10 mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-14 sm:mb-20 flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#111114]/10 pb-8">
          <div>
            <p className="font-mono text-[0.68rem] uppercase tracking-[0.3em] text-[#111114]/60">
              CODING ACTIVITY &amp; CREDENTIALS
            </p>
            <h2
              id="credentials-heading"
              className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-bold uppercase tracking-[-0.03em] text-[#111114]"
            >
              GitHub &amp; Certifications
            </h2>
          </div>

          <p className="max-w-md text-sm sm:text-base text-[#111114]/65 leading-relaxed">
            Aktivitas repository GitHub terbuka dan validasi sertifikasi resmi yang menguji kompetensi jaringan serta etos kerja industri.
          </p>
        </div>

        {/* 1. GitHub Contributions Block */}
        <div className="mb-16 rounded-3xl border border-[#111114]/12 bg-white/40 p-6 sm:p-10 backdrop-blur-sm shadow-sm">
          <div className="grid lg:grid-cols-12 gap-8 items-center">
            {/* Left Stats */}
            <div className="lg:col-span-4 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 text-[#111114]/60 mb-3">
                  <Github size={18} />
                  <span className="font-mono text-[0.68rem] uppercase tracking-widest font-semibold">
                    GitHub Tracker (@shwtrya)
                  </span>
                </div>

                <div className="font-editorial text-5xl sm:text-6xl font-bold text-[#111114]">
                  {totalContrib}
                </div>
                <p className="mt-2 text-sm text-[#111114]/70">
                  kontribusi di GitHub dalam 365 hari terakhir
                </p>
              </div>

              <div className="mt-6 flex flex-wrap gap-4">
                <div className="rounded-xl border border-[#111114]/10 bg-white/60 px-4 py-2.5">
                  <span className="font-mono text-[0.62rem] uppercase tracking-wider text-[#111114]/50 block">
                    STATUS
                  </span>
                  <span className="font-mono text-sm font-bold text-[#111114]">
                    Active Contributor
                  </span>
                </div>
                <div className="rounded-xl border border-[#111114]/10 bg-white/60 px-4 py-2.5">
                  <span className="font-mono text-[0.62rem] uppercase tracking-wider text-[#111114]/50 block">
                    REPOSITORIES
                  </span>
                  <span className="font-mono text-sm font-bold text-[#111114]">
                    Public Projects
                  </span>
                </div>
              </div>
            </div>

            {/* Right Heatmap preview */}
            <div data-lenis-prevent="true" className="lg:col-span-8 overflow-x-auto pb-2">
              <p className="font-mono text-[0.65rem] uppercase tracking-wider text-[#111114]/50 mb-3">
                CONTRIBUTION GRAPH (PAST YEAR)
              </p>
              <div className="flex gap-[3px] min-w-[650px] p-2 rounded-xl bg-white/60 border border-[#111114]/10">
                {Array.from({ length: 50 }).map((_, weekIdx) => (
                  <div key={weekIdx} className="flex flex-col gap-[3px]">
                    {Array.from({ length: 7 }).map((_, dayIdx) => {
                      const itemIdx = weekIdx * 7 + dayIdx;
                      const day = contributions[itemIdx];
                      const level = day ? day.level : ((weekIdx + dayIdx) % 4 === 0 ? 1 : 0);

                      let bgClass = 'bg-[#111114]/5';
                      if (level === 1) bgClass = 'bg-[#111114]/25';
                      if (level === 2) bgClass = 'bg-[#111114]/45';
                      if (level === 3) bgClass = 'bg-[#111114]/70';
                      if (level >= 4) bgClass = 'bg-[#111114]';

                      return (
                        <div
                          key={dayIdx}
                          title={day ? `${day.date}: ${day.count} contributions` : 'Active commit'}
                          className={`h-2.5 w-2.5 rounded-[2px] ${bgClass} transition-transform hover:scale-125`}
                        />
                      );
                    })}
                  </div>
                ))}
              </div>

              <div className="mt-3 flex items-center justify-between text-xs text-[#111114]/50 font-mono">
                <a
                  href={profile.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline hover:text-[#111114]"
                >
                  Lihat profil GitHub lengkap ↗
                </a>
                <div className="flex items-center gap-1.5">
                  <span>Less</span>
                  <span className="h-2 w-2 rounded-[2px] bg-[#111114]/5" />
                  <span className="h-2 w-2 rounded-[2px] bg-[#111114]/25" />
                  <span className="h-2 w-2 rounded-[2px] bg-[#111114]/45" />
                  <span className="h-2 w-2 rounded-[2px] bg-[#111114]/70" />
                  <span className="h-2 w-2 rounded-[2px] bg-[#111114]" />
                  <span>More</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 2. Bento Grid for Certificates & Education */}
        <div className="grid md:grid-cols-3 gap-6">
          {/* Cert 1 */}
          {certificates.map((cert) => (
            <div
              key={cert.title}
              className="group flex flex-col justify-between rounded-2xl border border-[#111114]/12 bg-white/50 overflow-hidden transition-all duration-300 hover:shadow-lg hover:border-[#111114]/30"
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
                  loading="lazy"
                  className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/25 opacity-0 transition-opacity group-hover:opacity-100 flex items-center justify-center">
                  <span className="flex items-center gap-1.5 rounded-full bg-white/90 px-3 py-1.5 font-mono text-[0.68rem] font-bold text-[#111114]">
                    <ZoomIn size={14} />
                    Perbesar Dokumen
                  </span>
                </div>
                <span className="absolute top-3 left-3 font-mono text-[0.62rem] font-bold uppercase rounded-md bg-[#111114]/80 text-white px-2 py-0.5">
                  {cert.period}
                </span>
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 text-[#111114]/50 font-mono text-[0.65rem] uppercase tracking-wider mb-2">
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

                <div className="mt-4 pt-4 border-t border-[#111114]/10 flex items-center justify-between">
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
                    className="font-mono text-xs font-semibold text-[#111114] underline hover:no-underline"
                  >
                    Buka
                  </button>
                </div>
              </div>
            </div>
          ))}

          {/* Education Card */}
          <div className="flex flex-col justify-between rounded-2xl border border-[#111114]/12 bg-white/50 p-6 sm:p-8 transition-all duration-300 hover:shadow-lg hover:border-[#111114]/30">
            <div>
              <div className="flex items-center gap-2 text-[#111114]/50 font-mono text-[0.65rem] uppercase tracking-wider mb-3">
                <GraduationCap size={16} />
                <span>Pendidikan Formal</span>
              </div>

              <h3 className="text-xl font-bold text-[#111114] leading-tight">
                SMK Negeri 1 Cileungsi
              </h3>
              <p className="mt-1 font-mono text-xs text-[#111114]/70 font-semibold">
                Teknik Komputer dan Jaringan (TKJ)
              </p>

              <div className="my-5 p-4 rounded-xl bg-[#111114]/5 border border-[#111114]/10">
                <span className="font-mono text-[0.62rem] uppercase tracking-wider text-[#111114]/50 block">
                  NILAI RATA-RATA IJAZAH
                </span>
                <span className="font-editorial text-4xl font-bold text-[#111114]">
                  85.00
                </span>
                <span className="text-xs text-[#111114]/60 ml-2">/ 100</span>
              </div>

              <p className="text-sm text-[#111114]/70 leading-relaxed">
                Fokus kurikulum pada arsitektur komputer, TCP/IP, konfigurasi router Mikrotik &amp; Cisco Packet Tracer, serta dasar perakitan IoT berbasis mikrokontroler.
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-[#111114]/10 flex items-center justify-between text-xs font-mono text-[#111114]/60">
              <span>LULUS: 2025</span>
              <span>KAB. BOGOR</span>
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
