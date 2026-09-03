import { Reveal, SectionHeader } from './ui/Section';

const Education = () => {
  const coursework = [
    'Instalasi Jaringan',
    'Konfigurasi Router',
    'Sistem Komputer',
    'Pemrograman Mikrokontroler',
    'Manajemen Data',
  ];

  return (
    <section id="education" className="section bg-surface">
      <div className="container-responsive">
        <SectionHeader kicker="PENDIDIKAN" title="Latar Pendidikan Formal" />

        <Reveal delay={0.1} className="mt-10">
          <article className="card p-6 sm:p-8">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <h3 className="t-h3">Teknik Komputer dan Jaringan (TKJ)</h3>
                <p className="mt-1 font-semibold text-accent">SMK Negeri 1 Cileungsi</p>
                <p className="t-mono mt-1">2023 – 2026 · CILEUNGSI, BOGOR</p>
              </div>
              <div className="text-right">
                <p className="t-mono">NILAI IJAZAH</p>
                <p className="mt-0.5 text-3xl font-bold text-accent">85</p>
              </div>
            </div>

            <p className="t-body mt-6 max-w-prose">
              Program keahlian dengan fokus praktik: instalasi dan konfigurasi perangkat
              jaringan, sistem komputer, serta dasar pemrograman mikrokontroler untuk
              proyek IoT.
            </p>

            <div className="mt-6 border-t border-line pt-5">
              <p className="t-mono">MATERI RELEVAN</p>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {coursework.map((c) => (
                  <span key={c} className="tag">
                    {c}
                  </span>
                ))}
              </div>
            </div>
          </article>
        </Reveal>
      </div>
    </section>
  );
};

export default Education;
