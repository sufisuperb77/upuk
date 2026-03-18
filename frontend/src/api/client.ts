/**
 * API client for Usahawan Muda backend.
 * Uses relative /api and /media when served behind same host or Vite proxy.
 */
const API_BASE = import.meta.env.VITE_API_BASE ?? ''

function getCsrfToken(): string | null {
  const name = 'csrftoken'
  const match = document.cookie.match(new RegExp('(^|;\\s*)' + name + '=([^;]*)'))
  return match ? decodeURIComponent(match[2]) : null
}

/**
 * Ensure CSRF cookie is set by calling a GET endpoint with @ensure_csrf_cookie
 */
async function ensureCsrfToken(): Promise<void> {
  if (getCsrfToken()) return // Already have token
  try {
    await fetch(`${API_BASE}/api/csrf-token/`, {
      method: 'GET',
      credentials: 'include',
    })
  } catch {
    // Non-critical; proceed without CSRF if endpoint doesn't exist
  }
}

export type Choice = { value: string; label: string }

export type ChoicesResponse = {
  negeri: Choice[]
  daerah: Choice[]
  business_category: Choice[]
  business_channel: Choice[]
  monthly_revenue_range: Choice[]
}

async function request<T>(
  path: string,
  options: RequestInit = {}
): Promise<T> {
  const url = `${API_BASE}${path}`
  const method = (options.method || 'GET').toUpperCase()
  const headers: Record<string, string> = {
    ...(options.headers as Record<string, string>),
  }
  if (method !== 'GET' && method !== 'HEAD') {
    const csrf = getCsrfToken()
    if (csrf) headers['X-CSRFToken'] = csrf
  }
  if (options.body && !(options.body instanceof FormData)) {
    headers['Content-Type'] = 'application/json'
  }
  const res = await fetch(url, {
    ...options,
    credentials: 'include',
    headers,
  })
  if (!res.ok) {
    const err = await res.json().catch(() => ({ detail: res.statusText }))
    // If it's validation errors (object of field->errors), format them
    if (typeof err === 'object' && !('detail' in err) && !('error' in err)) {
      const messages = Object.entries(err)
        .map(([field, msgs]: [string, any]) => {
          const msgArray = Array.isArray(msgs) ? msgs : [msgs]
          return `${field}: ${msgArray.map(m => typeof m === 'string' ? m : m.message || String(m)).join(', ')}`
        })
        .join('; ')
      throw new Error(messages || 'Validation failed')
    }
    throw new Error(err.error ?? err.detail ?? res.statusText)
  }
  if (res.status === 204) return undefined as T
  return res.json() as Promise<T>
}

export const api = {
  getChoices: () => request<ChoicesResponse>('/api/choices/'),

  getDaeraDayNegeri: (negeri: string) =>
    request<{ daerah: Choice[] }>(`/api/daerah-by-negeri/?negeri=${encodeURIComponent(negeri)}`),

  register: async (formData: FormData) => {
    await ensureCsrfToken()
    return request<Record<string, unknown>>('/api/register/', {
      method: 'POST',
      body: formData,
    })
  },

  login: async (username: string, password: string) => {
    await ensureCsrfToken()
    return request<{ user: { id: number; username: string; is_staff: boolean } }>('/api/auth/login/', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
    })
  },

  logout: async () => {
    await ensureCsrfToken()
    return request<{ detail: string }>('/api/auth/logout/', { method: 'POST' })
  },

  me: () =>
    request<{ user: { id: number; username: string; is_staff: boolean } }>('/api/auth/me/'),

  getBusinesses: (params?: Record<string, string>) => {
    const q = new URLSearchParams(params).toString()
    const path = '/api/businesses/' + (q ? '?' + q : '')
    return request<Array<Record<string, unknown>>>(path)
  },

  getBusiness: (id: number) =>
    request<Record<string, unknown>>(`/api/businesses/${id}/`),

  getAnalyticsOverview: () =>
    request<{ total_businesses: number }>('/api/analytics/overview/'),

  getAnalyticsByNegeri: () =>
    request<Array<{ negeri: string; count: number }>>('/api/analytics/by-negeri/'),

  getAnalyticsByCategory: () =>
    request<Array<{ business_category: string; count: number }>>('/api/analytics/by-category/'),

  getAnalyticsRevenue: () =>
    request<Array<{ monthly_revenue_range: string; count: number }>>(
      '/api/analytics/revenue-distribution/'
    ),
}
