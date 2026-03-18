import { Link, useLocation } from 'react-router-dom'
import { useState } from 'react'
import { useAuth } from '../contexts/AuthContext'
import './Layout.css'
import logo from '../assets/logo_upuk.png'

export default function Layout({ children }: { children: React.ReactNode }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const { user, logout } = useAuth()
  const location = useLocation()

  const handleLogout = async () => {
    await logout()
    window.location.href = '/'
  }

  const isActive = (path: string) => location.pathname === path

  const closeMenu = () => setMenuOpen(false)

  return (
    <div className="layout">
      <nav className="navbar">
        <div className="navbar-container">
          <Link to="/" className="navbar-brand">
            <img src={logo} alt="UPUK logo" className="brand-icon" />
            {/* <span className="brand-name">Usahawan Kedah</span> */}
          </Link>

          <button
            className={`hamburger ${menuOpen ? 'open' : ''}`}
            aria-label={menuOpen ? 'Tutup menu' : 'Buka menu'}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((s) => !s)}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>

          <ul className={`navbar-menu ${menuOpen ? 'open' : ''}`}>
            {location.pathname !== '/dashboard' && (
              <>
                {/* <li>
                  <Link
                    to="/"
                    className={`nav-link ${isActive('/') ? 'active' : ''}`}
                  >
                    Laman Utama
                  </Link>
                </li> */}
                <li>
                  <Link
                    to="/about"
                    onClick={closeMenu}
                    className={`nav-link ${isActive('/about') ? 'active' : ''}`}
                  >
                    Mengenai
                  </Link>
                </li>
                <li>
                  <Link
                    to="/features"
                    onClick={closeMenu}
                    className={`nav-link ${isActive('/features') ? 'active' : ''}`}
                  >
                    Ciri-ciri
                  </Link>
                </li>
                <li>
                  <Link
                    to="/anugerah"
                    onClick={closeMenu}
                    className={`nav-link ${isActive('/anugerah') ? 'active' : ''}`}
                  >
                    Anugerah
                  </Link>
                </li>
                <li>
                  <Link
                    to="/contact"
                    onClick={closeMenu}
                    className={`nav-link ${isActive('/contact') ? 'active' : ''}`}
                  >
                    Hubungi
                  </Link>
                </li>
                <li>
                  <Link
                    to="/register"
                    onClick={closeMenu}
                    className={`nav-link ${isActive('/register') ? 'active' : ''}`}
                  >
                    Daftar Perniagaan
                  </Link>
                </li>
              </>
            )}
            {user ? (
              <>
                <li>
                    <Link
                    to="/dashboard"
                    onClick={closeMenu}
                    className={`nav-link ${isActive('/dashboard') ? 'active' : ''}`}
                  >
                    Papan Pemuka
                  </Link>
                </li>
                <li className="user-menu">
                  {/* <span className="user-name">{user.username}</span> */}
                  <button
                    className="logout-btn"
                    onClick={() => { closeMenu(); handleLogout() }}
                  >
                    Log keluar
                  </button>
                </li>
              </>
            ) : (
              <li>
                <Link
                  to="/login"
                  onClick={closeMenu}
                  className={`nav-link login-link ${isActive('/login') ? 'active' : ''}`}
                >
                  Log Masuk
                </Link>
              </li>
            )}
          </ul>
        </div>
      </nav>

      <main className="main-content">
        {children}
      </main>

      <footer className="footer">
          <div className="footer-content">
          <p>&copy; 2026 Usahawan Kedah. Hak cipta terpelihara.</p>
          <p>Menyokong usahawan muda di Malaysia</p>
        </div>
      </footer>
    </div>
  )
}
