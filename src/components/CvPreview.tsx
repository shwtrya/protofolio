import { ReactNode, useState } from 'react';
import { ArrowUpRight, Download, ExternalLink, Mail, MessageCircle, ZoomIn } from 'lucide-react';
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
          subtitle="Shawava Tritya · Teknik Komputer & Jaringan (SMKN 1 Cileungsi)"
          toolbar={
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#111114]/10 bg-[#f0f0ed] px-5 py-3 sm:px-8">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setIsZoomed(!isZoomed)}
                  className="inline-flex items-center gap-1.5 rounded-full border border-[#111114]/15 bg-white px-3.5 py-1.5 font-mono text-[11px] font-semibold text-[#111114] shadow-sm hover:bg-[#111114] hover:text-white transition-all cursor-pointer"
                >
                  <ZoomIn size={13} />
                  <span>{isZoomed ? 'Ukuran Normal' : 'Perbesar Tampilan'}</span>
                </button>

                <a
                  href={CV_PREVIEW}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-full border border-[#111114]/15 bg-white px-3.5 py-1.5 font-mono text-[11px] font-semibold text-[#111114] shadow-sm hover:bg-[#111114] hover:text-white transition-all"
                >
                  <ExternalLink size={13} />
                  <span className="hidden sm:inline">Buka Resolusi Penuh</span>
                  <span className="sm:hidden">Buka Penuh</span>
                </a>
              </div>

              {/* Quick Contact Buttons */}
              <div className="flex items-center gap-2">
                <a
                  href={`https://wa.me/${profile.whatsapp}?text=Halo%20Shawava,%20saya%20tertarik%20dengan%20profil%20dan%20CV%20Anda.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-full bg-emerald-600 px-3.5 py-1.5 font-mono text-[11px] font-semibold text-white shadow-sm hover:bg-emerald-700 transition-all"
                >
                  <MessageCircle size={13} />
                  <span>WhatsApp</span>
                </a>
                <a
                  href={`mailto:${profile.email}?subject=Tawaran%20Kerja%20/%20Diskusi%20CV%20Shawava%20Tritya`}
                  className="inline-flex items-center gap-1.5 rounded-full bg-[#111114] px-3.5 py-1.5 font-mono text-[11px] font-semibold text-white shadow-sm hover:bg-[#25252a] transition-all"
                >
                  <Mail size={13} />
                  <span className="hidden sm:inline">Email</span>
                </a>
              </div>
            </div>
          }
        >
          <div className="flex flex-col gap-6">
            {/* Quick Summary Bento Pill - Desktop Only */}
            <div className="hidden sm:grid sm:grid-cols-3 gap-3">
              <div className="rounded-xl border border-[#111114]/10 bg-white/80 p-3.5">
                <span className="block font-mono text-[10px] uppercase tracking-wider text-[#111114]/50">
                  Pendidikan
                </span>
                <span className="font-semibold text-xs sm:text-sm text-[#111114]">
                  SMKN 1 Cileungsi (TKJ)
                </span>
                <span className="block text-[11px] text-emerald-700 font-mono mt-0.5 font-medium">
                  Rata-rata Ijazah 85/100
                </span>
              </div>

              <div className="rounded-xl border border-[#111114]/10 bg-white/80 p-3.5">
                <span className="block font-mono text-[10px] uppercase tracking-wider text-[#111114]/50">
                  Pengalaman
                </span>
                <span className="font-semibold text-xs sm:text-sm text-[#111114]">
                  3+ Peran Praktik &amp; Industri
                </span>
                <span className="block text-[11px] text-[#111114]/65 font-mono mt-0.5">
                  PT Rekadaya · PT Serin · Wova
                </span>
              </div>

              <div className="rounded-xl border border-[#111114]/10 bg-white/80 p-3.5">
                <span className="block font-mono text-[10px] uppercase tracking-wider text-[#111114]/50">
                  Sertifikasi
                </span>
                <span className="font-semibold text-xs sm:text-sm text-[#111114]">
                  IT Specialist: Networking
                </span>
                <span className="block text-[11px] text-emerald-700 font-mono mt-0.5 font-medium">
                  Certiport Terverifikasi
                </span>
              </div>
            </div>

            {/* Resume Image View Container with Scroll Pan */}
            <div
              className={`relative overflow-x-auto overflow-y-hidden rounded-2xl border border-[#111114]/15 bg-white shadow-md transition-all duration-300 ${
                isZoomed ? 'p-2 my-2' : ''
              }`}
            >
              <div className={`${isZoomed ? 'min-w-[800px]' : 'w-full'}`}>
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

            {/* Note & Direct Download */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 rounded-xl border border-[#111114]/10 bg-white/60 p-4 text-xs text-[#111114]/75">
              <p className="leading-relaxed text-center sm:text-left">
                Salinan dokumen PDF resmi, ijazah terlegalisir, dan transkrip nilai siap dikirimkan langsung untuk verifikasi rekruter.
              </p>
              <a
                href={CV_PREVIEW}
                download="CV_Shawava_Tritya.webp"
                className="shrink-0 inline-flex items-center gap-1.5 rounded-full border border-[#111114]/20 bg-[#111114] px-4 py-2 font-mono text-xs font-semibold text-white shadow-sm hover:bg-[#25252a] transition-all"
              >
                <Download size={14} />
                <span>Unduh Berkas</span>
              </a>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
};

export default CvPreview;
