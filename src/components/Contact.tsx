import { useCallback, useMemo, useRef, useState } from 'react';
import { Briefcase, Check, FileText, Github, Linkedin, Mail, MapPin, MessageSquare, Phone, Send, Wrench } from 'lucide-react';
import { profile } from '../data/navigation';
import { isStorageAvailable, safeGetItem, safeParseInt, safeSetItem } from '../utils/storage';
import { Reveal, SectionHeader } from './ui/Section';
import CvPreview from './CvPreview';

const COOLDOWN_MS = 60_000;
const MAX_PER_HOUR = 3;
const HOUR_MS = 3_600_000;

const intents = [
  {
    id: 'recruitment',
    label: 'Rekrutmen / Kerja',
    icon: Briefcase,
    subject: 'Diskusi kesempatan kerja',
    message:
      'Halo Shawava, saya ingin berdiskusi tentang kesempatan kerja yang sesuai dengan latar TKJ, jaringan, IoT, atau administrasi data.',
  },
  {
    id: 'demo',
    label: 'Minta Demo Proyek',
    icon: MessageSquare,
    subject: 'Permintaan demo proyek Smart Home',
    message:
      'Halo Shawava, saya ingin meminta demo atau penjelasan singkat tentang proyek Smart Home berbasis ESP8266.',
  },
  {
    id: 'documentation',
    label: 'Minta Dokumentasi',
    icon: FileText,
    subject: 'Permintaan dokumentasi proyek instalasi jaringan',
    message:
      'Halo Shawava, saya ingin meminta dokumentasi praktik instalasi ISP hingga router.',
  },
  {
    id: 'freelance',
    label: 'Freelance / Teknis',
    icon: Wrench,
    subject: 'Diskusi pekerjaan teknis',
    message:
      'Halo Shawava, saya ingin berdiskusi tentang pekerjaan teknis lapangan atau data entry.',
  },
] as const;

const channels = [
  {
    icon: Mail,
    label: 'EMAIL',
    value: profile.email,
    href: `mailto:${profile.email}`,
  },
  {
    icon: Phone,
    label: 'WHATSAPP',
    value: profile.whatsappLabel,
    href: `https://wa.me/${profile.whatsapp}`,
  },
  {
    icon: MapPin,
    label: 'DOMISILI',
    value: profile.location,
    href: 'https://maps.app.goo.gl/9UCcE1a2dkAqDWUq5',
  },
  {
    icon: Github,
    label: 'GITHUB',
    value: 'github.com/CyXd404',
    href: profile.github,
  },
  {
    icon: Linkedin,
    label: 'LINKEDIN',
    value: 'in/shawava-tritya',
    href: profile.linkedin,
  },
];

