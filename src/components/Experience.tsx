import { Reveal, SectionHeader } from './ui/Section';

const Experience = () => {
  const items = [
    {
      title: 'Operator Produksi',
      org: 'PT Rekadaya Multi Adiprima',
      place: 'Ciangsana',
      period: 'Sep – Des 2025',
      type: 'PKL / Magang',
      desc: [
        'Menyortir material sesuai standar kualitas untuk menekan produk tidak sesuai.',
        'Assembly double tape pada part felt secara rapi dan presisi.',
        'Packing produk hasil assembly agar aman dan siap distribusi.',
        'Menjaga kelancaran proses dan target kerja harian.',
      ],
    },
    {
      title: 'Operator Produksi',
      org: 'PT Serin Indonesia',
      place: 'Bekasi',
      period: 'Jun – Sep 2025',
      type: 'PKL / Magang',
      desc: [
        'Memasang aksesoris silinder pada zipper tas sesuai arahan kerja.',
        'Mengaplikasikan lem pada bahan tas sebelum proses jahit.',
        'Membantu proses produksi berjalan sesuai standar kerja.',
        'Menjaga kebersihan area kerja dan kerapian alat.',
      ],
    },
    {
      title: 'Data Entry',
      org: 'PT Wova Group Indonesia',
      place: 'Cileungsi',
      period: '2023 – 2025',
      type: 'Freelance',
      desc: [
        'Menginput dan memvalidasi data pelanggan secara teliti.',
        'Menyusun laporan data agar mudah dibaca dan diperiksa ulang.',
        'Menjaga konsistensi format data pada pekerjaan berulang.',
        'Mendukung administrasi tim dengan tools digital.',
      ],
    },
  ];

  return (
    <section id="experience" className="section bg-bg">
      <div className="container-responsive">
        <SectionHeader
          kicker="PENGALAMAN"
          title="Magang & Freelance"
          lead="Pengalaman nyata yang membentuk kedisiplinan, ketelitian, dan kerja tim."
        />

        <ol className="mt-12 space-y-10 border-l border-line pl-6 sm:pl-8">
          {items.map((item, i) => (
            <Reveal key={item.org} delay={i * 0.07} className="relative">
              <span
                className="absolute -left-[29px] top-1.5 h-3 w-3 rounded-full border-2 border-bg bg-accent sm:-left-[37px]"
                aria-hidden="true"
              />
              <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                <h3 className="t-h3">{item.title}</h3>
                <span className="tag tag-accent">{item.type}</span>
              </div>
              <p className="mt-1 text-sm font-semibold text-accent">
                {item.org} · {item.place}
              </p>
              <p className="t-mono mt-0.5">{item.period}</p>
              <ul className="mt-4 grid gap-2 sm:grid-cols-2">
                {item.desc.map((d) => (
                  <li key={d} className="t-body text-[0.95rem]">
                    <span className="mr-2 text-accent">—</span>
                    {d}
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
};

export default Experience;
