import React from 'react';
import { motion } from 'framer-motion';
import { Code, Search, Users } from 'lucide-react';

const About = () => {
  const features = [
    {
      icon: Code,
      title: 'Kemampuan Teknis',
      description:
        'Berpengalaman belajar Arduino, IoT, instalasi jaringan, dan data entry secara praktis.'
    },
    {
      icon: Search,
      title: 'Problem Solving',
      description:
        'Terbiasa memeriksa masalah teknis secara bertahap dari gejala ke kemungkinan penyebab.'
    },
    {
      icon: Users,
      title: 'Kerja Tim',
      description:
        'Mampu bekerja disiplin, teliti, dan bertanggung jawab dalam tugas individu maupun tim.'
    }
  ];

  const focusTags = [
    'Arduino',
    'IoT',
    'Data Entry',
    'Instalasi Jaringan',
    'Microsoft Office',
    'Produksi'
  ];

  return (
    <section id="about" className="py-20 bg-white dark:bg-gray-900 transition-colors duration-300">
      <div className="container-responsive">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <p className="mb-2 text-sm font-semibold uppercase tracking-wide text-blue-600 dark:text-blue-400">
            Tentang
          </p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Tentang Saya
          </h2>
          <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto px-4">
            Saya adalah lulusan SMK Negeri 1 Cileungsi jurusan Teknik Komputer dan
            Jaringan dengan nilai rata-rata ijazah 85. Saya tertarik pada mikrokontroler,
            jaringan komputer, dan pekerjaan data yang membutuhkan ketelitian.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center mb-16">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="order-2 md:order-1 px-4 md:px-0"
          >
            <img
              src="https://i.ibb.co.com/JWBQMssz/image.png?auto=compress&cs=tinysrgb&dpr=2&h=400&w=400"
              alt="Shawava Tritya - Lulusan SMK Teknik Komputer dan Jaringan"
              width="400"
              height="400"
              className="w-full max-w-xs sm:max-w-sm md:max-w-md mx-auto rounded-lg shadow-2xl transition-shadow duration-300 hover:shadow-2xl"
              loading="lazy"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-6 order-1 md:order-2 px-4 md:px-0"
          >
            <h3
              className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white"
              role="heading"
              aria-level={3}
            >
              Profil Singkat
            </h3>
            <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 leading-relaxed">
              Di SMK, saya mengembangkan kemampuan praktis di bidang Teknik Komputer
              dan Jaringan. Saya belajar merakit prototype berbasis Arduino, memahami
              dasar instalasi jaringan, serta mengerjakan data entry dan administrasi
              dengan rapi.
            </p>
            <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 leading-relaxed">
              Pengalaman magang produksi dan freelance data entry membantu saya
              memahami disiplin kerja, ketelitian, komunikasi tim, dan pentingnya
              menyelesaikan tugas sesuai standar. Saya siap belajar lebih jauh di
              lingkungan profesional.
            </p>
            <div className="flex flex-wrap gap-2 sm:gap-3 mt-6">
              {focusTags.map((tech) => (
                <span
                  key={tech}
                  className="px-3 sm:px-4 py-1 sm:py-2 bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-md text-xs sm:text-sm font-medium"
                >
                  {tech}
                </span>
              ))}
            </div>
          </motion.div>
        </div>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8 px-4 md:px-0">
          {features.map((feature, index) => (
            <motion.article
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className="text-center p-4 sm:p-6 rounded-lg bg-gray-50 dark:bg-gray-800 transition-colors duration-300 border border-gray-100 dark:border-gray-700"
            >
              <div className="inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 bg-blue-600 dark:bg-blue-500 text-white rounded-md mb-4">
                <feature.icon size={20} className="sm:w-6 sm:h-6" />
              </div>
              <h4
                className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mb-2"
                role="heading"
                aria-level={4}
              >
                {feature.title}
              </h4>
              <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 leading-relaxed">
                {feature.description}
              </p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
