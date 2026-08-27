import React, { Suspense, lazy, useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ThemeProvider } from './contexts/ThemeContext';
import { ToastProvider } from './components/ToastNotification';
import { useKeyboardShortcuts } from './hooks/useKeyboardShortcuts';
import { trackVisitor } from './lib/supabase';

import Header from './components/Header';
import Footer from './components/Footer';
import LoadingSpinner from './components/LoadingSpinner';
import Skills from './components/Skills';
import Certificates from './components/Certificates';
import VisitorCounter from './components/VisitorCounter';
import ScrollProgress from './components/ScrollProgress';
import BackToTop from './components/BackToTop';

// Retry logic untuk lazy loading
const retryLazyLoad = <T,>(importFunc: () => Promise<T>, retries = 3, delay = 1000): Promise<T> => {
  return new Promise<T>((resolve, reject) => {
    importFunc()
      .then(resolve)
      .catch((error) => {
        if (retries === 1) {
          console.error('Failed to load module after retries:', error);
          reject(error);
          return;
        }
        console.warn(`Retrying module load... (${retries - 1} attempts left)`);
        setTimeout(() => {
          retryLazyLoad(importFunc, retries - 1, delay).then(resolve, reject);
        }, delay);
      });
  });
};

// Lazy load components dengan retry logic
const Hero = lazy(() => retryLazyLoad(() => import('./components/Hero')));
const About = lazy(() => retryLazyLoad(() => import('./components/About')));
const Experience = lazy(() => retryLazyLoad(() => import('./components/Experience')));
const Projects = lazy(() => retryLazyLoad(() => import('./components/Projects')));
const Education = lazy(() => retryLazyLoad(() => import('./components/Education')));
const References = lazy(() => retryLazyLoad(() => import('./components/References')));
const Contact = lazy(() => retryLazyLoad(() => import('./components/Contact')));
const NotFound = lazy(() => retryLazyLoad(() => import('./components/NotFound')));

function KeyboardShortcutsWrapper() {
  useKeyboardShortcuts();
  return null;
}

function RouteTracker() {
  const location = useLocation();

  useEffect(() => {
    void trackVisitor();
  }, [location.pathname]);

  return null;
}

function App() {
  const [appKey, setAppKey] = useState(0);
  useEffect(() => {
    const handleModuleError = (event: ErrorEvent) => {
      if (event.message && (
        event.message.includes('Failed to fetch dynamically imported module') ||
        event.message.includes('Importing a module script failed')
      )) {
        console.warn('Module loading error detected, forcing re-render...');
        setAppKey(prev => prev + 1);
      }
    };

    window.addEventListener('error', handleModuleError);
    return () => window.removeEventListener('error', handleModuleError);
  }, []);

  return (
    
      <ThemeProvider key={appKey}>
        <ToastProvider>
          <Router>
            <KeyboardShortcutsWrapper />
            <RouteTracker />
            <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300 overflow-x-hidden w-full">
              <ScrollProgress />
              <Header />
            <Suspense fallback={<LoadingSpinner />}>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/home" element={<HomePage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/experience" element={<ExperiencePage />} />
                <Route path="/projects" element={<ProjectsPage />} />
                <Route path="/education" element={<EducationPage />} />
                <Route path="/skills" element={<SkillsPage />} />
                <Route path="/certificates" element={<CertificatesPage />} />
                <Route path="/visitorcounter" element={<VisitorCounterPage />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
            <Footer />
            <BackToTop />
          </div>
        </Router>
      </ToastProvider>
    </ThemeProvider>
    
  );
}

function HomePage() {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6 }}>
      <Hero />
      <About />
      <Experience />
      <Projects />
      <Education />
      <Skills />
      <Certificates />
      <References />
      <VisitorCounterSection />
      <Contact />
    </motion.div>
  );
}

function AboutPage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="pt-20"
    >
      <div className="sr-only">
        <h1>Tentang Shawava Tritya</h1>
      </div>
      <About />
    </motion.div>
  );
}

function ExperiencePage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="pt-20"
    >
      <div className="sr-only">
        <h1>Pengalaman Kerja Shawava Tritya</h1>
      </div>
      <Experience />
    </motion.div>
  );
}

function ProjectsPage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="pt-20"
    >
      <div className="sr-only">
        <h1>Proyek Unggulan Shawava Tritya</h1>
      </div>
      <Projects />
    </motion.div>
  );
}

function EducationPage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="pt-20"
    >
      <div className="sr-only">
        <h1>Pendidikan Shawava Tritya</h1>
      </div>
      <Education />
    </motion.div>
  );
}

function SkillsPage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="pt-20"
    >
      <div className="sr-only">
        <h1>Keahlian Shawava Tritya</h1>
      </div>
      <Skills />
    </motion.div>
  );
}

function CertificatesPage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="pt-20"
    >
      <div className="sr-only">
        <h1>Sertifikat Shawava Tritya</h1>
      </div>
      <Certificates />
    </motion.div>
  );
}

function VisitorCounterSection() {
  return (
    <section
      id="visitorcounter"
      className="py-16 bg-gray-50 transition-colors duration-300 dark:bg-gray-800/50"
    >
      <div className="container-responsive">
        <VisitorCounter variant="inline" className="px-4 md:px-0" />
      </div>
    </section>
  );
}

function VisitorCounterPage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="pt-20"
    >
      <div className="sr-only">
        <h1>Statistik Kunjungan Shawava Tritya</h1>
      </div>
      <VisitorCounterSection />
    </motion.div>
  );
}

function ContactPage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="pt-20"
    >
      <div className="sr-only">
        <h1>Hubungi Saya - Shawava Tritya</h1>
      </div>
      <Contact />
    </motion.div>
  );
}

export default App;
