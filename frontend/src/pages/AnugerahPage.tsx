import { useNavigate } from 'react-router-dom'
import './AnugerahPage.css'

export default function AnugerahPage() {
  const navigate = useNavigate()

  return (
    <div className="anugerah-page">
      <section className="anugerah-hero">
        <div className="anugerah-hero-content">
          <h1>Anugerah Usahawan Kedah</h1>
          <p>
            Raikan kecemerlangan usahawan dalam pelbagai kategori, dari inovasi produk hingga kepimpinan perniagaan.
          </p>
          <button className="btn btn-primary btn-lg" onClick={() => navigate('/register')}>
            Sertai Sekarang
          </button>
        </div>
      </section>

      <section className="anugerah-list-view">
        <h2>Senarai Perkhidmatan</h2>
        <div className="anugerah-list-item">
          <img src="https://images.unsplash.com/photo-1591015977886-370050de73fe?auto=format&fit=crop&w=1200&q=80" alt="Anugerah" />
          <div className="anugerah-entry">
            <h3>Haircut Award</h3>
            <p>A dui aliquam ultrices eros lorem nibh vivamus. Quis aliquam duis pharetra faucibus ultrices volutpat quisque. Convallis nec lectus mi nec eget odio ac tempor. Nunc egestas sed.</p>
            <div className="anugerah-prices">
              <span>Top Barber — <strong>RM 200</strong></span>
              <span>Barber — <strong>RM 150</strong></span>
            </div>
            <button className="btn btn-primary">Book Now</button>
          </div>
        </div>

        <div className="anugerah-list-item reverse">
          <img src="https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=1200&q=80" alt="Anugerah" />
          <div className="anugerah-entry">
            <h3>Grooming Excellence</h3>
            <p>Semua calon yang menunjukkan kualiti perkhidmatan dan inovasi diberi peluang hebat untuk menang dalam kategori ini.</p>
            <div className="anugerah-prices">
              <span>Speacialist — <strong>RM 240</strong></span>
              <span>Standards — <strong>RM 170</strong></span>
            </div>
            <button className="btn btn-primary">Book Now</button>
          </div>
        </div>
      </section>

      <section className="anugerah-cta">
        <h2>Daftar Untuk Anugerah</h2>
        <p>Buka peluang baru untuk pemasaran dan pengiktirafan perniagaan anda.
        </p>
        <button className="btn btn-secondary btn-lg" onClick={() => navigate('/register')}>
          Daftar Anugerah
        </button>
      </section>
    </div>
  )
}
