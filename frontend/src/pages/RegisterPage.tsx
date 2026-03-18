import { useState, useEffect } from 'react'
import { api, type ChoicesResponse, type Choice } from '../api/client'
import './Register.css'

export default function RegisterPage() {
  const [choices, setChoices] = useState<ChoicesResponse | null>(null)
  const [filteredDaerah, setFilteredDaerah] = useState<Choice[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [form, setForm] = useState({
    company_name: '',
    company_email: '',
    company_phone: '',
    year_started: new Date().getFullYear().toString(),
    address_line_1: '',
    address_line_2: '',
    daerah: '',
    postcode: '',
    negeri: '',
    social_media_link: '',
    website: '',
    business_category: '',
    business_channel: [] as string[],
    monthly_revenue_range: '',
    number_of_employees: '0',
    consent_given: false,
  })
  const [ssmFile, setSsmFile] = useState<File | null>(null)
  const [logoFile, setLogoFile] = useState<File | null>(null)

  useEffect(() => {
    api.getChoices().then(setChoices).catch(() => setError('Gagal memuat pilihan borang')).finally(() => setLoading(false))
  }, [])

  // Fetch filtered daerah when negeri changes
  useEffect(() => {
    if (form.negeri) {
      api.getDaeraDayNegeri(form.negeri)
        .then((res) => {
          setFilteredDaerah(res.daerah)
          setForm((f) => ({ ...f, daerah: '' })) // Reset daerah when negeri changes
        })
        .catch(() => setFilteredDaerah([]))
    } else {
      setFilteredDaerah([])
      setForm((f) => ({ ...f, daerah: '' }))
    }
  }, [form.negeri])

  function update<K extends keyof typeof form>(key: K, value: (typeof form)[K]) {
    setForm((f) => ({ ...f, [key]: value }))
  }

  function toggleChannel(ch: string) {
    setForm((f) => ({
      ...f,
      business_channel: f.business_channel.includes(ch)
        ? f.business_channel.filter((c) => c !== ch)
        : [...f.business_channel, ch],
    }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setSuccess(false)
    if (!form.consent_given) {
      setError('Anda mesti memberikan persetujuan untuk mendaftar.')
      return
    }
    if (!ssmFile || !logoFile) {
      setError('Sila muat naik sijil SSM (PDF) dan logo syarikat (JPG/PNG).')
      return
    }
    setSubmitting(true)
    try {
      const fd = new FormData()
      fd.append('company_name', form.company_name)
      fd.append('company_email', form.company_email)
      fd.append('company_phone', form.company_phone)
      fd.append('year_started', form.year_started)
      fd.append('address_line_1', form.address_line_1)
      if (form.address_line_2) fd.append('address_line_2', form.address_line_2)
      fd.append('daerah', form.daerah)
      fd.append('postcode', form.postcode)
      fd.append('negeri', form.negeri)
      fd.append('ssm_certificate', ssmFile)
      fd.append('company_logo', logoFile)
      if (form.social_media_link) fd.append('social_media_link', form.social_media_link)
      if (form.website) fd.append('website', form.website)
      fd.append('business_category', form.business_category)
      form.business_channel.forEach((c) => fd.append('business_channel', c))
      fd.append('monthly_revenue_range', form.monthly_revenue_range)
      fd.append('number_of_employees', form.number_of_employees)
      fd.append('consent_given', form.consent_given ? '1' : '0')
      await api.register(fd)
      setSuccess(true)
      setForm({
        company_name: '',
        company_email: '',
        company_phone: '',
        year_started: new Date().getFullYear().toString(),
        address_line_1: '',
        address_line_2: '',
        daerah: '',
        postcode: '',
        negeri: '',
        social_media_link: '',
        website: '',
        business_category: '',
        business_channel: [],
        monthly_revenue_range: '',
        number_of_employees: '0',
        consent_given: false,
      })
      setSsmFile(null)
      setLogoFile(null)
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Pendaftaran gagal'
      setError(typeof msg === 'string' ? msg : JSON.stringify(msg))
    } finally {
      setSubmitting(false)
    }
  }

  if (loading) return <div className="register-loading">Memuat borang...</div>
  if (!choices) return <div className="register-loading">Gagal memuat pilihan borang.</div>

  return (
    <div className="register-page">
      <div className="register-container">
        <header className="register-header">
          <h1>Usahawan Muda</h1>
          <p>Pendaftaran Perniagaan</p>
            <a href="/login" className="register-admin-link">Log Masuk Admin</a>
        </header>
        {success && (
          <div className="register-success">
              Pendaftaran berjaya dihantar. Kami akan menyemak permohonan anda.
          </div>
        )}
        {error && <div className="register-error">{error}</div>}
        <form onSubmit={handleSubmit} className="register-form">
          <section>
            <h2>Maklumat Syarikat</h2>
              <label>Nama Syarikat *</label>
            <input
              value={form.company_name}
              onChange={(e) => update('company_name', e.target.value)}
              required
            />
            <label>Emel Syarikat *</label>
            <input
              type="email"
              value={form.company_email}
              onChange={(e) => update('company_email', e.target.value)}
              required
            />
            <label>Telefon Syarikat *</label>
            <input
              value={form.company_phone}
              onChange={(e) => update('company_phone', e.target.value)}
              required
            />
            <label>Tahun mula *</label>
            <input
              type="number"
              min="1900"
              max={new Date().getFullYear()}
              value={form.year_started}
              onChange={(e) => update('year_started', e.target.value)}
              required
            />
          </section>
          <section>
            <h2>Lokasi</h2>
              <label>Alamat baris 1 *</label>
            <input
              value={form.address_line_1}
              onChange={(e) => update('address_line_1', e.target.value)}
              required
            />
            <label>Alamat baris 2</label>
            <input
              value={form.address_line_2}
              onChange={(e) => update('address_line_2', e.target.value)}
            />
            <label>Negeri *</label>
            <select
              value={form.negeri}
              onChange={(e) => update('negeri', e.target.value)}
              required
            >
              <option value="">Pilih</option>
              {choices.negeri.map((c) => (
                <option key={c.value} value={c.value}>{c.label}</option>
              ))}
            </select>
            <label>Daerah *</label>
            <select
              value={form.daerah}
              onChange={(e) => update('daerah', e.target.value)}
              disabled={!form.negeri}
              required
            >
              <option value="">Pilih daerah</option>
              {filteredDaerah.map((c) => (
                <option key={c.value} value={c.value}>{c.label}</option>
              ))}
            </select>
            <label>Poskod *</label>
            <input
              value={form.postcode}
              onChange={(e) => update('postcode', e.target.value)}
              required
            />
          </section>
          <section>
            <h2>Dokumen & Media</h2>
              <label>Sijil SSM (PDF) *</label>
            <input
              type="file"
              accept=".pdf,application/pdf"
              onChange={(e) => setSsmFile(e.target.files?.[0] ?? null)}
              required
            />
            <label>Logo Syarikat (JPG/PNG) *</label>
            <input
              type="file"
              accept=".jpg,.jpeg,.png,image/jpeg,image/png"
              onChange={(e) => setLogoFile(e.target.files?.[0] ?? null)}
              required
            />
          </section>
          <section>
            <h2>Kehadiran Dalam Talian</h2>
              <label>Pautan media sosial</label>
            <input
              type="url"
              value={form.social_media_link}
              onChange={(e) => update('social_media_link', e.target.value)}
            />
            <label>Laman web</label>
            <input
              type="url"
              value={form.website}
              onChange={(e) => update('website', e.target.value)}
            />
          </section>
          <section>
            <h2>Maklumat Perniagaan</h2>
              <label>Kategori Perniagaan *</label>
            <select
              value={form.business_category}
              onChange={(e) => update('business_category', e.target.value)}
              required
            >
              <option value="">Select</option>
              {choices.business_category.map((c) => (
                <option key={c.value} value={c.value}>{c.label}</option>
              ))}
            </select>
            <label>Saluran Perniagaan (pilihan berganda) *</label>
            <div className="register-channels">
              {choices.business_channel.map((c) => (
                <label key={c.value} className="register-check">
                  <input
                    type="checkbox"
                    checked={form.business_channel.includes(c.value)}
                    onChange={() => toggleChannel(c.value)}
                  />
                  {c.label}
                </label>
              ))}
            </div>
            <label>Julat hasil bulanan *</label>
            <select
              value={form.monthly_revenue_range}
              onChange={(e) => update('monthly_revenue_range', e.target.value)}
              required
            >
              <option value="">Select</option>
              {choices.monthly_revenue_range.map((c) => (
                <option key={c.value} value={c.value}>{c.label}</option>
              ))}
            </select>
            <label>Bilangan pekerja *</label>
            <input
              type="number"
              min="0"
              value={form.number_of_employees}
              onChange={(e) => update('number_of_employees', e.target.value)}
              required
            />
          </section>
          <section>
            <label className="register-check">
              <input
                type="checkbox"
                checked={form.consent_given}
                onChange={(e) => update('consent_given', e.target.checked)}
              />
              Saya memberi kebenaran untuk pemprosesan data saya bagi pendaftaran ini *
            </label>
          </section>
          <button type="submit" disabled={submitting}>
            {submitting ? 'Sedang menghantar...' : 'Hantar Pendaftaran'}
          </button>
        </form>
      </div>
    </div>
  )
}
