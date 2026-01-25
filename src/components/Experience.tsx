import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, MapPin, Building } from 'lucide-react';

const Experience = () => {
  const experiences = [
    {
      title: 'Operator Produksi Tas',
      company: 'PT Serin Indonesia',
      location: 'Bekasi',
      period: 'Juni - September 2025',
      description: [
        'Memasang aksesoris silinder pada zipper tas',
        'Mengaplikasikan lem pada bahan tas sebelum dijahit',
        'Membantu proses produksi sesuai standar kerja',
        'Menjaga kebersihan area kerja'
      ],
      technologies: ['Production', 'Quality Control', 'Manufacturing', 'Teamwork']
    },
    {
      title: 'Data Entry',
      company: 'PT Wova Group Indonesia',
      location: 'Cileungsi',
      period: '2023 - 2025',
      description: [
        'Menginput dan memvalidasi data pelanggan',
        'Menyusun laporan data secara rapi dan akurat',
        'Menjaga kecepatan dan ketelitian dalam entri data',
        'Mendukung administrasi tim dengan sistem digital'
      ],
      technologies: ['Microsoft Office', 'Data Entry', 'Excel', 'Administration']
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
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">Pengalaman Kerja</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Perjalanan profesional dan pengalaman yang membentuk karier saya
          </p>
        </motion.div>

        <div className="space-y-8">
          {experiences.map((experience, index) => (
            <motion.div
              key={experience.title + experience.company}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 md:p-8 hover:shadow-lg transition-shadow duration-300 border border-gray-100 dark:border-gray-700"
            >
              <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-6">
                <div className="flex-1">
                  <h3 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-2">
                    {experience.title}
                  </h3>
                  <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-6 text-gray-600 dark:text-gray-300 mb-4">
                    <div className="flex items-center space-x-2 mb-2 sm:mb-0">
                      <Building size={16} />
                      <span className="font-medium">{experience.company}</span>
                    </div>
                    <div className="flex items-center space-x-2 mb-2 sm:mb-0">
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
                {experience.description.map((item, itemIndex) => (
                  <li key={itemIndex} className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-blue-600 dark:bg-blue-400 rounded-full mt-2.5 flex-shrink-0"></div>
                    <span className="text-gray-700 dark:text-gray-300 leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>

              <div className="flex flex-wrap gap-2 sm:gap-3">
                {experience.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1 bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full text-sm font-medium hover:bg-blue-100 dark:hover:bg-blue-800/50 transition-colors duration-200"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
