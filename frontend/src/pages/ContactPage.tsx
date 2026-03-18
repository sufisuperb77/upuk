import React, { useState } from 'react';
import './Contact.css';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the form data to your backend
    console.log('Form submitted:', formData);
    setSubmitted(true);
    setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <div className="contact-page">
      <div className="contact-hero">
        <h1>Hubungi Kami</h1>
        <p>Kami ingin mendengar daripada anda. Hantar mesej dan kami akan membalas secepat mungkin.</p>
      </div>

      <div className="contact-container">
        <div className="contact-info">
          <div className="info-card">
            <div className="info-icon">📍</div>
            <h3>Lokasi</h3>
            <p>Lot 3-7, Tingkat 3, Bangunan UTC Kedah, Jalan Kolam Air, Kedah, Alor Setar, Malaysia, 05675</p>
          </div>

          <div className="info-card">
            <div className="info-icon">📧</div>
            <h3>Emel</h3>
            <p>
              <a href="mailto:upuk@kedah.gov.my">upuk@kedah.gov.my</a>
            </p>
          </div>

          <div className="info-card">
            <div className="info-icon">📞</div>
            <h3>Telefon</h3>
            <p>
              <a href="tel:+6037350069">04-735 0069</a>
            </p>
          </div>

          <div className="info-card">
            <div className="info-icon">🕐</div>
            <h3>Waktu Perniagaan</h3>
            <p>Isnin - Jumaat: 9:00 - 17:00</p>
            <p style={{ fontSize: '0.9rem', color: '#a0aec0' }}>Sabtu - Ahad: Tutup</p>
          </div>
        </div>

        <div className="contact-form-wrapper">
          {submitted && (
            <div className="submit-success">
              ✓ Terima kasih atas mesej anda! Kami akan menghubungi anda tidak lama lagi.
            </div>
          )}
          
          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Nama Penuh *</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="Nama anda"
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="email">Emel *</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="email@anda.com"
                />
              </div>
              <div className="form-group">
                <label htmlFor="phone">Telefon</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+60 1234 5678"
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="subject">Subjek *</label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
                placeholder="Mengenai apa?"
              />
            </div>

            <div className="form-group">
              <label htmlFor="message">Mesej *</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                placeholder="Tulis mesej anda di sini..."
                rows={6}
              />
            </div>

            <button type="submit" className="submit-btn">
              Hantar Mesej
            </button>
          </form>
        </div>
      </div>

      <div className="contact-social">
      <h2>Berhubung Dengan Kami</h2>
        <div className="social-links">
          <a href="https://www.facebook.com/upuk.kedah.gov" className="social-btn">Facebook</a>
          <a href="#" className="social-btn">Twitter</a>
          <a href="#" className="social-btn">LinkedIn</a>
          <a href="https://www.instagram.com/upuk.kedah/?hl=en" className="social-btn">Instagram</a>
        </div>
      </div>
    </div>
  );
}
