import React from 'react';
import { motion } from 'framer-motion';

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
            Referensi Tidak Tersedia
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-gray-600 dark:text-gray-300 sm:text-base">
            Referensi proyek sedang dalam pengembangan. Silakan hubungi saya untuk detail lanjut.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default References;