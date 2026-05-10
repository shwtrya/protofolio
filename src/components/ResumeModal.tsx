import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  Download,
  Eye,
  ExternalLink,
  Mail,
  Phone,
  MapPin,
  Github,
  Linkedin,
  User,
  Briefcase,
  GraduationCap,
  Award,
  FileText
} from 'lucide-react';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CV_FILE_PATH = '/Shawava_Tritya_CV.pdf';
const CV_FILE_NAME = 'Shawava_Tritya_CV.pdf';

const ResumeModal: React.FC<ResumeModalProps> = ({ isOpen, onClose }) => {
  useEffect(() => {
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscKey);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscKey);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = CV_FILE_PATH;
    link.download = CV_FILE_NAME;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 p-4"
        onClick={handleBackdropClick}
      >
        <motion.div
          initial={{ scale: 0.96, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.96, opacity: 0, y: 20 }}
          transition={{ duration: 0.2 }}
          className="max-h-[92vh] w-full max-w-6xl overflow-hidden rounded-lg border border-gray-200 bg-white shadow-2xl dark:border-gray-700 dark:bg-gray-800"
          onClick={(e) => e.stopPropagation()}
          role="dialog"
          aria-modal="true"
          aria-labelledby="resume-title"
        >
          <div className="flex flex-col gap-4 border-b border-gray-200 bg-gray-50 p-5 dark:border-gray-700 dark:bg-gray-900 sm:flex-row sm:items-center sm:justify-between sm:p-6">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-md bg-blue-600 text-white shadow-sm dark:bg-blue-500">
                <User size={24} />
              </div>
              <div>
                <h2 id="resume-title" className="text-2xl font-bold text-gray-900 dark:text-white">
                  Shawava Tritya
                </h2>
                <p className="font-medium text-blue-600 dark:text-blue-400">
                  Lulusan SMK - Teknik Komputer dan Jaringan
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={handleDownload}
                className="inline-flex min-h-[44px] items-center gap-2 rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 dark:bg-blue-500 dark:hover:bg-blue-600"
                aria-label="Download CV PDF"
              >
                <Download size={16} />
                Download PDF
              </button>

              <button
                type="button"
                onClick={onClose}
                className="rounded-md p-2 text-gray-500 transition hover:bg-gray-100 hover:text-gray-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-200"
                aria-label="Tutup modal CV"
              >
                <X size={20} />
              </button>
            </div>
          </div>

          <div className="max-h-[calc(92vh-120px)] overflow-y-auto">
            <div className="grid lg:grid-cols-[minmax(0,1fr)_minmax(340px,0.85fr)]">
              <div className="bg-gray-100 p-4 dark:bg-gray-950 sm:p-6">
                <div className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-inner dark:border-gray-700 dark:bg-gray-900">
                  <object
                    data={`${CV_FILE_PATH}#toolbar=0&navpanes=0&view=FitH`}
                    type="application/pdf"
                    aria-label="Preview CV Shawava Tritya"
                    className="h-[58vh] min-h-[420px] w-full"
                  >
                    <div className="flex min-h-[420px] flex-col items-center justify-center gap-3 p-6 text-center">
                      <FileText size={40} className="text-blue-600 dark:text-blue-400" />
                      <p className="font-semibold text-gray-900 dark:text-white">
                        Preview CV tidak tersedia di browser ini.
                      </p>
                      <a
                        href={CV_FILE_PATH}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-700"
                      >
                        <ExternalLink size={16} />
                        Buka PDF
                      </a>
                    </div>
                  </object>
                </div>

                <div className="mt-4 flex flex-col gap-3 sm:flex-row">
                  <a
                    href={CV_FILE_PATH}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-[44px] flex-1 items-center justify-center gap-2 rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                  >
                    <Eye size={16} />
                    Lihat PDF Lengkap
                  </a>
                  <button
                    type="button"
                    onClick={handleDownload}
                    className="inline-flex min-h-[44px] flex-1 items-center justify-center gap-2 rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-semibold text-gray-700 transition hover:border-blue-600 hover:text-blue-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 dark:hover:border-blue-400 dark:hover:text-blue-400"
                  >
                    <Download size={16} />
                    Download PDF
                  </button>
                </div>
              </div>

              <div className="space-y-5 p-5 sm:p-6">
                <div className="grid gap-3">
                  <InfoCard icon={Mail} title="Email" value="shawavatritya@gmail.com" />
                  <InfoCard icon={Phone} title="WhatsApp" value="085187805786" />
                  <InfoCard icon={MapPin} title="Domisili" value="Cileungsi, Bogor" />
                </div>

                <div className="flex gap-3">
                  <a
                    href="https://www.linkedin.com/in/shawava-tritya"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex min-h-[44px] flex-1 items-center justify-center gap-2 rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white transition hover:bg-blue-700"
                    aria-label="Profil LinkedIn Shawava Tritya"
                  >
                    <Linkedin size={18} />
                    LinkedIn
                  </a>
                  <a
                    href="https://github.com/CyXd404"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex min-h-[44px] flex-1 items-center justify-center gap-2 rounded-md bg-gray-800 px-3 py-2 text-sm font-semibold text-white transition hover:bg-gray-900 dark:bg-gray-700 dark:hover:bg-gray-600"
                    aria-label="Profil GitHub Shawava Tritya"
                  >
                    <Github size={18} />
                    GitHub
                  </a>
                </div>

                <ResumeSection icon={User} title="Profil Profesional">
                  <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
                    Lulusan SMK Negeri 1 Cileungsi jurusan Teknik Komputer dan Jaringan
                    dengan nilai rata-rata ijazah 85. Fokus pada jaringan komputer,
                    Arduino, IoT, data entry, serta pekerjaan produksi yang membutuhkan
                    ketelitian.
                  </p>
                </ResumeSection>

                <ResumeSection icon={Briefcase} title="Pengalaman Kerja">
                  <div className="space-y-4">
                    <ExperienceItem
                      title="Operator Produksi"
                      meta="PT Rekadaya Multi Adiprima - September sampai Desember 2025"
                      items={[
                        'Menyortir material sesuai standar kualitas.',
                        'Melakukan assembly double tape pada part felt.',
                        'Melakukan packing hasil assembly.'
                      ]}
                    />
                    <ExperienceItem
                      title="Operator Produksi"
                      meta="PT Serin Indonesia - Juni sampai September 2025"
                      items={[
                        'Memasang aksesoris silinder pada zipper tas.',
                        'Mengaplikasikan lem pada bahan tas sebelum dijahit.'
                      ]}
                    />
                    <ExperienceItem
                      title="Data Entry"
                      meta="PT Wova Group Indonesia - 2023 sampai 2025"
                      items={[
                        'Menginput dan memvalidasi data pelanggan.',
                        'Menyusun laporan data secara rapi dan akurat.'
                      ]}
                    />
                  </div>
                </ResumeSection>

                <ResumeSection icon={Award} title="Keahlian & Sertifikat">
                  <div className="space-y-4">
                    <SkillBlock
                      title="Hard Skills"
                      items={['Data Entry', 'Produksi', 'Arduino & IoT', 'Instalasi Jaringan']}
                      color="blue"
                    />
                    <SkillBlock
                      title="Soft Skills"
                      items={['Teliti', 'Disiplin', 'Komunikasi', 'Kerja Tim']}
                      color="emerald"
                    />
                    <div className="grid gap-2 text-sm text-gray-700 dark:text-gray-300">
                      <p className="rounded-md bg-gray-50 px-3 py-2 dark:bg-gray-700/50">
                        Sertifikat IT Specialist - Networking, 2025
                      </p>
                      <p className="rounded-md bg-gray-50 px-3 py-2 dark:bg-gray-700/50">
                        Sertifikat Praktek Kerja Lapangan PT Rekadaya Multi Adiprima, 2025
                      </p>
                    </div>
                  </div>
                </ResumeSection>

                <ResumeSection icon={FileText} title="Proyek Unggulan">
                  <div className="grid gap-3">
                    <ProjectItem
                      title="Smart Home Berbasis Arduino Uno"
                      text="Prototype monitoring suhu dan kontrol lampu menggunakan Arduino, sensor, relay, dan modul pendukung."
                    />
                    <ProjectItem
                      title="Instalasi ISP hingga Router"
                      text="Praktik instalasi jaringan dari persiapan perangkat, penataan kabel, konfigurasi router, sampai testing koneksi."
                    />
                  </div>
                </ResumeSection>

                <ResumeSection icon={GraduationCap} title="Pendidikan">
                  <div className="border-l-4 border-blue-500 pl-4">
                    <h4 className="font-semibold text-gray-900 dark:text-white">
                      SMK Negeri 1 Cileungsi
                    </h4>
                    <p className="text-sm font-medium text-blue-600 dark:text-blue-400">
                      Teknik Komputer dan Jaringan - 2023 sampai 2026
                    </p>
                    <p className="mt-1 text-sm text-gray-700 dark:text-gray-300">
                      Lulus - nilai rata-rata ijazah 85
                    </p>
                  </div>
                </ResumeSection>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

interface IconProps {
  size?: number;
  className?: string;
}

const InfoCard = ({
  icon: Icon,
  title,
  value
}: {
  icon: React.ComponentType<IconProps>;
  title: string;
  value: string;
}) => (
  <div className="flex items-center gap-3 rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800">
    <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-md bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400">
      <Icon size={18} />
    </div>
    <div>
      <p className="text-sm font-semibold text-gray-900 dark:text-white">{title}</p>
      <p className="text-sm text-gray-600 dark:text-gray-300">{value}</p>
    </div>
  </div>
);

const ResumeSection = ({
  icon: Icon,
  title,
  children
}: {
  icon: React.ComponentType<IconProps>;
  title: string;
  children: React.ReactNode;
}) => (
  <section className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-700 dark:bg-gray-800">
    <div className="mb-4 flex items-center gap-3">
      <div className="flex h-8 w-8 items-center justify-center rounded-md bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400">
        <Icon size={18} />
      </div>
      <h3 className="text-xl font-bold text-gray-900 dark:text-white">{title}</h3>
    </div>
    {children}
  </section>
);

const SkillBlock = ({
  title,
  items,
  color
}: {
  title: string;
  items: string[];
  color: 'blue' | 'emerald';
}) => {
  const classes =
    color === 'blue'
      ? 'bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300'
      : 'bg-emerald-50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300';

  return (
    <div>
      <h4 className="mb-2 font-semibold text-gray-900 dark:text-white">{title}</h4>
      <div className="flex flex-wrap gap-2">
        {items.map((item) => (
          <span key={item} className={`rounded-md px-3 py-1 text-sm font-medium ${classes}`}>
            {item}
          </span>
        ))}
      </div>
    </div>
  );
};

const ExperienceItem = ({
  title,
  meta,
  items
}: {
  title: string;
  meta: string;
  items: string[];
}) => (
  <div className="border-l-4 border-blue-500 pl-4">
    <h4 className="font-semibold text-gray-900 dark:text-white">{title}</h4>
    <p className="text-sm font-medium text-blue-600 dark:text-blue-400">{meta}</p>
    <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-gray-700 dark:text-gray-300">
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  </div>
);

const ProjectItem = ({ title, text }: { title: string; text: string }) => (
  <div className="rounded-lg bg-gray-50 p-4 dark:bg-gray-700/50">
    <h4 className="mb-2 font-semibold text-gray-900 dark:text-white">{title}</h4>
    <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">{text}</p>
  </div>
);

export default ResumeModal;
