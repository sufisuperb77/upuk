import './About.css';

export default function AboutPage() {
  return (
    <div className="about-page">
      <div className="about-hero">
        <h1>Tentang Usahawan Muda</h1>
        <p>Memberdayakan generasi usahawan akan datang di Malaysia</p>
      </div>

      <div className="about-container">
        <section className="mission-section">
          <div className="section-content">
            <h2>Misi Kami</h2>
            <p>
              Menyokong, membimbing, dan memberdayakan usahawan muda di seluruh Malaysia dengan menyediakan alat, 
              sumber, dan komuniti yang mereka perlukan untuk mengubah idea perniagaan menjadi usaha yang berjaya.
            </p>
          </div>
          <div className="mission-graphic">
            <div className="graphic-element">🎯</div>
          </div>
        </section>

        <section className="values-section">
          <h2>Nilai Kami</h2>
          <div className="values-grid">
            <div className="value-card">
              <div className="value-icon">💡</div>
              <h3>Inovasi</h3>
              <p>Kami percaya dalam memupuk kreativiti dan menggalakkan pemikiran inovatif dalam semua aspek perniagaan.</p>
            </div>
            <div className="value-card">
              <div className="value-icon">🤝</div>
              <h3>Kerjasama</h3>
              <p>Kejayaan datang melalui komuniti. Kami menyatukan usahawan untuk berkongsi pengalaman dan pengetahuan.</p>
            </div>
            <div className="value-card">
              <div className="value-icon">📈</div>
              <h3>Pertumbuhan</h3>
              <p>Kami komited untuk membantu usahawan memajukan perniagaan mereka dan mencapai pertumbuhan yang mampan.</p>
            </div>
            <div className="value-card">
              <div className="value-icon">🌟</div>
              <h3>Kecemerlangan</h3>
              <p>Kami mengekalkan standard tinggi dalam semua yang kami lakukan, daripada perkhidmatan hingga sokongan komuniti.</p>
            </div>
            <div className="value-card">
              <div className="value-icon">🎓</div>
              <h3>Pendidikan</h3>
              <p>Kami menyediakan latihan, sumber, dan bimbingan untuk membantu usahawan membina perniagaan yang lebih kukuh.</p>
            </div>
            <div className="value-card">
              <div className="value-icon">🌍</div>
              <h3>Impak</h3>
              <p>Kami mengukur kejayaan melalui impak positif yang kami hasilkan dalam ekosistem keusahawanan Malaysia.</p>
            </div>
          </div>
        </section>

        <section className="stats-section">
          <h2>Impak Kami</h2>
          <div className="stats-grid">
            <div className="stat-box">
              <div className="stat-number">1000+</div>
              <div className="stat-text">Usahawan Muda</div>
            </div>
            <div className="stat-box">
              <div className="stat-number">50+</div>
              <div className="stat-text">Kategori Perniagaan</div>
            </div>
            <div className="stat-box">
              <div className="stat-number">14</div>
              <div className="stat-text">Negeri Diliputi</div>
            </div>
            <div className="stat-box">
              <div className="stat-number">RM 100k</div>
              <div className="stat-text">Jumlah Nilai Perniagaan</div>
            </div>
          </div>
        </section>

        <section className="team-section">
          <h2>Pasukan Kami</h2>
          <p>
            Usahawan Muda diketuai oleh pasukan usahawan berpengalaman, perunding perniagaan, dan pakar teknologi 
            yang berdedikasi untuk menyokong usahawan muda di Malaysia. Pasukan kami menggabungkan puluhan tahun pengalaman 
            perniagaan dengan minat untuk membimbing generasi pemimpin akan datang.
          </p>

          <div className="org-chart">
            <div className="org-node top-node">
              <img src="https://via.placeholder.com/100" alt="CEO" />
              <strong>CEO</strong>
              <span>Ketua Eksekutif</span>
            </div>
            <div className="org-row">
              <div className="org-node">
                <img src="https://via.placeholder.com/100" alt="Operations Lead" />
                <strong>Operations Lead</strong>
                <span>Pengurus Operasi</span>
              </div>
              <div className="org-node">
                <img src="https://via.placeholder.com/100" alt="Strategy Lead" />
                <strong>Strategy Lead</strong>
                <span>Pengurus Strategi</span>
              </div>
              <div className="org-node">
                <img src="https://via.placeholder.com/100" alt="Tech Lead" />
                <strong>Tech Lead</strong>
                <span>Pengurus Teknologi</span>
              </div>
            </div>
          </div>

          <div className="team-highlights">
            <div className="highlight-card">
              <h3>🎯 Mentor Pakar</h3>
              <p>Pemimpin perniagaan dan usahawan berpengalaman sedia membimbing perjalanan anda</p>
            </div>
            <div className="highlight-card">
              <h3>💼 Perunding Perniagaan</h3>
              <p>Perunding profesional untuk membantu anda membangunkan dan melaksanakan strategi perniagaan</p>
            </div>
            <div className="highlight-card">
              <h3>🚀 Inovator Teknologi</h3>
              <p>Pasukan teknologi terkemuka memastikan anda mempunyai alat digital terbaik</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
