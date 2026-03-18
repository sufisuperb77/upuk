import './Features.css';

export default function FeaturesPage() {
  const features = [
   {
  icon: '📋',
  title: 'Pendaftaran Perniagaan',
  description: 'Proses pendaftaran perniagaan yang mudah dan tersusun khas untuk usahawan muda.'
},
{
  icon: '📊',
  title: 'Papan Pemuka Analitik',
  description: 'Pantau metrik dan prestasi perniagaan anda melalui papan pemuka analitik yang komprehensif.'
},
{
  icon: '👥',
  title: 'Rangkaian Komuniti',
  description: 'Berhubung dengan ribuan usahawan lain dan bina hubungan perniagaan yang bernilai.'
},
{
  icon: '🎓',
  title: 'Latihan & Sumber',
  description: 'Akses kepada bahan latihan, webinar dan pelbagai sumber untuk meningkatkan kemahiran perniagaan anda.'
},
{
  icon: '💼',
  title: 'Program Mentorship',
  description: 'Dapatkan bimbingan peribadi daripada usahawan berpengalaman dan perunding perniagaan.'
},
{
  icon: '🏆',
  title: 'Pengiktirafan & Anugerah',
  description: 'Tonjolkan perniagaan anda dan terima pengiktirafan atas pencapaian serta kejayaan anda.'
},
{
  icon: '💰',
  title: 'Peluang Pembiayaan',
  description: 'Berhubung dengan pelabur dan terokai peluang pembiayaan untuk pertumbuhan perniagaan anda.'
},
{
  icon: '🔗',
  title: 'Rangkaian Kerjasama Strategik',
  description: 'Bina kerjasama strategik dan jalinkan kolaborasi dengan perniagaan yang saling melengkapi.'
},
{
  icon: '📱',
  title: 'Mesra Peranti Mudah Alih',
  description: 'Urus perniagaan anda di mana sahaja melalui platform yang mesra peranti mudah alih.'
}
  ];

  return (
    <div className="features-page">
      <div className="features-hero">
        <h1>Ciri-ciri Platform</h1>
        <p>Segala yang anda perlukan untuk berjaya sebagai usahawan</p>
      </div>

      <div className="features-container">
        <div className="features-intro">
          <h2>Alat Komprehensif untuk Kejayaan Anda</h2>
          <p>
            Usahawan Muda menyediakan platform lengkap yang direka untuk menyokong setiap peringkat perjalanan keusahawanan anda. 
            Dari pendaftaran hingga pertumbuhan, kami sedia membantu anda berjaya.
          </p>
        </div>

        <div className="features-grid">
          {features.map((feature, index) => (
            <div key={index} className="feature-item">
              <div className="feature-icon">{feature.icon}</div>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </div>
          ))}
        </div>

          <div className="features-benefits">
            <h2>Mengapa Pilih Usahawan Muda?</h2>
          <div className="benefits-grid">
            <div className="benefit-card">
              <h3>🎯 Sesuai untuk Anda</h3>
              <p>Platform kami direka khusus untuk usahawan muda di Malaysia dengan mengambil kira keperluan unik anda.</p>
            </div>
            <div className="benefit-card">
              <h3>🚀 Penyelesaian Boleh Skala</h3>
              <p>Mula kecil dan berkembang bersama kami. Platform kami berkembang seiring perniagaan anda dari permulaan ke kejayaan.</p>
            </div>
            <div className="benefit-card">
              <h3>💪 Sokongan Komuniti</h3>
              <p>Sertai komuniti usahawan yang berkembang maju yang saling menyokong, bekerjasama, dan berkembang bersama.</p>
            </div>
            <div className="benefit-card">
              <h3>📈 Fokus Pertumbuhan</h3>
              <p>Setiap ciri direka dengan satu tujuan: membantu perniagaan anda berkembang dan berjaya.</p>
            </div>
            <div className="benefit-card">
              <h3>🔒 Selamat & Boleh Dipercayai</h3>
              <p>Data anda dilindungi dengan keselamatan setaraf perusahaan dan infrastruktur yang boleh dipercayai.</p>
            </div>
            <div className="benefit-card">
              <h3>🤝 Sokongan Pakar</h3>
              <p>Akses kepada pasukan pakar dan mentor kami yang sedia membantu anda pada setiap langkah.</p>
            </div>
          </div>
        </div>

        <div className="features-cta">
          <h2>Bersedia Bermula?</h2>
          <p>Sertai ratusan usahawan muda yang berjaya yang sudah menggunakan Usahawan Muda</p>
          <button className="cta-button">Daftarkan Perniagaan Anda Hari Ini</button>
        </div>
      </div>
    </div>
  );
}
