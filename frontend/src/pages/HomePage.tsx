import { useNavigate } from 'react-router-dom'
import './HomePage.css'
import heroGif from '../assets/hero.gif'

export default function HomePage() {
  const navigate = useNavigate()

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1 className="hero-title">
            Unit Pembangunan Usahawan Negeri <span className="gradient-text">Kedah</span>
          </h1>
          <p className="hero-subtitle">
            Pusat rujukan & penyelarasan aktiviti keusahawan dalam membangunkan usahawan progresif & dinamik ke arah pembentukan masyarakat yang aman & makmur di Kedah
          </p>
          <div className="hero-buttons">
            <button
              className="btn btn-primary btn-lg"
              onClick={() => navigate('/register')}
            >
              Daftar Perniagaan Anda
            </button>
            <button
              className="btn btn-secondary btn-lg"
              onClick={() => navigate('/login')}
            >
              Lihat Papan Pemuka
            </button>
          </div>
        </div>
        <div className="hero-image">
          <div className="hero-graphic">
            <div className="graphic-circle circle-1"></div>
            <div className="graphic-circle circle-2"></div>
            <img src={heroGif} alt="Hero" className="graphic-icon hero-gif" />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features">
        <h2>Mengapa Sertai Usahawan Muda?</h2>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">🎯</div>
            <h3>Pendaftaran Mudah</h3>
            <p>Proses pendaftaran yang ringkas dan pantas untuk mendaftarkan perniagaan anda</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">📊</div>
            <h3>Analitik Perniagaan</h3>
            <p>Jejaki dan analisa prestasi perniagaan anda dengan papan pemuka kami</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">🤝</div>
            <h3>Rangkaian</h3>
            <p>Berhubung dengan usahawan muda lain dan kembangkan rangkaian anda</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">🚀</div>
            <h3>Sokongan Pertumbuhan</h3>
            <p>Akses sumber dan sokongan untuk membantu perniagaan anda berkembang</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">💡</div>
            <h3>Pusat Inovasi</h3>
            <p>Temui peluang baru dan idea perniagaan inovatif</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">🏆</div>
            <h3>Pengiktirafan</h3>
            <p>Dapatkan pengiktirafan atas pencapaian anda dalam komuniti keusahawanan</p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats">
        <div className="stats-container">
          <div className="stat-item">
            <h3>1000+</h3>
            <p>Usahawan Muda</p>
          </div>
          <div className="stat-item">
            <h3>50+</h3>
            <p>Kategori Perniagaan</p>
          </div>
          <div className="stat-item">
            <h3>Malaysia</h3>
            <p>Liputan</p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta">
        <div className="cta-content">
          <h2>Bersedia Memulakan Perjalanan Anda?</h2>
          <p>Daftarkan perniagaan anda hari ini dan sertai komuniti kami</p>
          <button
            className="btn btn-primary btn-lg"
            onClick={() => navigate('/register')}
          >
            Daftar Sekarang
          </button>
        </div>
      </section>
    </div>
  )
}
