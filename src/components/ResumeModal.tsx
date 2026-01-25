import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Download, FileText, Eye, Mail, Phone, MapPin, Github, Linkedin, User, Briefcase, GraduationCap, Award } from 'lucide-react';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ResumeModal: React.FC<ResumeModalProps> = ({ isOpen, onClose }) => {
  // Handle ESC key press
  useEffect(() => {
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscKey);
      document.body.style.overflow = 'hidden'; // Prevent background scroll
    }

    return () => {
      document.removeEventListener('keydown', handleEscKey);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  const handleDownload = () => {
    // Create a link element and trigger download
    const link = document.createElement('a');
    link.href = '/Shawava_Tritya_CV.pdf';
    link.download = 'Shawava_Tritya_CV.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-9999 flex items-center justify-center p-4"
        onClick={handleBackdropClick}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          transition={{ 
            type: "spring", 
            stiffness: 400, 
            damping: 25,
            duration: 0.3 
          }}
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-5xl w-full max-h-[90vh] mt-20 overflow-hidden border border-gray-200 dark:border-gray-700"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-900 dark:to-gray-800">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-indigo-600 dark:from-blue-500 dark:to-indigo-500 text-white rounded-xl flex items-center justify-center shadow-lg">
                <User size={24} />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Shawava Tritya
                </h2>
                <p className="text-blue-600 dark:text-blue-400 font-medium">
                  SMK Student - Teknik Komputer dan Jaringan
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleDownload}
                className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 shadow-sm hover:shadow-md"
                aria-label="Download CV PDF"
              >
                <Download size={16} />
                <span>Download PDF</span>
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onClose}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
                aria-label="Close modal"
              >
                <X size={20} />
              </motion.button>
            </div>
          </div>

          {/* Content */}
          <div className="overflow-y-auto max-h-[calc(90vh-140px)]">
            {/* Contact Information Cards */}
            <div className="p-6 bg-gray-50 dark:bg-gray-900/50">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="flex items-center space-x-3 bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700"
                >
                  <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-lg flex items-center justify-center">
                    <Mail size={18} />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">Email</p>
                    <p className="text-sm text-gray-600 dark:text-gray-300">shawavatritya@gmail.com</p>
                  </div>
                </motion.div>
                
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="flex items-center space-x-3 bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700"
                >
                  <div className="w-10 h-10 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-lg flex items-center justify-center">
                    <Phone size={18} />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">WhatsApp</p>
                    <p className="text-sm text-gray-600 dark:text-gray-300">085187805786</p>
                  </div>
                </motion.div>
                
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="flex items-center space-x-3 bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700"
                >
                  <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 rounded-lg flex items-center justify-center">
                    <MapPin size={18} />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">Domisili</p>
                    <p className="text-sm text-gray-600 dark:text-gray-300">Cileungsi, Bogor</p>
                  </div>
                </motion.div>
              </div>
              
              {/* Social Links */}
              <div className="flex justify-center space-x-4 mt-4">
                <motion.a
                  href="https://www.linkedin.com/in/shawava-tritya"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1 }}
                  className="w-10 h-10 bg-blue-600 hover:bg-blue-700 text-white rounded-lg flex items-center justify-center transition-colors duration-300"
                >
                  <Linkedin size={18} />
                </motion.a>
                <motion.a
                  href="https://github.com/CyXd404"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1 }}
                  className="w-10 h-10 bg-gray-800 hover:bg-gray-900 dark:bg-gray-700 dark:hover:bg-gray-600 text-white rounded-lg flex items-center justify-center transition-colors duration-300"
                >
                  <Github size={18} />
                </motion.a>
              </div>
            </div>

            {/* Main Content */}
            <div className="p-6 space-y-8">
              {/* Professional Profile */}
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700"
              >
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-lg flex items-center justify-center">
                    <User size={18} />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">Profil Profesional</h3>
                </div>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  Pelajar SMK Negeri 1 Cileungsi jurusan Teknik Komputer dan Jaringan (2023-2026). 
                  Memiliki minat besar di bidang teknologi, khususnya penggunaan mikrokontroler dan pengolahan data.
                </p>
              </motion.section>

              {/* Technical Skills */}
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700"
              >
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-8 h-8 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 rounded-lg flex items-center justify-center">
                    <Award size={18} />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">Keahlian Teknis</h3>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Hard Skills</h4>
                    <div className="flex flex-wrap gap-2">
                      {['Data Entry', 'Produksi', 'Arduino & IoT', 'Instalasi Jaringan'].map((skill) => (
                        <span key={skill} className="px-3 py-1 bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full text-sm">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Soft Skills</h4>
                    <div className="flex flex-wrap gap-2">
                      {['Teliti', 'Disiplin', 'Komunikasi', 'Kerja Tim'].map((skill) => (
                        <span key={skill} className="px-3 py-1 bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 rounded-full text-sm">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.section>

              {/* Work Experience */}
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700"
              >
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-8 h-8 bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 rounded-lg flex items-center justify-center">
                    <Briefcase size={18} />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">Pengalaman Kerja</h3>
                </div>
                <div className="space-y-6">
                  <div className="border-l-4 border-blue-500 pl-4">
                    <h4 className="font-semibold text-gray-900 dark:text-white">Operator Produksi Tas</h4>
                    <p className="text-blue-600 dark:text-blue-400 text-sm font-medium">PT Serin Indonesia • Juni-September 2025</p>
                    <ul className="text-sm text-gray-700 dark:text-gray-300 mt-2 space-y-1">
                      <li>• Memasang aksesoris silinder pada zipper tas</li>
                      <li>• Mengaplikasikan lem pada bahan tas sebelum dijahit</li>
                      <li>• Membantu proses produksi sesuai standar kerja</li>
                    </ul>
                  </div>
                  
                  <div className="border-l-4 border-emerald-500 pl-4">
                    <h4 className="font-semibold text-gray-900 dark:text-white">Data Entry</h4>
                    <p className="text-emerald-600 dark:text-emerald-400 text-sm font-medium">PT Wova Group Indonesia • 2023-2025</p>
                    <ul className="text-sm text-gray-700 dark:text-gray-300 mt-2 space-y-1">
                      <li>• Menginput dan memvalidasi data pelanggan</li>
                      <li>• Menyusun laporan data secara rapi dan akurat</li>
                    </ul>
                  </div>
                </div>
              </motion.section>

              {/* Projects */}
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700"
              >
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-8 h-8 bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 rounded-lg flex items-center justify-center">
                    <FileText size={18} />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">Proyek Unggulan</h3>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Smart Home Berbasis Arduino Uno</h4>
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                      Sistem monitoring lampu dan suhu ruangan dari jarak jauh menggunakan mikrokontroler Arduino.
                    </p>
                  </div>
                  <div className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Instalasi ISP hingga Router</h4>
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                      Pengaturan perangkat dan jaringan ISP secara teknis dari instalasi hingga konfigurasi.
                    </p>
                  </div>
                </div>
              </motion.section>

              {/* Education */}
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700"
              >
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-8 h-8 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 rounded-lg flex items-center justify-center">
                    <GraduationCap size={18} />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">Pendidikan</h3>
                </div>
                <div className="border-l-4 border-indigo-500 pl-4">
                  <h4 className="font-semibold text-gray-900 dark:text-white">SMK Negeri 1 Cileungsi</h4>
                  <p className="text-indigo-600 dark:text-indigo-400 text-sm font-medium">Teknik Komputer dan Jaringan • 2023-2026</p>
                  <p className="text-sm text-gray-700 dark:text-gray-300 mt-1">Pelajar Aktif</p>
                </div>
              </motion.section>
            </div>

            {/* Footer with additional actions */}
            <div className="p-6 bg-gray-50 dark:bg-gray-900/50 border-t border-gray-200 dark:border-gray-700">
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <motion.a
                  href="/Shawava_Tritya_CV.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex items-center justify-center space-x-2 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:border-blue-600 dark:hover:border-blue-400 hover:text-blue-600 dark:hover:text-blue-400 px-4 py-2 rounded-lg font-medium transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                >
                  <Eye size={16} />
                  <span>View Full PDF</span>
                </motion.a>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ResumeModal;