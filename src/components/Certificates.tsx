import { useState } from 'react';
import { FileText, ShieldCheck, ZoomIn } from 'lucide-react';
import Modal from './ui/Modal';
import { Reveal, SectionHeader } from './ui/Section';
import Scroll3D from './ui/Scroll3D';
import TiltCard from './ui/TiltCard';

interface Certificate {
  title: string;
  issuer: string;
  period: string;
  description: string;
  /** Rendered page-1 JPG, so preview works in every browser (no PDF plugin). */
  preview: string;
  tags: string[];
}

const certificates: Certificate[] = [
  {
    title: 'Sertifikat IT Specialist - Networking',
    issuer: 'Kompetensi Jaringan Komputer',
    period: '2025',
    description:
      'Bukti kompetensi IT Specialist bidang networking, mencakup pemahaman jaringan komputer dan troubleshooting dasar.',
    preview: '/proof/preview-Sertifikat_IT_Specialist_Networking_2025.webp',
    tags: ['Networking', 'Troubleshooting', 'IT Specialist'],
  },
  {
    title: 'Sertifikat Praktek Kerja Lapangan',
    issuer: 'PT Rekadaya Multi Adiprima',
    period: '2025',
    description:
      'Bukti pelaksanaan PKL di PT Rekadaya Multi Adiprima pada lingkungan produksi dengan fokus ketelitian dan standar kerja.',
    preview: '/proof/preview-Sertifikat_PKL_PT_Rekadaya_2025.webp',
    tags: ['PKL', 'Produksi', 'Quality Control'],
  },
];

const Certificates = () => {
  const [activeCert, setActiveCert] = useState<Certificate | null>(null);

  return (
    <section id="certificates" className="section bg-bg">
      <div className="container-responsive">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <SectionHeader
            kicker="SERTIFIKASI"
            title="Bukti Kompetensi & PKL"
            lead="Dokumen resmi yang memvalidasi kompetensi jaringan dan pengalaman praktik industri."
          />
          <div className="t-mono flex items-center gap-1.5 text-accent">
            <ShieldCheck size={16} />
            <span>2 DOKUMEN TERVERIFIKASI</span>
          </div>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {certificates.map((cert, i) => (
            <Reveal key={cert.title} delay={i * 0.08}>
              <Scroll3D
                className="h-full"
                rotateX={5}
                rotateY={i === 0 ? 2 : -2}
                drift={20}
                scaleAmount={0.985}
              >
                <TiltCard maxTilt={6} className="h-full rounded-[14px]">
                  <article className="card card-interactive group flex h-full flex-col overflow-hidden">
                {/* Thumbnail — clickable, opens lightbox */}
                <button
                  type="button"
                  onClick={() => setActiveCert(cert)}
                  className="relative block w-full overflow-hidden border-b border-line bg-surface2"
                  aria-label={`Pratinjau ${cert.title}`}
                >
                  <img
                    src={cert.preview}
                    alt={`Pratinjau halaman pertama ${cert.title}`}
                    width={1584}
                    height={1224}
                    loading="lazy"
                    decoding="async"
                    className="h-48 w-full object-cover object-top transition-transform duration-300 ease-out group-hover:scale-[1.03] sm:h-56"
                  />
                  <span className="absolute inset-0 flex items-center justify-center bg-black/45 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                    <span className="flex items-center gap-2 rounded-[10px] bg-bg px-3 py-2 text-sm font-semibold text-fg">
                      <ZoomIn size={15} />
                      Perbesar
                    </span>
                  </span>
                  <span className="t-mono absolute left-3 top-3 rounded-[6px] border border-line bg-bg/90 px-2 py-1 backdrop-blur-sm">
                    {cert.period}
                  </span>
                </button>

                <div className="flex flex-1 flex-col justify-between p-6 sm:p-7">
                  <div>
                    <div className="flex items-start gap-3">
                      <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-[8px] bg-accent-soft text-accent">
                        <FileText size={20} />
                      </span>
                      <div className="min-w-0">
                        <h3 className="t-h3">{cert.title}</h3>
                        <p className="mt-1 text-sm font-semibold text-accent">{cert.issuer}</p>
                      </div>
                    </div>

                    <p className="t-body mt-4">{cert.description}</p>

                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {cert.tags.map((t) => (
                        <span key={t} className="tag">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="mt-6 flex flex-wrap gap-2 border-t border-line pt-4">
                    <button
                      type="button"
                      onClick={() => setActiveCert(cert)}
                      className="btn btn-primary text-sm"
                    >
                      <ZoomIn size={15} />
                      Pratinjau
                    </button>
                  </div>
                </div>
                  </article>
                </TiltCard>
              </Scroll3D>
            </Reveal>
          ))}
        </div>
      </div>

      {activeCert && (
        <Modal
          isOpen
          onClose={() => setActiveCert(null)}
          title={activeCert.title}
          subtitle={`${activeCert.issuer} · ${activeCert.period}`}
        >
          <div className="flex flex-col gap-4">
            {/* Image preview: reliable everywhere, unlike embedded PDF. */}
            <div className="overflow-hidden rounded-[10px] border border-line bg-surface2">
              <img
                src={activeCert.preview}
                alt={`Sertifikat ${activeCert.title} dari ${activeCert.issuer}, tahun ${activeCert.period}`}
                width={1584}
                height={1224}
                className="h-auto w-full"
              />
            </div>

            <p className="t-body text-sm">
              Pratinjau ini adalah render halaman pertama dokumen. Salinan resmi dapat saya kirimkan
              langsung saat dihubungi.
            </p>
          </div>
        </Modal>
      )}
    </section>
  );
};

export default Certificates;
