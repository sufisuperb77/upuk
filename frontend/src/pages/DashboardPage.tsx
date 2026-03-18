import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts'
import { useAuth } from '../contexts/AuthContext'
import { api } from '../api/client'
import './Dashboard.css'

const CHART_COLORS = ['#0ea5e9', '#8b5cf6', '#10b981', '#f59e0b', '#ef4444', '#ec4899', '#6366f1', '#14b8a6']

export default function DashboardPage() {
  const { user, loading, logout } = useAuth()
  const navigate = useNavigate()
  const [overview, setOverview] = useState<{ total_businesses: number } | null>(null)
  const [byNegeri, setByNegeri] = useState<Array<{ negeri: string; count: number }>>([])
  const [byCategory, setByCategory] = useState<Array<{ business_category: string; count: number }>>([])
  const [revenue, setRevenue] = useState<Array<{ monthly_revenue_range: string; count: number }>>([])
  const [businesses, setBusinesses] = useState<Array<Record<string, unknown>>>([])
  const [fetchError, setFetchError] = useState('')

  useEffect(() => {
    if (!user) return
    Promise.all([
      api.getAnalyticsOverview(),
      api.getAnalyticsByNegeri(),
      api.getAnalyticsByCategory(),
      api.getAnalyticsRevenue(),
      api.getBusinesses(),
    ])
      .then(([o, n, c, r, b]) => {
        setOverview(o)
        setByNegeri(n)
        setByCategory(c)
        setRevenue(r)
        setBusinesses(Array.isArray(b) ? b : [])
      })
      .catch(() => setFetchError('Gagal memuat data papan pemuka'))
  }, [user])

  function handleLogout() {
    logout().then(() => navigate('/login', { replace: true }))
  }

  if (loading) return <div className="dashboard-loading">Memuat...</div>
  if (!user) {
    navigate('/login', { replace: true })
    return null
  }

  const pieData = byNegeri.map((d) => ({ name: d.negeri.replace(/_/g, ' '), value: d.count }))
  const barCategoryData = byCategory.map((d) => ({
    name: d.business_category.replace(/_/g, ' '),
    count: d.count,
  }))
  const barRevenueData = revenue.map((d) => ({
    name: d.monthly_revenue_range.replace(/_/g, ' '),
    count: d.count,
  }))

  return (
    <div className="dashboard-page">
      <header className="dashboard-header">
        <h1>Selamat Datang <span>{user.username}</span> </h1>
        <div className="dashboard-user">
          <a href="/admin/" target="_blank" rel="noreferrer">Admin</a>
          <button type="button" onClick={handleLogout}>Log out</button>
        </div>
      </header>
      {fetchError && <div className="dashboard-error">{fetchError}</div>}
      <main className="dashboard-main">
        <section className="dashboard-overview">
          <h2>Gambaran Keseluruhan</h2>
          <div className="stat-card">
            <span className="stat-value">{overview?.total_businesses ?? 0}</span>
            <span className="stat-label">Jumlah perniagaan</span>
          </div>
        </section>
        <section className="dashboard-charts">
          <div className="chart-card">
            <h3>Mengikut Negeri (Pai)</h3>
            {pieData.length > 0 ? (
              <ResponsiveContainer width="100%" height={280}>
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={2}
                    dataKey="value"
                    label={({ name, value }) => `${name}: ${value}`}
                  >
                    {pieData.map((_, i) => (
                      <Cell key={i} fill={CHART_COLORS[i % CHART_COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <p className="chart-empty">Tiada data</p>
            )}
          </div>
          <div className="chart-card">
            <h3>Mengikut Kategori</h3>
            {barCategoryData.length > 0 ? (
              <ResponsiveContainer width="100%" height={280}>
                <BarChart data={barCategoryData} margin={{ top: 8, right: 8, left: 8, bottom: 8 }}>
                  <XAxis dataKey="name" tick={{ fontSize: 11 }} />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="count" fill="#0ea5e9" name="Count" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <p className="chart-empty">Tiada data</p>
            )}
          </div>
          <div className="chart-card chart-full">
            <h3>Taburan julat hasil</h3>
            {barRevenueData.length > 0 ? (
              <ResponsiveContainer width="100%" height={260}>
                <BarChart data={barRevenueData} margin={{ top: 8, right: 8, left: 8, bottom: 8 }}>
                  <XAxis dataKey="name" tick={{ fontSize: 11 }} />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="count" fill="#8b5cf6" name="Count" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <p className="chart-empty">Tiada data</p>
            )}
          </div>
        </section>
        <section className="dashboard-list">
          <h2>Pendaftaran Terkini</h2>
          {businesses.length === 0 ? (
            <p className="list-empty">Tiada pendaftaran lagi.</p>
          ) : (
            <div className="table-wrap">
              <table>
                <thead>
                  <tr>
                    <th>Syarikat</th>
                    <th>Negeri</th>
                    <th>Daerah</th>
                    <th>Kategori</th>
                    <th>Julat hasil</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {businesses.slice(0, 20).map((b) => (
                    <tr key={String(b.id)}>
                      <td>{String(b.company_name)}</td>
                      <td>{String(b.negeri).replace(/_/g, ' ')}</td>
                      <td>{String(b.daerah).replace(/_/g, ' ')}</td>
                      <td>{String(b.business_category).replace(/_/g, ' ')}</td>
                      <td>{String(b.monthly_revenue_range).replace(/_/g, ' ')}</td>
                      <td><span className={`status status-${b.status}`}>{String(b.status)}</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </main>
    </div>
  )
}
