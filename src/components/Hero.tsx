import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  CheckCircle2,
  FileText,
  Github,
  Linkedin,
  Mail
} from 'lucide-react';
import { useGreeting } from '../hooks/useGreeting';
import { scrollToSection } from '../utils/scrollToSection';

const Hero = () => {
  const greeting = useGreeting();

  const focusAreas = [
    'Teknik Komputer dan Jaringan',
    'Arduino & IoT',
    'Instalasi jaringan',
    'Data entry dan administrasi'
  ];

  const handleSocialClick = () => {
    try {
      if (typeof window !== 'undefined') {
        const currentClicks = parseInt(localStorage.getItem('social_clicks') || '0', 10);
        localStorage.setItem('social_clicks', (currentClicks + 1).toString());
      }
    } catch (error) {
      console.warn('Failed to record social click.', error);
    }
  };

  return (
    <section
      id="home"
      className="relative overflow-hidden bg-white pt-20 pb-12 transition-colors duration-300 dark:bg-gray-900 sm:pt-28 sm:pb-16 md:pt-32 md:pb-20"
    >
      <div className="container-responsive">
        <div className="mx-auto max-w-4xl text-center">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-4 text-sm font-semibold uppercase tracking-wide text-blue-600 dark:text-blue-400"
          >
            {greeting}
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-3xl font-bold leading-tight text-gray-900 dark:text-white sm:text-4xl md:text-5xl lg:text-6xl"
          >
            Shawava Tritya
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mx-auto mt-5 max-w-3xl text-base leading-relaxed text-gray-600 dark:text-gray-300 sm:text-lg md:text-xl"
          >
            Lulusan SMK Negeri 1 Cileungsi jurusan Teknik Komputer dan Jaringan,
            fokus pada Arduino, IoT, instalasi jaringan, dan pekerjaan data yang
            rapi serta teliti.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="mt-6 flex flex-wrap justify-center gap-2 px-4"
          >
            {focusAreas.map((area) => (
              <span
                key={area}
                className="inline-flex items-center gap-2 rounded-md border border-gray-200 bg-gray-50 px-3 py-2 text-sm font-medium text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300"
              >
                <CheckCircle2 size={16} className="text-emerald-600 dark:text-emerald-400" />
                {area}
              </span>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row"
          >
            <button
              onClick={() => {
                const projectsSection = document.getElementById('projects');
                if (projectsSection) {
                  projectsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
              }}
              className="inline-flex min-h-[44px] w-full items-center justify-center gap-2 rounded-md bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 sm:w-auto"
            >
              Lihat Proyek
              <ArrowRight size={18} />
            </button>

            <a
              href="/Shawava_Tritya_CV.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-[44px] w-full items-center justify-center gap-2 rounded-md bg-emerald-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-emerald-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 sm:w-auto"
            >
              <FileText size={18} />
              Lihat CV
            </a>

            <button
              type="button"
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
              className="inline-flex min-h-[44px] w-full items-center justify-center gap-2 rounded-md border border-gray-300 px-5 py-3 text-sm font-semibold text-gray-700 transition hover:border-blue-600 hover:text-blue-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 dark:border-gray-600 dark:text-gray-300 dark:hover:border-blue-400 dark:hover:text-blue-400 sm:w-auto"
            >
              <Mail size={18} />
              Hubungi Saya
            </button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="mt-8 flex justify-center gap-4"
          >
            <a
              href="https://github.com/CyXd404"
              onClick={handleSocialClick}
              className="inline-flex min-h-[44px] min-w-[44px] items-center justify-center rounded-md border border-gray-200 text-gray-600 transition hover:border-gray-400 hover:text-gray-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 dark:border-gray-700 dark:text-gray-400 dark:hover:border-gray-500 dark:hover:text-white"
              aria-label="Kunjungi profil GitHub Shawava Tritya"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Github size={20} />
            </a>
            <a
              href="https://www.linkedin.com/in/shawava-tritya"
              onClick={handleSocialClick}
              className="inline-flex min-h-[44px] min-w-[44px] items-center justify-center rounded-md border border-gray-200 text-gray-600 transition hover:border-blue-500 hover:text-blue-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 dark:border-gray-700 dark:text-gray-400 dark:hover:border-blue-400 dark:hover:text-blue-400"
              aria-label="Kunjungi profil LinkedIn Shawava Tritya"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Linkedin size={20} />
            </a>
            <a
              href="mailto:shawavatritya@gmail.com"
              onClick={handleSocialClick}
              className="inline-flex min-h-[44px] min-w-[44px] items-center justify-center rounded-md border border-gray-200 text-gray-600 transition hover:border-emerald-500 hover:text-emerald-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 dark:border-gray-700 dark:text-gray-400 dark:hover:border-emerald-400 dark:hover:text-emerald-400"
              aria-label="Kirim email ke Shawava Tritya"
            >
              <Mail size={20} />
            </a>
          </motion.div>
        </div>
      </div>

    </section>
  );
};

export default Hero;
