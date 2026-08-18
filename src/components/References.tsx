import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase, FileText, FolderKanban } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { scrollToSectionById } from '../utils/scrollToSection';

interface ReferenceItem {
  icon: LucideIcon;
  title: string;
  description: string;
  to: string;
  actionLabel: string;
}

const referenceItems: ReferenceItem[] = [
  {
    icon: FileText,
    title: 'Sertifikat tersedia',
    description:
      'Dokumen sertifikat networking dan PKL dapat dilihat langsung di halaman sertifikat.',
    to: '#certificates',
    actionLabel: 'Lihat Sertifikat'
  },
  {
    icon: FolderKanban,
    title: 'Dokumentasi proyek',
    description:
      'Detail proyek dan dokumentasi tambahan dapat saya jelaskan atau tunjukkan saat dihubungi.',
    to: '#projects',
    actionLabel: 'Lihat Proyek'
  },
  {
    icon: Briefcase,
    title: 'Referensi kerja/praktik',
    description:
      'Referensi dari pengalaman kerja atau praktik dapat dibagikan saat proses rekrutmen jika diperlukan.',
    to: '#contact',
    actionLabel: 'Hubungi Saya'
  }
];

const References = () => {
  return (
    <section
      id="references"
      className="py-14 bg-white transition-colors duration-300 dark:bg-gray-900 sm:py-16"
    >
      <div className="container-responsive">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-8 text-center"
        >
          <p className="mb-2 text-sm font-semibold uppercase tracking-wide text-blue-600 dark:text-blue-400">
            Referensi
          </p>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white sm:text-3xl">
            Bukti Pendukung yang Bisa Dicek
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-gray-600 dark:text-gray-300 sm:text-base">
            Saya tidak menampilkan testimoni tanpa izin. Bukti pendukung tersedia melalui
            sertifikat, dokumentasi proyek, dan referensi saat proses rekrutmen.
          </p>
        </motion.div>

        <div className="grid gap-5 md:grid-cols-3">
          {referenceItems.map((item, index) => {
            const Icon = item.icon;

            return (
              <motion.article
                key={item.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: index * 0.1 }}
                className="flex min-h-full flex-col rounded-lg border border-gray-200 bg-gray-50 p-5 shadow-sm transition hover:shadow-lg dark:border-gray-700 dark:bg-gray-800"
              >
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-md bg-blue-600 text-white dark:bg-blue-500">
                  <Icon size={22} />
                </div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                  {item.title}
                </h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-gray-600 dark:text-gray-300">
                  {item.description}
                </p>
                <button
                  type="button"
                  onClick={() => {
                    scrollToSectionById(item.to);
                  }}
                  className="mt-5 inline-flex min-h-[44px] items-center justify-center gap-2 rounded-md border border-gray-300 px-4 py-2 text-sm font-semibold text-gray-700 transition hover:border-blue-600 hover:text-blue-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 dark:border-gray-600 dark:text-gray-300 dark:hover:border-blue-400 dark:hover:text-blue-400"
                >
                  <Icon size={16} />
                  {item.actionLabel}
                </button>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default References;
