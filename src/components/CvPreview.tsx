import { ReactNode, useState } from 'react';
import {
  ArrowUpRight,
  Briefcase,
  CheckCircle2,
  Download,
  ExternalLink,
  FileText,
  GraduationCap,
  Layout,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  ShieldCheck,
  ZoomIn,
} from 'lucide-react';
import Modal from './ui/Modal';
import { profile } from '../data/navigation';

const CV_PREVIEW = '/proof/preview-cv.webp';

interface Props {
  className?: string;
  label?: string;
  showIcon?: boolean;
  icon?: ReactNode;
}

export const CvPreview = ({
  className = 'inline-flex items-center gap-2 rounded-full border border-[#111114]/15 bg-[#111114] px-6 py-3 font-mono text-xs uppercase tracking-wider text-white hover:bg-[#25252a] transition-all',
  label = 'Pratinjau CV',
  showIcon = false,
  icon,
}: Props) => {
  const [open, setOpen] = useState(false);
  const [viewMode, setViewMode] = useState<'readable' | 'document'>('readable');
  const [isZoomed, setIsZoomed] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className={className}
        aria-haspopup="dialog"
      >
        <span>{label}</span>
        {showIcon && (icon ?? <ArrowUpRight size={15} />)}
      </button>

      {open && (
        <Modal
          isOpen
          onClose={() => {
            setOpen(false);
            setIsZoomed(false);
          }}
          maxWidth="max-w-4xl"
          title="Curriculum Vitae"
          subtitle="Shawava Tritya · SMKN 1 Cileungsi (TKJ)"
          toolbar={
            <div className="flex flex-wrap items-center justify-between gap-2.5 border-b border-[#111114]/10 bg-[#f0f0ed] px-4 py-2.5 sm:px-8 sm:py-3">
              {/* Segmented Mode Switcher */}
              <div className="flex items-center rounded-full bg-[#111114]/8 p-1 border border-[#111114]/10">
                <button
                  type="button"
                  onClick={() => setViewMode('readable')}
                  className={`flex items-center gap-1.5 rounded-full px-3 py-1 font-mono text-xs font-semibold transition-all cursor-pointer ${
                    viewMode === 'readable'
                      ? 'bg-[#111114] text-white shadow-sm'
                      : 'text-[#111114]/70 hover:text-[#111114]'
                  }`}
                >
                  <FileText size={13} />
                  <span>Format Teks Jelas</span>
                </button>
                <button
                  type="button"
                  onClick={() => setViewMode('document')}
                  className={`flex items-center gap-1.5 rounded-full px-3 py-1 font-mono text-xs font-semibold transition-all cursor-pointer ${
                    viewMode === 'document'
                      ? 'bg-[#111114] text-white shadow-sm'
                      : 'text-[#111114]/70 hover:text-[#111114]'
                  }`}
                >
                  <Layout size={13} />
                  <span>Kertas Cetak (A4)</span>
                </button>
              </div>

              {/* Quick Action Links */}
              <div className="flex items-center gap-2">
                {viewMode === 'document' && (
                  <button
                    type="button"
                    onClick={() => setIsZoomed(!isZoomed)}
                    className="inline-flex items-center gap-1 rounded-full border border-[#111114]/15 bg-white px-3 py-1 font-mono text-[11px] font-semibold text-[#111114] shadow-sm hover:bg-[#111114] hover:text-white transition-all cursor-pointer"
                  >
                    <ZoomIn size={12} />
                    <span>{isZoomed ? 'Normal' : 'Zoom'}</span>
                  </button>
                )}

                <a
                  href={`https://wa.me/${profile.whatsapp}?text=Halo%20Shawava,%20saya%20tertarik%20dengan%20CV%20Anda.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 rounded-full bg-emerald-600 px-3 py-1 font-mono text-[11px] font-semibold text-white shadow-sm hover:bg-emerald-700 transition-all"
                >
                  <MessageCircle size={12} />
                  <span>WA</span>
                </a>

                <a
                  href={CV_PREVIEW}
                  download="CV_Shawava_Tritya.webp"
                  className="inline-flex items-center gap-1 rounded-full bg-[#111114] px-3 py-1 font-mono text-[11px] font-semibold text-white shadow-sm hover:bg-[#25252a] transition-all"
                >
                  <Download size={12} />
                  <span>Unduh</span>
                </a>
              </div>
            </div>
          }
        >
          {/* VIEW 1: FORMAT TEKS JELAS (Responsive, readable 14px+ native text on mobile) */}
          {viewMode === 'readable' && (
            <div className="space-y-6 text-[#111114]">
              {/* Profile Card Header */}
              <div className="rounded-2xl border border-[#111114]/12 bg-white p-5 sm:p-7 shadow-sm">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#111114]/10 pb-5">
                  <div>
                    <h3 className="font-serif text-2xl sm:text-3xl font-bold tracking-tight">
                      Shawava Tritya
                    </h3>
                    <p className="font-mono text-xs text-emerald-800 font-semibold uppercase tracking-wider mt-1">
                      Freshgraduate · Teknik Komputer &amp; Jaringan
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-2 text-xs font-mono text-[#111114]/70">
                    <span className="inline-flex items-center gap-1 rounded-full bg-neutral-100 px-3 py-1 border border-neutral-200">
                      <MapPin size={12} /> Bogor, Jawa Barat
                    </span>
                    <span className="inline-flex items-center gap-1 rounded-full bg-neutral-100 px-3 py-1 border border-neutral-200">
                      <Phone size={12} /> +62 858-8328-1031
                    </span>
                  </div>
                </div>

                <div className="pt-4">
                  <p className="font-mono text-[11px] uppercase tracking-wider text-[#111114]/50 font-bold mb-1.5">
                    Ringkasan Profil
                  </p>
                  <p className="text-sm leading-relaxed text-[#111114]/85">
                    Lulusan SMK Negeri 1 Cileungsi (TKJ). Memiliki minat tinggi pada posisi operator produksi manufaktur, instalasi jaringan, dan administrasi data entry. Berbekal pengalaman magang industri perakitan dan freelance data entry dengan kedisiplinan serta ketelitian tinggi.
                  </p>
                </div>
              </div>

              {/* Work Experience */}
              <div className="rounded-2xl border border-[#111114]/12 bg-white p-5 sm:p-7 shadow-sm">
                <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-wider font-bold text-[#111114]/60 mb-5">
                  <Briefcase size={16} className="text-[#111114]" />
                  <span>Pengalaman Kerja &amp; Industri</span>
                </div>

                <div className="space-y-6">
                  {/* Item 1 */}
                  <div className="border-l-2 border-[#111114]/15 pl-4 sm:pl-5 relative">
                    <span className="absolute -left-[5px] top-1 h-2 w-2 rounded-full bg-[#111114]" />
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                      <h4 className="font-serif text-lg font-bold text-[#111114]">
                        PT Rekadaya Multi Adiprima
                      </h4>
                      <span className="font-mono text-xs text-[#111114]/60">
                        Sep 2024 — Des 2024
                      </span>
                    </div>
                    <p className="font-mono text-xs text-emerald-800 font-semibold mb-2">
                      Operator Produksi (Internship) · Ciangsana, Bogor
                    </p>
                    <ul className="space-y-1.5 text-xs sm:text-sm text-[#111114]/80 list-disc list-inside leading-relaxed">
                      <li>Sortir material dan verifikasi spesifikasi fisik komponen otomotif</li>
                      <li>Assembly double tape pada part felt secara presisi dan rapi</li>
                      <li>Quality check (QC) produk akhir sebelum masuk packaging distribusi</li>
                      <li>Mencapai target output harian dengan kedisiplinan dan kerapian 5S</li>
                    </ul>
                  </div>

                  {/* Item 2 */}
                  <div className="border-l-2 border-[#111114]/15 pl-4 sm:pl-5 relative">
                    <span className="absolute -left-[5px] top-1 h-2 w-2 rounded-full bg-[#111114]" />
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                      <h4 className="font-serif text-lg font-bold text-[#111114]">
                        PT Serin Indonesia
                      </h4>
                      <span className="font-mono text-xs text-[#111114]/60">
                        Jun 2024 — Sep 2024
                      </span>
                    </div>
                    <p className="font-mono text-xs text-emerald-800 font-semibold mb-2">
                      Operator Produksi (Internship) · Bekasi
                    </p>
                    <ul className="space-y-1.5 text-xs sm:text-sm text-[#111114]/80 list-disc list-inside leading-relaxed">
                      <li>Pemasangan aksesoris silinder pada zipper tas sesuai SOP</li>
                      <li>Aplikasi perekat dan lem presisi pada material sebelum penjahitan</li>
                      <li>Pemeriksaan kerapian visual dan fungsi mekanik komponen</li>
                    </ul>
                  </div>

                  {/* Item 3 */}
                  <div className="border-l-2 border-[#111114]/15 pl-4 sm:pl-5 relative">
                    <span className="absolute -left-[5px] top-1 h-2 w-2 rounded-full bg-[#111114]" />
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                      <h4 className="font-serif text-lg font-bold text-[#111114]">
                        PT Wova Group Indonesia
                      </h4>
                      <span className="font-mono text-xs text-[#111114]/60">
                        2023 — Sekarang
                      </span>
                    </div>
                    <p className="font-mono text-xs text-emerald-800 font-semibold mb-2">
                      Data Entry Specialist (Freelance) · Cileungsi
                    </p>
                    <ul className="space-y-1.5 text-xs sm:text-sm text-[#111114]/80 list-disc list-inside leading-relaxed">
                      <li>Input dan validasi data berkala pelanggan tanpa duplikasi</li>
                      <li>Penyusunan rekapitulasi data siap baca untuk tim administrasi</li>
                      <li>Pemanfaatan spreadsheet digital mempercepat verifikasi data</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Education & Credentials Side-by-Side */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {/* Education */}
                <div className="rounded-2xl border border-[#111114]/12 bg-white p-5 shadow-sm">
                  <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-wider font-bold text-[#111114]/60 mb-3">
                    <GraduationCap size={16} className="text-[#111114]" />
                    <span>Pendidikan</span>
                  </div>
                  <h4 className="font-serif text-xl font-bold">SMK Negeri 1 Cileungsi</h4>
                  <p className="font-mono text-xs text-[#111114]/70 mt-0.5">
                    Teknik Komputer &amp; Jaringan (2022 — 2025)
                  </p>
                  <div className="mt-3 inline-flex items-center gap-1 rounded-full bg-emerald-50 px-3 py-1 font-mono text-xs font-semibold text-emerald-800 border border-emerald-200">
                    <CheckCircle2 size={13} />
                    <span>Nilai Ijazah: 85 / 100</span>
                  </div>
                </div>

                {/* Certification */}
                <div className="rounded-2xl border border-[#111114]/12 bg-white p-5 shadow-sm">
                  <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-wider font-bold text-[#111114]/60 mb-3">
                    <ShieldCheck size={16} className="text-emerald-700" />
                    <span>Sertifikasi Resmi</span>
                  </div>
                  <h4 className="font-serif text-lg font-bold">IT Specialist: Networking</h4>
                  <p className="font-mono text-xs text-emerald-800 font-semibold mt-0.5">
                    Certiport / Pearson VUE (2025)
                  </p>
                  <p className="mt-2 text-xs text-[#111114]/70 leading-relaxed">
                    Terverifikasi kompetensi TCP/IP, OSI Model, Subnetting, dan Network Troubleshooting.
                  </p>
                </div>
              </div>

              {/* Skills */}
              <div className="rounded-2xl border border-[#111114]/12 bg-white p-5 shadow-sm">
                <p className="font-mono text-xs uppercase tracking-wider font-bold text-[#111114]/60 mb-3">
                  Keahlian &amp; Software
                </p>
                <div className="flex flex-wrap gap-2">
                  {[
                    'Operasional Produksi',
                    'Assembly & Sortasi',
                    'Quality Control',
                    '5S Kerapian Kerja',
                    'Data Entry',
                    'Microsoft Excel',
                    'Microsoft Word',
                    'Google Spreadsheet',
                    'MikroTik Routing',
                    'FTTH Fiber Optic',
                    'IoT ESP8266 & Arduino',
                  ].map((skill) => (
                    <span
                      key={skill}
                      className="rounded-full bg-[#111114]/5 border border-[#111114]/10 px-3 py-1 font-mono text-xs text-[#111114] font-medium"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setViewMode('document')}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full border border-[#111114]/20 bg-white px-5 py-2.5 font-mono text-xs font-semibold text-[#111114] shadow-sm hover:bg-[#111114] hover:text-white transition-all cursor-pointer"
                >
                  <Layout size={14} />
                  <span>Lihat Format Kertas Cetak (A4)</span>
                </button>

                <a
                  href={CV_PREVIEW}
                  download="CV_Shawava_Tritya.webp"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full bg-[#111114] px-6 py-2.5 font-mono text-xs font-semibold text-white shadow-sm hover:bg-[#25252a] transition-all"
                >
                  <Download size={14} />
                  <span>Unduh Dokumen Asli</span>
                </a>
              </div>
            </div>
          )}

          {/* VIEW 2: FORMAT KERTAS CETAK A4 (With Zoom and Pan) */}
          {viewMode === 'document' && (
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between text-xs font-mono text-[#111114]/65 px-1">
                <span>Format Fisik Kertas A4</span>
                <span className="text-[11px] bg-neutral-200/80 px-2 py-0.5 rounded">
                  Gunakan tombol Zoom untuk teks lebih besar
                </span>
              </div>

              {/* Image viewport with smooth horizontal and vertical scroll */}
              <div
                className={`relative overflow-auto rounded-2xl border border-[#111114]/15 bg-white shadow-inner transition-all duration-300 ${
                  isZoomed ? 'p-3' : 'p-1'
                }`}
                style={{ maxHeight: '68vh' }}
              >
                <div className={`${isZoomed ? 'min-w-[760px] sm:min-w-[900px]' : 'w-full'}`}>
                  <img
                    src={CV_PREVIEW}
                    alt="Curriculum Vitae Shawava Tritya Lengkap"
                    width={1191}
                    height={1685}
                    className="h-auto w-full object-contain"
                    loading="eager"
                  />
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-3 pt-2 text-xs font-mono">
                <button
                  type="button"
                  onClick={() => setViewMode('readable')}
                  className="text-[#111114] font-semibold hover:underline cursor-pointer"
                >
                  ← Kembali ke Format Teks Jelas
                </button>

                <a
                  href={CV_PREVIEW}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 font-semibold text-[#111114] hover:underline"
                >
                  Buka Gambar Asli di Tab Baru <ExternalLink size={12} />
                </a>
              </div>
            </div>
          )}
        </Modal>
      )}
    </>
  );
};

export default CvPreview;
