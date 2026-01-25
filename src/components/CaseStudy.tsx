import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, BarChart3, Clock, Users, Star } from 'lucide-react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';
import { Bar, Doughnut } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

interface CaseStudyProps {
  isOpen: boolean;
  onClose: () => void;
  project: {
    title: string;
    description: string;
    problem: string;
    solution: string;
    results: string;
    beforeImage: string;
    afterImage: string;
    technologies: string[];
    duration: string;
    impact: {
      users: number;
      efficiency: number;
      satisfaction: number;
    };
    timeline: {
      phase: string;
      duration: string;
      description: string;
    }[];
  };
}

const CaseStudy: React.FC<CaseStudyProps> = ({ isOpen, onClose, project }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'process' | 'results'>('overview');
  const [imageComparison, setImageComparison] = useState(50);

  const impactData = {
    labels: ['Efisiensi', 'Kepuasan User', 'Performa Sistem'],
    datasets: [
      {
        data: [project.impact.efficiency, project.impact.satisfaction, 85],
        backgroundColor: ['#3B82F6', '#10B981', '#F59E0B'],
        borderWidth: 0,
      },
    ],
  };

  const timelineData = {
    labels: project.timeline.map(t => t.phase),
    datasets: [
      {
        label: 'Durasi (Hari)',
        data: project.timeline.map(t => parseInt(t.duration)),
        backgroundColor: '#3B82F6',
        borderRadius: 4,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="bg-white dark:bg-gray-800 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="p-6 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{project.title}</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
            >
              <X size={24} />
            </button>
          </div>

          {/* Tabs */}
          <div className="flex border-b border-gray-200 dark:border-gray-700">
            {[
              { id: 'overview', label: 'Overview' },
              { id: 'process', label: 'Proses' },
              { id: 'results', label: 'Hasil' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-6 py-3 font-medium transition-colors ${
                  activeTab === tab.id
                    ? 'text-blue-600 border-b-2 border-blue-600'
                    : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Content */}
          <div className="p-6 overflow-y-auto max-h-[60vh]">
            <AnimatePresence mode="wait">
              {activeTab === 'overview' && (
                <motion.div
                  key="overview"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Deskripsi Proyek</h3>
                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{project.description}</p>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Masalah</h4>
                      <p className="text-gray-600 dark:text-gray-300 text-sm">{project.problem}</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Solusi</h4>
                      <p className="text-gray-600 dark:text-gray-300 text-sm">{project.solution}</p>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Teknologi yang Digunakan</h4>
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="px-3 py-1 bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full text-sm"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Before/After Comparison */}
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Before vs After</h4>
                    <div className="relative bg-gray-100 dark:bg-gray-700 rounded-lg overflow-hidden">
                      <div className="flex">
                        <div className="w-1/2 relative">
                          <img src={project.beforeImage} alt="Before" className="w-full h-64 object-cover" />
                          <div className="absolute bottom-2 left-2 bg-red-500 text-white px-2 py-1 rounded text-sm">
                            Before
                          </div>
                        </div>
                        <div className="w-1/2 relative">
                          <img src={project.afterImage} alt="After" className="w-full h-64 object-cover" />
                          <div className="absolute bottom-2 right-2 bg-green-500 text-white px-2 py-1 rounded text-sm">
                            After
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === 'process' && (
                <motion.div
                  key="process"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Timeline Pengerjaan</h3>
                    <div className="space-y-4">
                      {project.timeline.map((phase, index) => (
                        <div key={index} className="flex items-start space-x-4">
                          <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                            {index + 1}
                          </div>
                          <div className="flex-1">
                            <h4 className="font-semibold text-gray-900 dark:text-white">{phase.phase}</h4>
                            <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">{phase.duration}</p>
                            <p className="text-gray-600 dark:text-gray-300 text-sm">{phase.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Durasi per Fase</h4>
                    <div className="bg-white dark:bg-gray-700 p-4 rounded-lg">
                      <Bar data={timelineData} options={chartOptions} />
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === 'results' && (
                <motion.div
                  key="results"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Hasil & Impact</h3>
                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-6">{project.results}</p>
                  </div>

                  {/* Statistics Cards */}
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg text-center">
                      <Users className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                      <div className="text-2xl font-bold text-blue-600">{project.impact.users}+</div>
                      <div className="text-sm text-gray-600 dark:text-gray-300">Users Terdampak</div>
                    </div>
                    <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg text-center">
                      <BarChart3 className="w-8 h-8 text-green-600 mx-auto mb-2" />
                      <div className="text-2xl font-bold text-green-600">{project.impact.efficiency}%</div>
                      <div className="text-sm text-gray-600 dark:text-gray-300">Peningkatan Efisiensi</div>
                    </div>
                    <div className="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-lg text-center">
                      <Star className="w-8 h-8 text-yellow-600 mx-auto mb-2" />
                      <div className="text-2xl font-bold text-yellow-600">{project.impact.satisfaction}%</div>
                      <div className="text-sm text-gray-600 dark:text-gray-300">Kepuasan User</div>
                    </div>
                  </div>

                  {/* Impact Chart */}
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Visualisasi Impact</h4>
                    <div className="bg-white dark:bg-gray-700 p-4 rounded-lg">
                      <div className="max-w-xs mx-auto">
                        <Doughnut data={impactData} />
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default CaseStudy;