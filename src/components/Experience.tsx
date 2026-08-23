import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, MapPin, Building } from 'lucide-react';

const Experience = () => {
  const experiences = [
    {
      title: 'Operator Produksi',
      company: 'PT Rekadaya Multi Adiprima',
      location: 'Ciangsana',
      period: 'September - Desember 2025',
      description: [
        'Menyortir material sesuai standar kualitas untuk mengurangi risiko produk tidak sesuai.',
        'Melakukan assembly double tape pada part felt dengan rapi dan presisi.',
        'Melakukan packing produk hasil assembly agar aman dan siap distribusi.',
        'Membantu menjaga kelancaran proses produksi dan target kerja harian.'
      ],
      tags: ['Magang', 'Quality Control', 'Assembly', 'Packing']
    },
    {
      title: 'Operator Produksi',
      company: 'PT Serin Indonesia',
      location: 'Bekasi',
      period: 'Juni - September 2025',
      description: [
        'Memasang aksesoris silinder pada zipper tas sesuai arahan kerja.',
        'Mengaplikasikan lem pada bahan tas sebelum proses jahit.',
        'Membantu proses produksi agar berjalan sesuai standar kerja.',
        'Menjaga kebersihan area kerja dan kerapian alat.'
      ],
      tags: ['Magang', 'Produksi', 'Ketelitian', 'Kerja Tim']
    },
    {
      title: 'Data Entry',
      company: 'PT Wova Group Indonesia',
      location: 'Cileungsi',
      period: '2023 - 2025',
      description: [
        'Menginput dan memvalidasi data pelanggan secara teliti.',
        'Menyusun laporan data agar mudah dibaca dan diperiksa kembali.',
        'Menjaga konsistensi format data saat menangani pekerjaan berulang.',
        'Mendukung kebutuhan administrasi tim menggunakan tools digital.'
      ],
      tags: ['Freelance', 'Data Entry', 'Microsoft Office', 'Administrasi']
    },
    {
      title: 'Commissioning Engineer',
      company: 'GPON Network Installation',
      location: 'Cileungsi, Bogor',
      period: 'Agustus 2026',
      description: [
        'GPON OLT HSGQ-E04R commissioning: verified PON1 link active, 1×8 PLC splitter cascaded topology, fiber routing & termination quality check.',
        'Commissioned FTTH bench mock-up: 2x Outdoor Optical Distribution Box (FDB), 1×8 PLC-M-1-8 splitters, SC/UPC connector termination, yellow fiber jumper routing between OLT → splitter #1 → splitter #2 → ONT.',
        'Tested and documented mid-stage commissioning: PON port status (1 of 4 active), uplink Ethernet connectivity, power-up verification, loss budget assessment (cascaded 1×8+1×8 ≈ 21 dB total split loss).',
        'Produced technical report: splitter type, connector spec (SC/UPC, 0.9mm pigtail), adapter row configuration, topology diagram, cable management gaps identified for hand-over.'
      ],
      tags: ['GPON', 'PLC Splitter', 'FTTH', 'Commissioning', 'Fiber Optic', 'OLT', 'HSGQ-E04R']
    }
  ];

  return (
    <section id="experience" className="py-20 bg-white dark:bg-gray-900 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <p className="mb-2 text-sm font-semibold uppercase tracking-wide text-blue-600 dark:text-blue-400">
            Pengalaman
          </p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Pengalaman Kerja
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Pengalaman magang dan freelance yang membentuk kedisiplinan, ketelitian,
            serta kemampuan bekerja sesuai standar.
          </p>
        </motion.div>

        <div className="space-y-8">
          {experiences.map((experience, index) => (
            <motion.article
              key={experience.title + experience.company}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 md:p-8 transition-shadow duration-300 border border-gray-100 dark:border-gray-700 hover:shadow-lg"
            >
              <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-6">
                <div className="flex-1">
                  <h3 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-2">
                    {experience.title}
                  </h3>
                  <div className="flex flex-col gap-2 text-gray-600 dark:text-gray-300 sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-6">
                    <div className="flex items-center space-x-2">
                      <Building size={16} />
                      <span className="font-medium">{experience.company}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <MapPin size={16} />
                      <span>{experience.location}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Calendar size={16} />
                      <span>{experience.period}</span>
                    </div>
                  </div>
                </div>
              </div>

              <ul className="space-y-2 mb-6">
                {experience.description.map((item) => (
                  <li key={item} className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-blue-600 dark:bg-blue-400 rounded-full mt-2.5 flex-shrink-0"></div>
                    <span className="text-gray-700 dark:text-gray-300 leading-relaxed">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>

              <div className="flex flex-wrap gap-2 sm:gap-3">
                {experience.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-md text-sm font-medium"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
