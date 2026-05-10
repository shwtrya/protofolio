import React from 'react';
import { motion } from 'framer-motion';
import {
  Award,
  Briefcase,
  Calendar,
  Download,
  ExternalLink,
  FileText,
  Network,
  ShieldCheck
} from 'lucide-react';

const Certificates = () => {
  const certificates = [
    {
      icon: Network,
      title: 'Sertifikat IT Specialist - Networking',
      issuer: 'Kompetensi Jaringan Komputer',
      period: '2025',
      description:
        'Bukti kompetensi IT Specialist bidang networking, mencakup pemahaman jaringan komputer dan troubleshooting dasar.',
      href: '/Sertifikat_IT_Specialist_Networking_2025.pdf',
      fileName: 'Sertifikat IT Specialist - Networking, 2025.pdf',
      badge: 'Skill Certification',
      tags: ['Networking', 'Troubleshooting', 'IT Specialist'],
      iconStyle:
        'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300',
      badgeStyle:
        'bg-emerald-50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300',
      borderStyle: 'border-emerald-200 dark:border-emerald-800/70',
      accentStyle: 'bg-emerald-500'
    },
    {
      icon: Briefcase,
      title: 'Sertifikat Praktek Kerja Lapangan',
      issuer: 'PT Rekadaya Multi Adiprima',
      period: '2025',
      description:
        'Bukti pelaksanaan PKL di PT Rekadaya Multi Adiprima pada lingkungan produksi dengan fokus ketelitian dan standar kerja.',
      href: '/Sertifikat_PKL_PT_Rekadaya_2025.pdf',
      fileName: 'Sertifikat Praktek Kerja Lapangan, PT Rekadaya Multi Adiprima, 2025.pdf',
      badge: 'Industry Practice',
      tags: ['PKL', 'Produksi', 'Quality Control'],
      iconStyle: 'bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300',
      badgeStyle: 'bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300',
      borderStyle: 'border-blue-200 dark:border-blue-800/70',
      accentStyle: 'bg-blue-500'
    }
  ];

  return (
    <section id="certificates" className="py-14 bg-white transition-colors duration-300 dark:bg-gray-900 sm:py-16">
      <div className="container-responsive">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="mb-7 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="mb-2 text-sm font-semibold uppercase tracking-wide text-blue-600 dark:text-blue-400">
                Sertifikat
              </p>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white sm:text-3xl">
                Bukti Keahlian & Pengalaman
              </h2>
              <p className="mt-3 max-w-2xl text-sm leading-relaxed text-gray-600 dark:text-gray-300 sm:text-base">
                Sertifikat yang mendukung kemampuan jaringan komputer dan pengalaman
                kerja lapangan di lingkungan industri.
              </p>
            </div>

            <div className="inline-flex w-fit items-center gap-2 rounded-md border border-gray-200 px-3 py-2 text-sm font-semibold text-gray-700 dark:border-gray-700 dark:text-gray-300">
              <ShieldCheck size={16} className="text-emerald-600 dark:text-emerald-400" />
              2 Dokumen
            </div>
          </div>

          <div className="grid gap-5 lg:grid-cols-2">
            {certificates.map((certificate, index) => (
              <motion.article
                key={certificate.title + certificate.issuer}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ y: -4 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: index * 0.12 }}
                className={`group relative flex min-h-full flex-col overflow-hidden rounded-lg border bg-white shadow-sm transition-shadow duration-300 hover:shadow-xl dark:bg-gray-800 ${certificate.borderStyle}`}
              >
                <div className={`absolute inset-x-0 top-0 h-1 ${certificate.accentStyle}`} />

                <div className="bg-gray-100 p-3 dark:bg-gray-900/70 sm:p-4">
                  <div className="h-44 overflow-hidden rounded-lg border border-gray-200 bg-white shadow-inner dark:border-gray-700 dark:bg-gray-950 sm:h-52">
                    <object
                      data={`${certificate.href}#toolbar=0&navpanes=0&scrollbar=0&view=FitH`}
                      type="application/pdf"
                      aria-label={`Preview ${certificate.title}`}
                      className="h-full w-full"
                    >
                      <div className="flex h-full flex-col items-center justify-center gap-3 p-6 text-center">
                        <FileText size={32} className="text-blue-600 dark:text-blue-400" />
                        <p className="text-sm font-semibold text-gray-900 dark:text-white">
                          Preview PDF tidak tersedia di browser ini.
                        </p>
                        <a
                          href={certificate.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm font-semibold text-blue-600 hover:text-blue-700 dark:text-blue-400"
                        >
                          Buka sertifikat
                        </a>
                      </div>
                    </object>
                  </div>
                </div>

                <div className="flex flex-1 flex-col p-5 sm:p-6">
                  <div className="mb-5 flex flex-wrap items-start justify-between gap-3">
                    <div className={`flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg ${certificate.iconStyle}`}>
                      <certificate.icon size={24} />
                    </div>

                    <span className={`inline-flex items-center gap-2 rounded-md px-3 py-1 text-xs font-semibold ${certificate.badgeStyle}`}>
                      <Award size={14} />
                      {certificate.badge}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold leading-snug text-gray-900 dark:text-white sm:text-xl">
                    {certificate.title}
                  </h3>

                  <div className="mt-4 grid gap-3 text-sm text-gray-600 dark:text-gray-300">
                    <div className="flex items-center gap-2 rounded-md bg-gray-50 px-3 py-2 dark:bg-gray-900">
                      <Briefcase size={16} className="flex-shrink-0" />
                      <span className="font-medium">{certificate.issuer}</span>
                    </div>
                    <div className="flex items-center gap-2 rounded-md bg-gray-50 px-3 py-2 dark:bg-gray-900">
                      <Calendar size={16} className="flex-shrink-0" />
                      <span>{certificate.period}</span>
                    </div>
                  </div>

                  <p className="mt-5 text-sm leading-relaxed text-gray-600 dark:text-gray-300">
                    {certificate.description}
                  </p>

                  <div className="mt-5 rounded-lg border border-gray-200 bg-gray-50 p-3 dark:border-gray-700 dark:bg-gray-900">
                    <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
                      Nama Dokumen
                    </p>
                    <p className="break-words text-sm font-semibold text-gray-800 dark:text-gray-100">
                      {certificate.fileName}
                    </p>
                  </div>

                  <div className="mt-5 flex flex-wrap gap-2">
                    {certificate.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-md bg-gray-100 px-3 py-1 text-xs font-semibold text-gray-700 dark:bg-gray-700/70 dark:text-gray-200"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="mt-auto flex flex-col gap-3 pt-6 sm:flex-row">
                    <a
                      href={certificate.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-md bg-gray-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-gray-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 dark:bg-white dark:text-gray-900 dark:hover:bg-gray-100"
                      aria-label={`Lihat ${certificate.title}`}
                    >
                      <ExternalLink size={16} />
                      Lihat Sertifikat
                    </a>
                    <a
                      href={certificate.href}
                      download={certificate.fileName}
                      className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-md border border-gray-300 px-4 py-2 text-sm font-semibold text-gray-700 transition hover:border-blue-600 hover:text-blue-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 dark:border-gray-600 dark:text-gray-300 dark:hover:border-blue-400 dark:hover:text-blue-400"
                      aria-label={`Download ${certificate.title}`}
                    >
                      <Download size={16} />
                      Download PDF
                    </a>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Certificates;
