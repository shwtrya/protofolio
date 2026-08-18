import React, { useState, useEffect, useMemo, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Mail,
  Phone,
  MapPin,
  Send,
  Shield,
  Clock,
  Download,
  User,
  MessageSquare,
  Briefcase,
  FileText,
  Wrench,
  type LucideIcon
} from 'lucide-react';
import { isStorageAvailable, safeGetItem, safeParseInt, safeSetItem } from '../utils/storage';

type ContactIntent = {
  id: string;
  label: string;
  subject: string;
  message: string;
  icon: LucideIcon;
};

const contactIntents: ContactIntent[] = [
  {
    id: 'recruitment',
    label: 'Rekrutmen / kerja',
    subject: 'Diskusi kesempatan kerja',
    message:
      'Halo Shawava, saya ingin berdiskusi tentang kesempatan kerja yang sesuai dengan pengalaman TKJ, jaringan, IoT, atau administrasi data.',
    icon: Briefcase
  },
  {
    id: 'demo',
    label: 'Minta demo',
    subject: 'Permintaan demo proyek Smart Home',
    message:
      'Halo Shawava, saya ingin meminta demo atau penjelasan singkat tentang proyek Smart Home berbasis Arduino/IoT.',
    icon: MessageSquare
  },
  {
    id: 'documentation',
    label: 'Minta dokumentasi',
    subject: 'Permintaan dokumentasi proyek ISP',
    message:
      'Halo Shawava, saya ingin meminta dokumentasi proyek instalasi ISP hingga router untuk kebutuhan review portfolio.',
    icon: FileText
  },
  {
    id: 'collaboration',
    label: 'Kolaborasi teknis',
    subject: 'Diskusi kolaborasi teknis',
    message:
      'Halo Shawava, saya ingin berdiskusi tentang peluang kolaborasi teknis atau pekerjaan lapangan yang relevan.',
    icon: Wrench
  }
];

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    honeypot: '' // Anti-bot field (tidak ditampilkan ke user)
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [submitError, setSubmitError] = useState<string | null>(null);
  const storageAvailable = useMemo(() => isStorageAvailable(), []);
  const rateLimitRef = useRef({
    lastSubmitTime: 0,
    hourlySubmissions: 0,
    lastHourReset: 0
  });

  type RateLimitKey = keyof typeof rateLimitRef.current;

  const setRateLimitValue = useCallback(
    (key: RateLimitKey, value: number) => {
      rateLimitRef.current[key] = value;
      if (storageAvailable) {
        const stored = safeSetItem(key, value.toString());
        if (!stored) {
          console.warn(`Falling back to in-memory rate limit for key "${key}".`);
        }
      }
    },
    [storageAvailable]
  );

  const getRateLimitValue = useCallback(
    (key: RateLimitKey, defaultValue: number) => {
      if (storageAvailable) {
        return safeParseInt(
          safeGetItem(key, defaultValue.toString()),
          defaultValue
        );
      }
      return rateLimitRef.current[key] ?? defaultValue;
    },
    [storageAvailable]
  );

  const [lastSubmitTime, setLastSubmitTime] = useState<number>(() => {
    return getRateLimitValue('lastSubmitTime', 0);
  });
  const [selectedIntentId, setSelectedIntentId] = useState<string | null>(null);
  const [isTyping, setIsTyping] = useState<{[key: string]: boolean}>({});
  const [typingTimeout, setTypingTimeout] = useState<{[key: string]: ReturnType<typeof setTimeout> | null}>({});

  const COOLDOWN_TIME = 60000; // 1 menit
  const MAX_SUBMISSIONS_PER_HOUR = 3;

  useEffect(() => {
    setRateLimitValue('lastSubmitTime', lastSubmitTime);
  }, [lastSubmitTime, setRateLimitValue]);

  useEffect(() => {
    const lastHourReset = safeGetItem('lastHourReset');
    if (lastHourReset === null) {
      const now = Date.now();
      setRateLimitValue('lastHourReset', now);
      setRateLimitValue('hourlySubmissions', 0);
      return;
    }

    rateLimitRef.current.lastHourReset = safeParseInt(lastHourReset, 0);
    rateLimitRef.current.hourlySubmissions = getRateLimitValue(
      'hourlySubmissions',
      0
    );
  }, [getRateLimitValue, setRateLimitValue]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const fieldName = e.target.name;
    setFormData({ ...formData, [fieldName]: e.target.value });

    // Set typing indicator
    setIsTyping((prev) => ({ ...prev, [fieldName]: true }));

    // Clear previous timeout
    if (typingTimeout[fieldName]) {
      clearTimeout(typingTimeout[fieldName]);
    }

    // Set new timeout to remove typing indicator after 1 second
    const timeout = setTimeout(() => {
      setIsTyping((prev) => ({ ...prev, [fieldName]: false }));
    }, 1000);

    setTypingTimeout((prev) => ({ ...prev, [fieldName]: timeout }));
  };

  const handleIntentSelect = (intent: ContactIntent) => {
    setSelectedIntentId(intent.id);
    setFormData((prev) => ({
      ...prev,
      subject: intent.subject,
      message: prev.message.trim() === '' ? intent.message : prev.message
    }));
  };

  const getHourlySubmissionState = (now: number, persistReset: boolean) => {
    const hourlySubmissions = getRateLimitValue('hourlySubmissions', 0);
    const lastHourReset = getRateLimitValue('lastHourReset', 0);
    const shouldReset = now - lastHourReset > 3600000;

    if (shouldReset && persistReset) {
      setRateLimitValue('hourlySubmissions', 0);
      setRateLimitValue('lastHourReset', now);
    }

    return {
      hourlySubmissions: shouldReset ? 0 : hourlySubmissions,
      lastHourReset: shouldReset && persistReset ? now : lastHourReset
    };
  };

  const getRemainingCooldownSeconds = (now: number) => {
    const timeSinceLastSubmit = now - lastSubmitTime;
    const remaining = Math.ceil(
      (COOLDOWN_TIME - timeSinceLastSubmit) / 1000
    );
    return remaining > 0 ? remaining : 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Jika bot mengisi honeypot, langsung tolak.
    if (formData.honeypot.trim() !== '') {
      setSubmitStatus('error');
      setSubmitError('Pengiriman ditolak karena terdeteksi aktivitas mencurigakan.');
      return;
    }

    const now = Date.now();
    const timeSinceLastSubmit = now - lastSubmitTime;

    // Cek cooldown
    if (timeSinceLastSubmit < COOLDOWN_TIME) {
      setSubmitStatus('error');
      setSubmitError(
        `Cooldown masih aktif. Coba lagi dalam ${getRemainingCooldownSeconds(now)} detik.`
      );
      return;
    }

    // Reset per jam
    const { hourlySubmissions, lastHourReset } = getHourlySubmissionState(
      now,
      true
    );

    if (hourlySubmissions >= MAX_SUBMISSIONS_PER_HOUR) {
      const minutesUntilReset = Math.max(
        1,
        Math.ceil((3600000 - (now - lastHourReset)) / 60000)
      );
      setSubmitStatus('error');
      setSubmitError(
        `Batas ${MAX_SUBMISSIONS_PER_HOUR} pesan per jam tercapai. Coba lagi dalam ${minutesUntilReset} menit.`
      );
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('idle');
    setSubmitError(null);

    try {
      const response = await fetch('/api/sendEmail', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        throw new Error('Pengiriman gagal. Silakan coba lagi.');
      }

      setLastSubmitTime(now);
      setRateLimitValue('hourlySubmissions', hourlySubmissions + 1);
      setSubmitStatus('success');
      setSubmitError(null);
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
        honeypot: ''
      });
      setSelectedIntentId(null);
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : 'Terjadi kesalahan saat mengirim pesan.';
      console.error('Contact form submission failed:', error);
      setSubmitStatus('error');
      setSubmitError(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const canSubmit = () => {
    const now = Date.now();
    const timeSinceLastSubmit = now - lastSubmitTime;
    const { hourlySubmissions } = getHourlySubmissionState(now, false);
    return (
      timeSinceLastSubmit >= COOLDOWN_TIME &&
      hourlySubmissions < MAX_SUBMISSIONS_PER_HOUR
    );
  };

  const getRemainingCooldown = () => {
    return getRemainingCooldownSeconds(Date.now());
  };

  const downloadVCard = () => {
    const vCard = `BEGIN:VCARD
VERSION:3.0
FN:Shawava Tritya
TEL;TYPE=CELL:+6285187805786
EMAIL:shawavatritya@gmail.com
ADR;TYPE=HOME:;;Cileungsi;Bogor;Jawa Barat;;Indonesia
URL:https://github.com/CyXd404
URL:https://www.linkedin.com/in/shawava-tritya
TITLE:Lulusan SMK - Teknik Komputer dan Jaringan
ORG:SMK Negeri 1 Cileungsi
NOTE:Lulusan SMK TKJ | Nilai rata-rata ijazah 85 | Arduino | IoT | Instalasi Jaringan | Data Entry
END:VCARD`;

    const blob = new Blob([vCard], { type: 'text/vcard' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'Shawava_Tritya.vcf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  };

  const contactInfo = [
    {
      icon: Mail,
      title: 'Email',
      value: 'shawavatritya@gmail.com',
      link: 'mailto:shawavatritya@gmail.com'
    },
    {
      icon: Phone,
      title: 'WhatsApp',
      value: '085187805786',
      link: 'https://wa.me/6285187805786'
    },
    {
      icon: MapPin,
      title: 'Domisili',
      value: 'Cileungsi, Kab. Bogor, Jawa Barat',
      link: 'https://maps.app.goo.gl/9UCcE1a2dkAqDWUq5'
    }
  ];

  return (
    <section
      id="contact"
      className="py-14 sm:py-16 md:py-20 bg-gray-50 dark:bg-gray-800 transition-colors duration-300"
    >
      <div className="container-responsive">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-10 sm:mb-12 md:mb-14"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Hubungi Saya
          </h2>
          <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto px-4">
            Terbuka untuk kesempatan magang, kerja praktik, kolaborasi teknis, atau diskusi proyek.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-10">
          {/* LEFT SIDE */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="px-4 lg:px-0"
          >
            <div className="space-y-8">
              <div>
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  Mari Terhubung
                </h3>
                <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 leading-relaxed">
                  Saya siap belajar, membantu pekerjaan teknis, dan menjelaskan proyek yang
                  ada di portfolio ini dengan jujur. Silakan hubungi saya melalui email,
                  WhatsApp, atau form kontak.
                </p>
              </div>

              <div className="space-y-4">
                {contactInfo.map((info) => (
                  <motion.a
                    key={info.title}
                    href={info.link}
                    whileHover={{ x: 5, scale: 1.02 }}
                    className="flex items-center min-h-[56px] space-x-4 p-3.5 sm:p-4 bg-white dark:bg-gray-900 rounded-lg shadow-sm hover:shadow-lg transition-all duration-300 group focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 border border-gray-100 dark:border-gray-700"
                    {...(info.link.startsWith('http') && {
                      target: '_blank',
                      rel: 'noopener noreferrer'
                    })}
                  >
                    <div className="flex-shrink-0 w-12 h-12 sm:w-14 sm:h-14 bg-blue-600 dark:bg-blue-500 group-hover:bg-blue-700 dark:group-hover:bg-blue-600 text-white rounded-lg flex items-center justify-center transition-colors duration-300">
                      <info.icon size={18} className="sm:w-5 sm:h-5" />
                    </div>
                    <div>
                      <h4 className="text-sm sm:text-base text-gray-900 dark:text-white font-semibold">
                        {info.title}
                      </h4>
                      <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 max-w-[220px] sm:max-w-none line-clamp-2">
                        {info.value}
                      </p>
                    </div>
                  </motion.a>
                ))}

                <motion.button
                  onClick={downloadVCard}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full min-h-[44px] flex items-center justify-center space-x-3 p-3.5 sm:p-4 bg-gradient-to-r from-blue-600 to-emerald-600 dark:from-blue-500 dark:to-emerald-500 text-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 mt-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                >
                  <Download className="w-5 h-5" />
                  <span className="font-semibold text-sm sm:text-base">Download Kontak (vCard)</span>
                </motion.button>

                <div className="rounded-xl overflow-hidden shadow-md mt-6 pointer-events-auto touch-auto">
                  <iframe
                    title="Domisili Map"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d993.1633390811642!2d106.9597323!3d-6.408152199999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e6994aa2aee1d2f%3A0x65a8f73c2e7c6f1e!2sCileungsi%2C%20Bogor%2C%20Jawa%20Barat!5e0!3m2!1sen!2sid!4v1690000000000!5m2!1sen!2sid"
                    className="w-full h-48 sm:h-56 md:h-64 pointer-events-auto touch-auto"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  ></iframe>
                </div>
              </div>
            </div>
          </motion.div>

          {/* RIGHT SIDE (FORM) */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="px-4 lg:px-0"
          >
            <form
              onSubmit={handleSubmit}
              className="bg-white dark:bg-gray-900 p-5 sm:p-6 md:p-8 rounded-xl shadow-lg space-y-6 border border-gray-100 dark:border-gray-700"
            >
              {/* HONEYPOT FIELD (TERSEMBUNYI) */}
              <input
                type="text"
                name="honeypot"
                value={formData.honeypot}
                onChange={handleChange}
                style={{ display: 'none' }}
                tabIndex={-1}
                autoComplete="off"
              />

              {submitStatus === 'success' && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg flex items-start space-x-3"
                >
                  <Mail className="w-5 h-5 text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-green-800 dark:text-green-300 text-sm font-medium">
                      Pesan berhasil dikirim!
                    </p>
                  </div>
                </motion.div>
              )}

              {submitStatus === 'error' && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg flex items-start space-x-3"
                >
                  <Shield className="w-5 h-5 text-red-600 dark:text-red-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-red-800 dark:text-red-300 text-sm font-medium">
                      Gagal mengirim!
                    </p>
                    <p className="text-red-700 dark:text-red-400 text-xs mt-1">
                      {submitError ||
                        'Pastikan semua data benar atau coba beberapa saat lagi.'}
                    </p>
                  </div>
                </motion.div>
              )}

              <div className="p-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
                <div className="flex items-start space-x-3">
                  <Shield className="w-4 h-4 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-blue-800 dark:text-blue-300 text-xs font-medium">
                      Proteksi Anti-Spam Aktif
                    </p>
                    <p className="text-blue-700 dark:text-blue-400 text-xs mt-1">
                      Form dilindungi anti-spam. Maksimal 3 pesan per jam.
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-3 sm:gap-4">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm sm:text-base text-gray-700 dark:text-gray-300 font-medium mb-2 flex items-center justify-between"
                  >
                    <span>Nama</span>
                    <AnimatePresence>
                      {isTyping.name && (
                        <motion.span
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.8 }}
                          className="flex items-center text-xs text-blue-600 dark:text-blue-400"
                        >
                          <User className="w-3 h-3 mr-1 animate-pulse" />
                          mengetik...
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    disabled={isSubmitting}
                    className="w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 dark:focus:ring-blue-400 focus:border-transparent transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                    placeholder="Nama Anda"
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm sm:text-base text-gray-700 dark:text-gray-300 font-medium mb-2 flex items-center justify-between"
                  >
                    <span>Email</span>
                    <AnimatePresence>
                      {isTyping.email && (
                        <motion.span
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.8 }}
                          className="flex items-center text-xs text-blue-600 dark:text-blue-400"
                        >
                          <Mail className="w-3 h-3 mr-1 animate-pulse" />
                          mengetik...
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    disabled={isSubmitting}
                    className="w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 dark:focus:ring-blue-400 focus:border-transparent transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                    placeholder="email.anda@example.com"
                  />
                </div>
              </div>

              <div>
                <p className="text-sm sm:text-base text-gray-700 dark:text-gray-300 font-medium mb-3">
                  Pilih kebutuhan
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {contactIntents.map((intent) => {
                    const IntentIcon = intent.icon;
                    const isSelected = selectedIntentId === intent.id;

                    return (
                      <button
                        key={intent.id}
                        type="button"
                        onClick={() => handleIntentSelect(intent)}
                        disabled={isSubmitting}
                        aria-pressed={isSelected}
                        className={`min-h-[44px] w-full rounded-lg border px-3 py-2.5 text-left text-sm font-medium transition-all duration-300 flex items-center gap-2.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60 ${
                          isSelected
                            ? 'border-blue-600 bg-blue-50 text-blue-800 shadow-sm dark:border-blue-400 dark:bg-blue-500/15 dark:text-blue-200'
                            : 'border-gray-200 bg-gray-50 text-gray-700 hover:border-blue-300 hover:bg-blue-50/70 hover:text-blue-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 dark:hover:border-blue-500 dark:hover:bg-blue-500/10 dark:hover:text-blue-200'
                        }`}
                      >
                        <IntentIcon className="h-4 w-4 flex-shrink-0" />
                        <span className="min-w-0 break-words leading-snug">
                          {intent.label}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div>
                <label
                  htmlFor="subject"
                  className="block text-sm sm:text-base text-gray-700 dark:text-gray-300 font-medium mb-2 flex items-center justify-between"
                >
                  <span>Subjek</span>
                  <AnimatePresence>
                    {isTyping.subject && (
                      <motion.span
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        className="flex items-center text-xs text-blue-600 dark:text-blue-400"
                      >
                        <MessageSquare className="w-3 h-3 mr-1 animate-pulse" />
                        mengetik...
                      </motion.span>
                    )}
                  </AnimatePresence>
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  disabled={isSubmitting}
                  className="w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 dark:focus:ring-blue-400 focus:border-transparent transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  placeholder="Tentang apa ini?"
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-sm sm:text-base text-gray-700 dark:text-gray-300 font-medium mb-2 flex items-center justify-between"
                >
                  <span>Pesan</span>
                  <AnimatePresence>
                    {isTyping.message && (
                      <motion.span
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        className="flex items-center text-xs text-blue-600 dark:text-blue-400"
                      >
                        <MessageSquare className="w-3 h-3 mr-1 animate-pulse" />
                        mengetik...
                      </motion.span>
                    )}
                  </AnimatePresence>
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  disabled={isSubmitting}
                  className="w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 dark:focus:ring-blue-400 focus:border-transparent transition-all duration-300 resize-none disabled:opacity-50 disabled:cursor-not-allowed"
                  placeholder="Tulis kebutuhan, posisi, atau dokumentasi proyek yang ingin dibahas..."
                />
              </div>

              <motion.button
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                disabled={isSubmitting || !canSubmit()}
                className={`w-full min-h-[44px] py-2.5 sm:py-3 px-6 rounded-lg text-sm sm:text-base font-semibold transition-all duration-300 flex items-center justify-center space-x-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 ${
                  canSubmit() && !isSubmitting
                    ? 'bg-blue-600 dark:bg-blue-500 text-white hover:bg-blue-700 dark:hover:bg-blue-600 hover:scale-102'
                    : 'bg-gray-400 dark:bg-gray-600 text-gray-200 cursor-not-allowed opacity-60'
                }`}
              >
                {!canSubmit() ? (
                  <>
                    <Clock size={18} className="sm:w-5 sm:h-5" />
                    <span>
                      Tunggu {getRemainingCooldown() > 0
                        ? `${getRemainingCooldown()}s`
                        : 'sebentar'}
                    </span>
                  </>
                ) : (
                  <>
                    <Send size={18} className="sm:w-5 sm:h-5" />
                    <span>{isSubmitting ? 'Mengirim...' : 'Kirim Pesan'}</span>
                  </>
                )}
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
