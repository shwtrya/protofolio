import { Cpu, Database, Network, Wrench } from 'lucide-react';
import { Reveal, SectionHeader } from './ui/Section';
import Scroll3D from './ui/Scroll3D';

const Skills = () => {
  const groups = [
    {
      icon: Network,
      title: 'Networking',
      summary:
        'Instalasi jaringan FTTH, konfigurasi router, penataan kabel, uji konektivitas, dan troubleshooting.',
      tools: ['TCP/IP', 'Kabel UTP', 'LAN tester', 'Konfigurasi Router', 'FTTH', 'Mikrotik (dasar)'],
    },
    {
      icon: Cpu,
      title: 'Hardware & IoT',
      summary:
        'Merakit dan memprogram prototype berbasis mikrokontroler untuk monitoring dan kontrol perangkat.',
      tools: ['Arduino Uno', 'ESP8266 NodeMCU', 'Sensor DHT11', 'Relay 4-channel', 'Blynk IoT', 'Arduino IDE'],
    },
    {
      icon: Database,
      title: 'Data & Administrasi',
      summary:
        'Input, validasi, dan penyusunan data pelanggan serta laporan administrasi secara konsisten.',
      tools: ['Microsoft Word', 'Excel', 'PowerPoint', 'Canva', 'Data Entry', 'Validasi Data'],
    },
    {
      icon: Wrench,
      title: 'Operasional & Produksi',
      summary:
        'Pengalaman lini produksi: sortir material, quality check, assembly, dan packing sesuai standar.',
      tools: ['Quality Control', 'Assembly', 'Packing', 'Dokumentasi Kerja', 'Standar Kerja'],
    },
  ];

  return (
    <section id="skills" className="section bg-surface">
      <div className="container-responsive">
        <SectionHeader
          kicker="KEAHLIAN"
          title="Kompetensi Teknis"
          lead="Dikelompokkan berdasarkan bidang, dengan tools yang benar-benar pernah saya pakai."
        />

        <div className="mt-12 grid gap-4 md:grid-cols-2">
          {groups.map((group, i) => (
            <Reveal key={group.title} delay={i * 0.07}>
              <Scroll3D
                className="h-full"
                rotateX={4}
                rotateY={i % 2 === 0 ? 2 : -2}
                drift={18}
                scaleAmount={0.99}
              >
                <article className="card card-interactive h-full p-6 sm:p-7">
                <div className="flex items-start gap-4">
                  <span className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-[10px] bg-accent-soft text-accent">
                    <group.icon size={22} />
                  </span>
                  <div>
                    <h3 className="t-h3">{group.title}</h3>
                    <p className="t-body mt-2">{group.summary}</p>
                  </div>
                </div>
                <div className="mt-5 flex flex-wrap gap-1.5">
                  {group.tools.map((tool) => (
                    <span key={tool} className="tag">
                      {tool}
                    </span>
                  ))}
                </div>
                </article>
              </Scroll3D>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
