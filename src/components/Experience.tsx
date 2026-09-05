import { useState } from 'react';
import { ArrowRight, Building, Calendar, CheckCircle2, MapPin } from 'lucide-react';

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
      'Menjalankan tugas pada lini produksi manufaktur otomotif/komponen dengan memprioritaskan ketelitian sortir material, perakitan part presisi, dan standardisasi kualitas.',
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
    title: 'Operator Produksi (PKL)',
    org: 'PT Serin Indonesia',
    place: 'Bekasi, Jawa Barat',
    period: 'Jun 2025 — Sep 2025',
    duration: '4 bulan',
    type: 'PKL / Industri',
    overview:
      'Mendukung kelancaran lini produksi perlengkapan dan tas dengan mematuhi alur instruksi kerja, persiapan komponen, serta pengeleman rapi sesuai standar.',
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
    place: 'Cileungsi, Jawa Barat',
    period: '2023 — 2025',
    duration: 'Freelance',
    type: 'Administrasi / Data',
    overview:
      'Menginput, merapikan, dan memverifikasi data operasional pelanggan secara teliti untuk memastikan konsistensi database digital dan kemudahan pembuatan laporan.',
    highlights: [
      'Input data berkala dan validasi field untuk mencegah duplikasi',
      'Pembersihan dan standardisasi format record berulang',
      'Penyusunan rekapitulasi data yang siap dibaca oleh tim administrasi',
      'Pemanfaatan spreadsheet digital untuk mempercepat verifikasi data',
    ],
  },
];

export const Experience = () => {
  const [activeIdx, setActiveIdx] = useState(0);
  const activeExp = experiences[activeIdx];

  return (
    <section
      id="experience"
      aria-labelledby="experience-heading"
      className="relative z-20 bg-[#18181c] text-[#f4f4f1] px-6 pt-16 pb-28 sm:px-10 sm:pt-20 sm:pb-36 lg:px-20 overflow-hidden"
    >
      {/* Background blurred watermark text */}
      <div
        aria-hidden="true"
        className="watermark-bg top-12 text-white/[0.035]"
      >
        EXPERIENCES
      </div>

      <div className="relative z-10 mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="mb-12 sm:mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/10 pb-8">
          <div>
            <p className="font-mono text-[0.68rem] uppercase tracking-[0.3em] text-white/50">
              CAREER ARCHIVE
            </p>
            <h2
              id="experience-heading"
              className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-bold uppercase tracking-[-0.03em] text-white"
            >
              Experiences
            </h2>
          </div>

          <p className="max-w-md text-sm sm:text-base text-white/60 leading-relaxed">
            Pengalaman kerja nyata di industri manufaktur dan administrasi digital yang membentuk kedisiplinan dan ketelitian.
          </p>
        </div>

        {/* Experience Selector Tabs (Pills) */}
        <div className="flex flex-wrap gap-2 sm:gap-3 mb-8">
          {experiences.map((exp, idx) => (
            <button
              key={exp.id}
              type="button"
              onClick={() => setActiveIdx(idx)}
              className={`flex items-center gap-3 rounded-full border px-4 py-2 sm:px-5 sm:py-2.5 font-mono text-[0.72rem] tracking-wider transition-all uppercase ${
                activeIdx === idx
                  ? 'border-white bg-white text-[#18181c] font-bold shadow-lg'
                  : 'border-white/15 bg-white/[0.04] text-white/70 hover:border-white/40 hover:text-white'
              }`}
            >
              <span className="opacity-60">{exp.num}</span>
              <span>{exp.org.split(' ')[1] || exp.org}</span>
            </button>
          ))}
        </div>

        {/* Active Experience Detailed Card */}
        <div className="rounded-3xl border border-white/12 bg-white/[0.03] p-6 sm:p-10 lg:p-14 backdrop-blur-md">
          <div className="grid lg:grid-cols-12 gap-8 lg:gap-12">
            {/* Left Col: Role, Org, Period */}
            <div className="lg:col-span-5 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-white/10 pb-8 lg:pb-0 lg:pr-10">
              <div>
                <div className="flex items-center gap-3 font-mono text-[0.68rem] text-white/50 tracking-widest uppercase">
                  <span>{activeExp.type}</span>
                  <span>•</span>
                  <span className="rounded-full border border-white/20 px-2 py-0.5 text-white/80">
                    {activeExp.duration}
                  </span>
                </div>

                <h3 className="mt-4 text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-white leading-tight">
                  {activeExp.title}
                </h3>

                <div className="mt-4 flex flex-col gap-1.5 text-sm sm:text-base text-white/80">
                  <div className="flex items-center gap-2 font-medium text-white">
                    <Building size={16} className="text-white/40" />
                    <span>{activeExp.org}</span>
                  </div>
                  <div className="flex items-center gap-2 text-white/60">
                    <MapPin size={16} className="text-white/40" />
                    <span>{activeExp.place}</span>
                  </div>
                  <div className="flex items-center gap-2 font-mono text-xs text-white/50 mt-1">
                    <Calendar size={14} className="text-white/40" />
                    <span>{activeExp.period}</span>
                  </div>
                </div>
              </div>

              <div className="hidden lg:block pt-12">
                <span className="font-editorial text-7xl font-bold text-white/10 italic select-none">
                  {activeExp.num}
                </span>
              </div>
            </div>

            {/* Right Col: Overview & Highlights */}
            <div className="lg:col-span-7 flex flex-col justify-between">
              <div>
                <p className="text-base sm:text-lg leading-relaxed text-white/80">
                  {activeExp.overview}
                </p>

                <div className="mt-8">
                  <p className="font-mono text-[0.68rem] font-semibold uppercase tracking-[0.25em] text-white/50 mb-4">
                    Key Highlights &amp; Tanggung Jawab
                  </p>

                  <div className="space-y-3">
                    {activeExp.highlights.map((h, i) => (
                      <div
                        key={i}
                        className="flex items-start gap-4 border-t border-white/10 pt-3"
                      >
                        <span className="font-mono text-xs font-semibold text-white/40 pt-0.5">
                          0{i + 1}
                        </span>
                        <p className="text-sm sm:text-base text-white/90 leading-normal">
                          {h}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