const Contact = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    honeypot: '',
  });
  const [sending, setSending] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [error, setError] = useState<string | null>(null);
  const [activeIntent, setActiveIntent] = useState<string | null>(null);

  const storageOk = useMemo(() => isStorageAvailable(), []);
  const memory = useRef({ lastSubmit: 0, hourlyCount: 0, hourStart: 0 });

  const readCounter = useCallback(
    (key: keyof typeof memory.current, fallback: number) =>
      storageOk ? safeParseInt(safeGetItem(key, String(fallback)), fallback) : memory.current[key] ?? fallback,
    [storageOk],
  );

  const writeCounter = useCallback(
    (key: keyof typeof memory.current, value: number) => {
      memory.current[key] = value;
      if (storageOk) safeSetItem(key, String(value));
    },
    [storageOk],
  );

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const applyIntent = (intent: (typeof intents)[number]) => {
    setActiveIntent(intent.id);
    setForm((prev) => ({
      ...prev,
      subject: intent.subject,
      message: prev.message.trim() === '' ? intent.message : prev.message,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Honeypot: only bots fill this.
    if (form.honeypot.trim() !== '') {
      setStatus('error');
      setError('Pengiriman ditolak.');
      return;
    }

    const now = Date.now();
    const lastSubmit = readCounter('lastSubmit', 0);

    if (now - lastSubmit < COOLDOWN_MS) {
      const wait = Math.ceil((COOLDOWN_MS - (now - lastSubmit)) / 1000);
      setStatus('error');
      setError(`Tunggu ${wait} detik sebelum mengirim lagi.`);
      return;
    }

    const hourStart = readCounter('hourStart', 0);
    const expired = now - hourStart > HOUR_MS;
    const hourlyCount = expired ? 0 : readCounter('hourlyCount', 0);

    if (expired) {
      writeCounter('hourStart', now);
      writeCounter('hourlyCount', 0);
    }

    if (hourlyCount >= MAX_PER_HOUR) {
      const mins = Math.max(1, Math.ceil((HOUR_MS - (now - hourStart)) / 60_000));
      setStatus('error');
      setError(`Batas ${MAX_PER_HOUR} pesan/jam tercapai. Coba lagi dalam ${mins} menit.`);
      return;
    }

    setSending(true);
    setStatus('idle');

    try {
      const res = await fetch('/api/sendEmail', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      if (!res.ok) throw new Error('Pengiriman gagal. Coba lagi atau hubungi via WhatsApp.');

      writeCounter('lastSubmit', now);
      writeCounter('hourlyCount', hourlyCount + 1);
      setStatus('success');
      setForm({ name: '', email: '', subject: '', message: '', honeypot: '' });
      setActiveIntent(null);
    } catch (err) {
      setStatus('error');
      setError(err instanceof Error ? err.message : 'Terjadi kesalahan.');
    } finally {
      setSending(false);
    }
  };

  return (
    <section id="contact" className="section bg-surface">
      <div className="container-responsive">
        <SectionHeader
          kicker="KONTAK"
          title="Mari Bicara Pekerjaan Teknis"
          lead="Terbuka untuk magang, kerja penuh waktu bidang jaringan/IT support, atau proyek freelance."
        />

        <div className="mt-12 grid gap-10 min-w-0 lg:grid-cols-[0.85fr_1.15fr]">
          {/* Channels */}
          <Reveal className="flex min-w-0 flex-col gap-3">
            {channels.map((c) => (
              <a
                key={c.label}
                href={c.href}
                {...(c.href.startsWith('http')
                  ? { target: '_blank', rel: 'noopener noreferrer' }
                  : {})}
                className="card card-interactive flex items-center gap-3 p-3.5 sm:gap-4 sm:p-4"
              >
                <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-[8px] bg-accent-soft text-accent">
                  <c.icon size={18} />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="t-mono block truncate">{c.label}</span>
                  <span className="block truncate text-sm font-medium text-fg">{c.value}</span>
                </span>
              </a>
            ))}

            <CvPreview className="btn btn-secondary mt-2" label="Pratinjau CV" />
          </Reveal>

          {/* Form */}
          <Reveal delay={0.1} className="min-w-0">
            <form onSubmit={handleSubmit} className="card p-5 sm:p-7">
              {/* Intent shortcuts */}
              <fieldset>
                <legend className="t-mono t-mono-accent">TUJUAN KONTAK</legend>
                <div className="mt-3 flex flex-wrap gap-2">
                  {intents.map((intent) => (
                    <button
                      key={intent.id}
                      type="button"
                      onClick={() => applyIntent(intent)}
                      aria-pressed={activeIntent === intent.id}
                      className={`tag min-h-[36px] transition-colors ${
                        activeIntent === intent.id ? 'tag-accent' : 'hover:border-accent'
                      }`}
                    >
                      <intent.icon size={13} />
                      {intent.label}
                    </button>
                  ))}
                </div>
              </fieldset>

              {status === 'success' && (
                <p
                  role="status"
                  className="mt-6 flex items-start gap-2 rounded-[10px] border border-accent bg-accent-soft p-3 text-sm text-accent"
                >
                  <Check size={16} className="mt-0.5 flex-shrink-0" />
                  Pesan terkirim. Saya akan balas lewat email secepatnya.
                </p>
              )}

              {status === 'error' && error && (
                <p
                  role="alert"
                  className="mt-6 rounded-[10px] border border-line-strong bg-surface2 p-3 text-sm text-fg"
                >
                  {error}
                </p>
              )}

              {/* Honeypot — hidden from users and screen readers. */}
              <input
                type="text"
                name="honeypot"
                value={form.honeypot}
                onChange={handleChange}
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
                className="hidden"
              />

              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="name" className="field-label">
                    Nama
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    value={form.name}
                    onChange={handleChange}
                    disabled={sending}
                    className="field"
                    placeholder="Nama Anda"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="field-label">
                    Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={form.email}
                    onChange={handleChange}
                    disabled={sending}
                    className="field"
                    placeholder="nama@perusahaan.com"
                  />
                </div>
              </div>

              <div className="mt-4">
                <label htmlFor="subject" className="field-label">
                  Subjek
                </label>
                <input
                  id="subject"
                  name="subject"
                  type="text"
                  value={form.subject}
                  onChange={handleChange}
                  disabled={sending}
                  className="field"
                  placeholder="Topik pesan"
                />
              </div>

              <div className="mt-4">
                <label htmlFor="message" className="field-label">
                  Pesan
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={5}
                  value={form.message}
                  onChange={handleChange}
                  disabled={sending}
                  className="field resize-y"
                  placeholder="Tulis pesan Anda di sini"
                />
              </div>

              <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-line pt-5">
                <p className="t-mono">MAKS. {MAX_PER_HOUR} PESAN / JAM</p>
                <button type="submit" disabled={sending} className="btn btn-primary">
                  <Send size={15} />
                  {sending ? 'Mengirim…' : 'Kirim Pesan'}
                </button>
              </div>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
};

export default Contact;
