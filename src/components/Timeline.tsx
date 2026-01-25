import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, MapPin, Code, Briefcase } from 'lucide-react';

interface TimelineItem {
  id: string;
  title: string;
  date: string;
  location: string;
  description: string;
  image: string;
  technologies: string[];
  type: 'project' | 'work' | 'education';
  achievements?: string[];
}

const Timeline = () => {
  const timelineData: TimelineItem[] = [
    {
      id: '1',
      title: 'Memulai Perjalanan di SMK',
      date: 'Juli 2023',
      location: 'SMK Negeri 1 Cileungsi',
      description: 'Memulai pendidikan di jurusan Teknik Komputer dan Jaringan, mempelajari dasar-dasar networking dan pemrograman.',
      image: 'https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=300&w=400',
      technologies: ['Networking', 'Computer Systems', 'Basic Programming'],
      type: 'education',
      achievements: ['Adaptasi cepat dengan lingkungan baru', 'Memahami konsep dasar jaringan']
    },
    {
      id: '2',
      title: 'Freelance Data Entry',
      date: 'September 2023',
      location: 'PT Wova Group Indonesia',
      description: 'Memulai pekerjaan freelance sebagai data entry, mengembangkan ketelitian dan kecepatan dalam pengolahan data.',
      image: 'https://images.pexels.com/photos/590022/pexels-photo-590022.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=300&w=400',
      technologies: ['Microsoft Excel', 'Data Processing', 'Quality Control'],
      type: 'work',
      achievements: ['Tingkat akurasi 99.5%', 'Menyelesaikan 500+ entri per hari']
    },
    {
      id: '3',
      title: 'Proyek Arduino Pertama',
      date: 'Januari 2024',
      location: 'Lab SMK',
      description: 'Mengembangkan sistem monitoring suhu dan kelembaban menggunakan Arduino Uno dengan sensor DHT22.',
      image: 'https://images.pexels.com/photos/2582937/pexels-photo-2582937.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=300&w=400',
      technologies: ['Arduino', 'C++', 'Sensors', 'LCD Display'],
      type: 'project',
      achievements: ['Sistem berjalan stabil 24/7', 'Akurasi sensor ±0.5°C']
    },
    {
      id: '4',
      title: 'Smart Home IoT System',
      date: 'Mei 2024',
      location: 'Proyek Sekolah',
      description: 'Membangun sistem smart home yang dapat mengontrol lampu dan monitoring suhu dari smartphone.',
      image: 'https://images.pexels.com/photos/15470542/pexels-photo-15470542.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=300&w=400',
      technologies: ['Arduino', 'ESP8266', 'Blynk', 'IoT', 'Mobile App'],
      type: 'project',
      achievements: ['Kontrol real-time via smartphone', 'Hemat energi 30%']
    },
    {
      id: '5',
      title: 'Instalasi Jaringan ISP',
      date: 'Agustus 2024',
      location: 'Praktik Kerja Lapangan',
      description: 'Melakukan instalasi dan konfigurasi jaringan ISP dari router hingga end-user selama 3 bulan.',
      image: 'https://images.pexels.com/photos/159304/network-cable-ethernet-computer-159304.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=300&w=400',
      technologies: ['Router Configuration', 'Network Topology', 'Cable Management', 'Troubleshooting'],
      type: 'work',
      achievements: ['50+ instalasi berhasil', 'Zero downtime record']
    },
    {
      id: '6',
      title: 'Operator Produksi',
      date: 'Juni 2025',
      location: 'PT Serin Indonesia',
      description: 'Bekerja sebagai operator produksi tas, mengembangkan kemampuan kerja tim dan quality control.',
      image: 'https://images.pexels.com/photos/1267338/pexels-photo-1267338.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=300&w=400',
      technologies: ['Production Line', 'Quality Control', 'Team Coordination', 'Manufacturing'],
      type: 'work',
      achievements: ['Produktivitas 120% dari target', 'Zero defect rate']
    }
  ];

  const getIcon = (type: string) => {
    switch (type) {
      case 'project': return Code;
      case 'work': return Briefcase;
      case 'education': return Calendar;
      default: return Calendar;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'project': return 'bg-blue-500';
      case 'work': return 'bg-emerald-500';
      case 'education': return 'bg-purple-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <section id="timeline" className="py-20 bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <div className="container-responsive">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Perjalanan & Timeline
          </h2>
          <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto px-4">
            Ikuti perjalanan saya dari awal masuk SMK hingga pengalaman kerja dan proyek-proyek yang telah saya kerjakan
          </p>
        </motion.div>

        {/* Desktop Timeline - Horizontal */}
        <div className="hidden lg:block">
          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute top-1/2 left-0 right-0 h-1 bg-gray-300 dark:bg-gray-700 transform -translate-y-1/2"></div>
            
            <div className="flex justify-between items-center relative">
              {timelineData.map((item, index) => {
                const Icon = getIcon(item.type);
                return (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="flex flex-col items-center max-w-xs"
                  >
                    {/* Timeline Dot */}
                    <div className={`w-12 h-12 ${getTypeColor(item.type)} rounded-full flex items-center justify-center text-white mb-4 shadow-lg z-10`}>
                      <Icon size={20} />
                    </div>
                    
                    {/* Card */}
                    <motion.div
                      whileHover={{ scale: 1.05, y: -5 }}
                      className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700"
                    >
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-32 object-cover rounded-lg mb-3"
                        loading="lazy"
                      />
                      <h3 className="font-bold text-gray-900 dark:text-white text-sm mb-1">{item.title}</h3>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mb-2 flex items-center">
                        <Calendar size={12} className="mr-1" />
                        {item.date}
                      </p>
                      <p className="text-xs text-gray-600 dark:text-gray-300 mb-2">{item.description}</p>
                      <div className="flex flex-wrap gap-1">
                        {item.technologies.slice(0, 2).map((tech) => (
                          <span key={tech} className="px-2 py-1 bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded text-xs">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </motion.div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Mobile Timeline - Vertical */}
        <div className="lg:hidden">
          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gray-300 dark:bg-gray-700"></div>
            
            <div className="space-y-8">
              {timelineData.map((item, index) => {
                const Icon = getIcon(item.type);
                return (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="flex items-start space-x-4"
                  >
                    {/* Timeline Dot */}
                    <div className={`w-12 h-12 ${getTypeColor(item.type)} rounded-full flex items-center justify-center text-white shadow-lg z-10 flex-shrink-0`}>
                      <Icon size={20} />
                    </div>
                    
                    {/* Card */}
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700 flex-1"
                    >
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-40 object-cover rounded-lg mb-3"
                        loading="lazy"
                      />
                      <h3 className="font-bold text-gray-900 dark:text-white text-lg mb-2">{item.title}</h3>
                      <div className="flex items-center text-gray-500 dark:text-gray-400 text-sm mb-2">
                        <Calendar size={14} className="mr-2" />
                        <span>{item.date}</span>
                        <MapPin size={14} className="ml-4 mr-2" />
                        <span>{item.location}</span>
                      </div>
                      <p className="text-gray-600 dark:text-gray-300 text-sm mb-3 leading-relaxed">{item.description}</p>
                      
                      {item.achievements && (
                        <div className="mb-3">
                          <h4 className="font-semibold text-gray-900 dark:text-white text-sm mb-2">Pencapaian:</h4>
                          <ul className="space-y-1">
                            {item.achievements.map((achievement, i) => (
                              <li key={i} className="flex items-start text-xs text-gray-600 dark:text-gray-300">
                                <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full mt-1.5 mr-2 flex-shrink-0"></div>
                                {achievement}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                      
                      <div className="flex flex-wrap gap-1">
                        {item.technologies.map((tech) => (
                          <span key={tech} className="px-2 py-1 bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded text-xs">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </motion.div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Timeline;