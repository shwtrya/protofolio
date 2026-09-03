import { Reveal, SectionHeader } from './ui/Section';
import Scroll3D from './ui/Scroll3D';

const About = () => {
  return (
    <section id="about" className="section bg-surface">
      <div className="container-responsive">
        <SectionHeader
          kicker="TENTANG"
          title="Latar Belakang Teknis"
          lead="SMK Teknik Komputer dan Jaringan — praktik langsung, bukan teori semata."
        />

        <div className="mt-10 grid gap-10 md:grid-cols-2">
          {/* Foto */}
          <Reveal delay={0.1}>
            <Scroll3D rotateX={4} rotateY={3} drift={22} scaleAmount={0.98}>
              <img
                src="https://i.ibb.co.com/JWBQMssz/image.png?auto=compress&cs=tinysrgb&dpr=2&h=400&w=400"
                alt="Shawava Tritya"
                width="400"
                height="400"
                className="w-full max-w-sm rounded-[14px] bg-surface2"
                loading="lazy"
              />
            </Scroll3D>
          </Reveal>

          {/* Bio */}
          <Reveal delay={0.15} className="flex flex-col gap-5">
            <p className="t-body">
              Di SMK saya mengembangkan kemampuan praktis di bidang Teknik Komputer
              dan Jaringan: merakit prototype berbasis mikrokontroler, instalasi
              jaringan FTTH, konfigurasi router, serta pekerjaan data entry dan
              administrasi yang rapi.
            </p>
            <p className="t-body">
              Pengalaman magang di lini produksi (PT Rekadaya Multi Adiprima, PT Serin
              Indonesia) dan freelance data entry membentuk disiplin kerja, ketelitian,
              dan kemampuan bekerja dalam tim. Saya mencari kesempatan untuk menerapkan
              kemampuan ini di lingkungan profesional.
            </p>

            <div className="flex flex-wrap gap-2">
              {['Arduino', 'IoT', 'Instalasi Jaringan', 'Data Entry', 'Troubleshooting'].map(
                (t) => (
                  <span key={t} className="tag tag-accent">
                    {t}
                  </span>
                ),
              )}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
};

export default About;