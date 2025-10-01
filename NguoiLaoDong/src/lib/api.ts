export type ApiResponse<T> = {
  success: boolean
  message?: string
  data?: T
  token?: string
}

// Use env var when provided; fall back to dev proxy path
const API_BASE_URL = (import.meta as any).env?.VITE_API_BASE_URL || '/api/v1'

const TOKEN_KEY = 'auth_token'

export const getToken = () => localStorage.getItem(TOKEN_KEY)
export const setToken = (token: string) => localStorage.setItem(TOKEN_KEY, token)
export const clearToken = () => localStorage.removeItem(TOKEN_KEY)

async function request<T>(path: string, options: RequestInit = {}): Promise<ApiResponse<T>> {
  const token = getToken()
  const headers = new Headers(options.headers as HeadersInit)
  if (!headers.has('Content-Type')) headers.set('Content-Type', 'application/json')
  if (token) headers.set('Authorization', `Bearer ${token}`)

  const res = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers,
  })

  const contentType = res.headers.get('content-type') || ''
  const isJson = contentType.includes('application/json')
  const body = isJson ? await res.json() : undefined

  // Try to extract token from response headers if backend sends it that way
  const headerAuth = res.headers.get('authorization') || res.headers.get('Authorization') || res.headers.get('x-auth-token')
  let headerToken: string | undefined
  if (headerAuth) {
    headerToken = headerAuth.startsWith('Bearer ')
      ? headerAuth.slice(7)
      : headerAuth
  }

  if (!res.ok) {
    throw new Error(body?.message || `Request failed with ${res.status}`)
  }

  const result = (body || {}) as ApiResponse<T>
  if (!result.token && headerToken) {
    (result as any).token = headerToken
  }
  return result
}

export const api = {
  post: <T>(path: string, data?: unknown) =>
    request<T>(path, { method: 'POST', body: data ? JSON.stringify(data) : undefined }),
  get: <T>(path: string) => request<T>(path),
  put: <T>(path: string, data?: unknown) =>
    request<T>(path, { method: 'PUT', body: data ? JSON.stringify(data) : undefined }),
}

// Employer auth endpoints
type LoginPayload = { email: string; password: string }
type RegisterPayload = { email: string; password: string; name: string; gender: 'male' | 'female' | 'other' }

export type UserDto = {
  _id: string
  email: string
  name: string
  gender: 'male' | 'female' | 'other'
  trustScore?: number
  status: boolean
  role?: string
}

export async function employerLogin(payload: LoginPayload) {
  const res = await api.post<UserDto>('/employer/login', payload)
  if (res?.token) setToken(res.token)
  if (res?.data) localStorage.setItem('auth_user', JSON.stringify(res.data))
  return res
}

export async function employerRegister(payload: RegisterPayload) {
  const res = await api.post<UserDto>('/employer/register', payload)
  if (res?.token) setToken(res.token)
    
  if (res?.data) localStorage.setItem('auth_user', JSON.stringify(res.data))
  return res
}


// ============ COMPETENCY APIs (Worker self) ============
export type CompetencyDto = {
  _id?: string
  skill: string
  level: 'beginner' | 'intermediate' | 'advanced' | 'expert'
  yearsOfExperience?: number
  certifications?: string[]
  notes?: string
  status?: 'active' | 'inactive'
}

export type SkillLiteDto = { _id: string; name: string; slug: string }

export async function listPublicSkills() {
  return api.get<SkillLiteDto[]>('/employer/skills')
}

export async function listMyCompetencies() {
  return api.get<CompetencyDto[]>('/employer/me/competencies')
}

export async function saveMyCompetencies(competencies: CompetencyDto[]) {
  return api.post<CompetencyDto[]>('/employer/me/competencies', { competencies })
}

export async function getMyProfile() {
  return api.get('/employer/me')
}

export async function updateMyProfile(payload: { experienceDescription?: string; availability?: { morning?: boolean; afternoon?: boolean; evening?: boolean; night?: boolean } }) {
  return api.put('/employer/me', payload)
}

// ============ JOB LISTING FOR WORKERS ============
export async function listOpenJobs(params?: { page?: number; limit?: number; search?: string; strictOnly?: boolean }) {
  const q = new URLSearchParams()
  if (params?.page) q.append('page', String(params.page))
  if (params?.limit) q.append('limit', String(params.limit))
  if (params?.search) q.append('search', params.search)
  // Prefer matched jobs endpoint for logged-in workers; fallback to public if needed
  try {
    const matched = await api.get(`/employer/matched-jobs?${q.toString()}`)
    if (params?.strictOnly) {
      return matched
    }
    if (matched?.success && Array.isArray((matched as any).data) && (matched as any).data.length === 0) {
      // Fallback to public open jobs when no matches are available
      return api.get(`/public/jobs?${q.toString()}`)
    }
    return matched
  } catch (e) {
    return params?.strictOnly ? { success: true, data: [] } as any : api.get(`/public/jobs?${q.toString()}`)
  }
}


