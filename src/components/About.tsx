import React from 'react';
import { motion } from 'framer-motion';
import { Code, Palette, Zap } from 'lucide-react';

const About = () => {
  const features = [
    {
      icon: Code,
      title: 'Technical Skills',
      description: 'Menguasai Arduino, IoT, instalasi jaringan, dan data entry dengan teliti.'
    },
    {
      icon: Palette,
      title: 'Problem Solving',
      description: 'Mampu menganalisis dan menyelesaikan masalah teknis dengan pendekatan sistematis.'
    },
    {
      icon: Zap,
      title: 'Team Work',
      description: 'Bekerja dengan disiplin, teliti, dan bertanggung jawab dalam tim maupun individu.'
    }
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
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">Tentang Saya</h2>
          <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto px-4">
            Saya adalah pelajar SMK Negeri 1 Cileungsi, jurusan Teknik Komputer dan Jaringan (Pelajar aktif 2023–2026). 
            Saya memiliki minat besar di bidang teknologi, khususnya penggunaan mikrokontroler dan pengolahan data.
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
              src="https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=400&w=400"
              alt="Shawava Tritya - Pelajar SMK Teknik Komputer dan Jaringan"
              width="400"
              height="400"
              className="w-full max-w-xs sm:max-w-sm md:max-w-md mx-auto rounded-2xl shadow-2xl hover:shadow-3xl transition-shadow duration-300"
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
            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white" role="heading" aria-level="3">Perjalanan Saya</h3>
            <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 leading-relaxed">
              Sejak kecil, saya sudah tertarik dengan gadget dan teknologi. Di SMK, saya memilih jurusan 
              Teknik Komputer dan Jaringan untuk mengembangkan kemampuan praktis saya. Selama ini, saya belajar 
              merakit sistem berbasis Arduino, memonitor suhu dan lampu dari jarak jauh, serta memahami instalasi jaringan.
            </p>
            <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 leading-relaxed">
              Di samping itu, pengalaman kerja 
              dan freelance memberikan saya wawasan tentang dunia industri dan pentingnya ketelitian serta efisiensi.
              Saya selalu berusaha belajar dan berkembang agar siap menghadapi tantangan di dunia profesional.
            </p>
            <div className="flex flex-wrap gap-2 sm:gap-3 mt-6">
              {['Arduino', 'IoT', 'Data Entry', 'Network Installation', 'Microsoft Office', 'Production'].map((tech) => (
                <span
                  key={tech}
                  className="px-3 sm:px-4 py-1 sm:py-2 bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full text-xs sm:text-sm font-medium hover:bg-blue-100 dark:hover:bg-blue-800/50 transition-colors duration-200"
                >
                  {tech}
                </span>
              ))}
            </div>
          </motion.div>
        </div>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8 px-4 md:px-0">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className="text-center p-4 sm:p-6 rounded-xl bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-300 border border-gray-100 dark:border-gray-700"
            >
              <div className="inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 bg-blue-600 dark:bg-blue-500 text-white rounded-full mb-4 hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors duration-300">
                <feature.icon size={20} className="sm:w-6 sm:h-6" />
              </div>
              <h4 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mb-2" role="heading" aria-level="4">{feature.title}</h4>
              <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
