import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, Calendar, MapPin, Award } from 'lucide-react';

const Education = () => {
  const education = {
    degree: 'Teknik Komputer dan Jaringan',
    school: 'SMK Negeri 1 Cileungsi',
    location: 'Cileungsi, Bogor',
    period: '2023 - 2026',
    status: 'Lulus - Rata-rata Ijazah 85',
    description:
      'Mempelajari instalasi jaringan, konfigurasi perangkat, sistem komputer, dan dasar pemrograman mikrokontroler dengan fokus pada praktik langsung.',
    achievements: [
      'Lulus dengan nilai rata-rata ijazah 85.',
      'Mengembangkan kemampuan melalui praktikum Arduino dan IoT.',
      'Memiliki pengalaman magang di lingkungan produksi.',
      'Memiliki pengalaman freelance data entry dan administrasi.'
    ],
    coursework: [
      'Instalasi Jaringan',
      'Konfigurasi Router',
      'Sistem Komputer',
      'Arduino',
      'Manajemen Data'
    ]
  };

  const skillNotes = [
    {
      title: 'Hard Skills',
      value: 'Data entry, produksi, Arduino & IoT, instalasi jaringan'
    },
    {
      title: 'Soft Skills',
      value: 'Teliti, disiplin, komunikasi, kerja tim'
    },
    {
      title: 'Software & Tools',
      value: 'Microsoft Word, Excel, PowerPoint, Canva'
    }
  ];

  return (
    <section id="education" className="py-20 bg-gray-50 dark:bg-gray-800 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <p className="mb-2 text-sm font-semibold uppercase tracking-wide text-blue-600 dark:text-blue-400">
            Pendidikan
          </p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Pendidikan & Dasar Keahlian
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Latar belakang pendidikan yang mendukung minat saya di bidang jaringan,
            mikrokontroler, dan pekerjaan teknis.
          </p>
        </motion.div>

        <motion.article
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="bg-white dark:bg-gray-900 rounded-lg p-6 md:p-8 shadow-lg border border-gray-100 dark:border-gray-700"
        >
          <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-6">
            <div className="flex-1">
              <div className="flex items-start space-x-3 mb-3">
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-blue-600 dark:bg-blue-500 text-white rounded-md flex items-center justify-center flex-shrink-0">
                  <GraduationCap size={24} />
                </div>
                <div>
                  <h3 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-1">
                    {education.degree}
                  </h3>
                  <p className="text-lg font-semibold text-blue-600 dark:text-blue-400 mb-2">
                    {education.school}
                  </p>
                </div>
              </div>

              <div className="flex flex-col gap-2 text-gray-600 dark:text-gray-300 sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-6 mb-4">
                <div className="flex items-center space-x-2">
                  <MapPin size={16} />
                  <span>{education.location}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Calendar size={16} />
                  <span>{education.period}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Award size={16} />
                  <span>{education.status}</span>
                </div>
              </div>
            </div>
          </div>

          <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
            {education.description}
          </p>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div>
              <h4 className="font-semibold text-gray-900 dark:text-white mb-3">
                Pencapaian Utama
              </h4>
              <ul className="space-y-2">
                {education.achievements.map((achievement) => (
                  <li key={achievement} className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-emerald-500 dark:bg-emerald-400 rounded-full mt-2.5 flex-shrink-0"></div>
                    <span className="text-gray-700 dark:text-gray-300 text-sm">
                      {achievement}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-gray-900 dark:text-white mb-3">
                Materi Relevan
              </h4>
              <div className="flex flex-wrap gap-2">
                {education.coursework.map((course) => (
                  <span
                    key={course}
                    className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-md text-sm"
                  >
                    {course}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {skillNotes.map((item) => (
              <div
                key={item.title}
                className="rounded-lg border border-gray-200 bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-800"
              >
                <h4 className="font-semibold text-gray-900 dark:text-white mb-1">
                  {item.title}
                </h4>
                <p className="text-sm leading-relaxed text-gray-600 dark:text-gray-300">
                  {item.value}
                </p>
              </div>
            ))}
          </div>
        </motion.article>
      </div>
    </section>
  );
};

export default Education;
