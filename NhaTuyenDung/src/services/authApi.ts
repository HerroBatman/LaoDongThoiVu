// API Configuration: use Vite proxy in dev to avoid CORS
const API_BASE_URL = '/api/v1'

// Request/Response Interfaces
export interface LoginRequest {
  email: string
  password: string
}

export interface RegisterRequest {
  email: string
  password: string
  name: string
}

export interface AuthResponse {
  success: boolean
  message: string
  token?: string
  data?: any
}

// Utility Functions
export const getAuthToken = (): string | null => {
  return localStorage.getItem('authToken')
}

export const getAuthHeaders = (): Record<string, string> => {
  const token = getAuthToken()
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  }
  
  if (token) {
    headers['Authorization'] = `Bearer ${token}`
  }
  
  return headers
}

export const authenticatedRequest = async (
  url: string, 
  options: RequestInit = {}
): Promise<any> => {
  const token = getAuthToken()
  
  if (!token) {
    throw new Error('Không có token xác thực. Vui lòng đăng nhập lại.')
  }

  const response = await fetch(url, {
    ...options,
    headers: {
      ...getAuthHeaders(),
      ...options.headers,
    },
    credentials: 'include', // Include cookies for JWT
  })

  if (response.status === 401) {
    // Token expired or invalid
    localStorage.removeItem('authToken')
    localStorage.removeItem('isLoggedIn')
    localStorage.removeItem('userData')
    throw new Error('Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại.')
  }

  const data = await response.json()

  if (!response.ok) {
    throw new Error(data.message || 'Có lỗi xảy ra')
  }

  return data
}

// Login API
export const loginApi = async (loginData: LoginRequest): Promise<AuthResponse> => {
  try {
    const response = await fetch(`${API_BASE_URL}/nhatuyendung/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(loginData),
      credentials: 'include', // Include cookies for JWT
    })

    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.message || 'Đăng nhập thất bại')
    }

    return data
  } catch (error: any) {
    console.error('Login API Error:', error)
    
    // Handle specific error types
    if (error.name === 'TypeError' && error.message.includes('fetch')) {
      throw new Error('Không thể kết nối đến server. Vui lòng kiểm tra kết nối mạng và đảm bảo server đang chạy.')
    }
    
    throw error
  }
}

// Register API
export const registerApi = async (registerData: RegisterRequest): Promise<AuthResponse> => {
  try {
    const response = await fetch(`${API_BASE_URL}/nhatuyendung/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(registerData),
      credentials: 'include', // Include cookies for JWT
    })

    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.message || 'Đăng ký thất bại')
    }

    return data
  } catch (error: any) {
    console.error('Register API Error:', error)
    
    // Handle specific error types
    if (error.name === 'TypeError' && error.message.includes('fetch')) {
      throw new Error('Không thể kết nối đến server. Vui lòng kiểm tra kết nối mạng và đảm bảo server đang chạy.')
    }
    
    throw error
  }
}

// Logout function
export const logout = () => {
  localStorage.removeItem('authToken')
  localStorage.removeItem('isLoggedIn')
  localStorage.removeItem('userEmail')
  localStorage.removeItem('recruiterName')
  localStorage.removeItem('userData')
}

// Check if user is authenticated
export const isAuthenticated = (): boolean => {
  const token = localStorage.getItem('authToken')
  const isLoggedIn = localStorage.getItem('isLoggedIn')
  
  if (!token || isLoggedIn !== 'true') {
    return false
  }
  
  // Basic JWT format validation (has 3 parts separated by dots)
  const tokenParts = token.split('.')
  if (tokenParts.length !== 3) {
    // Invalid JWT format, clear auth data
    localStorage.removeItem('authToken')
    localStorage.removeItem('isLoggedIn')
    localStorage.removeItem('userData')
    return false
  }
  
  return true
}

// ================= Jobs =================
export interface CreateJobPayload {
  title: string
  description: string
  location: string
  address?: string
  requirements?: string[]
  skills?: string[]
  salaryMin?: number
  salaryMax?: number
  salaryUnit?: 'hour' | 'day' | 'month' | 'project'
  salaryText?: string
  startDate?: string
  endDate?: string
  startTime?: string
  endTime?: string
  workersNeeded?: number
  recruitmentMode?: 'auto' | 'manual'
  status?: 'draft' | 'open' | 'closed'
}

export async function createJobApi(payload: CreateJobPayload) {
  return authenticatedRequest(`${API_BASE_URL}/nhatuyendung/jobs`, {
    method: 'POST',
    body: JSON.stringify(payload),
  })
}

export async function listMyJobsApi(params?: { page?: number; limit?: number; status?: string; search?: string }) {
  const q = new URLSearchParams()
  if (params?.page) q.append('page', String(params.page))
  if (params?.limit) q.append('limit', String(params.limit))
  if (params?.status) q.append('status', params.status)
  if (params?.search) q.append('search', params.search)
  return authenticatedRequest(`${API_BASE_URL}/nhatuyendung/jobs?${q.toString()}`)
}

export async function listJobsProgressApi(params?: { page?: number; limit?: number; search?: string }) {
  const q = new URLSearchParams()
  if (params?.page) q.append('page', String(params.page))
  if (params?.limit) q.append('limit', String(params.limit))
  if (params?.search) q.append('search', params.search)
  return authenticatedRequest(`${API_BASE_URL}/nhatuyendung/jobs-progress?${q.toString()}`)
}

export async function markApplicationAttendanceApi(id: string, action: 'checkin' | 'checkout') {
  return authenticatedRequest(`${API_BASE_URL}/nhatuyendung/applications/${id}/attendance`, {
    method: 'POST',
    body: JSON.stringify({ action })
  })
}

export async function getMyJobDetailApi(id: string) {
  return authenticatedRequest(`${API_BASE_URL}/nhatuyendung/jobs/${id}`)
}

export async function updateMyJobApi(id: string, payload: Partial<CreateJobPayload> & { status?: 'draft' | 'open' | 'closed' }) {
  return authenticatedRequest(`${API_BASE_URL}/nhatuyendung/jobs/${id}`, {
    method: 'PUT',
    body: JSON.stringify(payload),
  })
}

export async function deleteMyJobApi(id: string) {
  return authenticatedRequest(`${API_BASE_URL}/nhatuyendung/jobs/${id}`, {
    method: 'DELETE',
  })
}

export async function listEmployerSkillsApi() {
  // Public list of skills for employer app
  return fetch(`${API_BASE_URL}/nhatuyendung/skills`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
  }).then(async (r) => {
    const data = await r.json()
    if (!r.ok) throw new Error(data?.message || 'Không tải được danh sách kỹ năng')
    return data
  })
}