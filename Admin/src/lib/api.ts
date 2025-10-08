export type ApiResponse<T> = {
  success: boolean;
  message?: string;
  data?: T;
  token?: string;
};

// Use env var when provided; fall back to dev proxy path
const API_BASE_URL = 'http://localhost:8080/api/v1';

const TOKEN_KEY = 'admin_token';

export const getToken = () => localStorage.getItem(TOKEN_KEY);
export const setToken = (token: string) => localStorage.setItem(TOKEN_KEY, token);
export const clearToken = () => localStorage.removeItem(TOKEN_KEY);

async function request<T>(path: string, options: RequestInit = {}): Promise<ApiResponse<T>> {
  const token = getToken();
  const headers = new Headers(options.headers as HeadersInit);
  if (!headers.has('Content-Type')) headers.set('Content-Type', 'application/json');
  if (token) headers.set('Authorization', `Bearer ${token}`);

  const res = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers,
  });

  const contentType = res.headers.get('content-type') || '';
  const isJson = contentType.includes('application/json');
  const body = isJson ? await res.json() : undefined;

  // Try to extract token from response headers if backend sends it that way
  const headerAuth = res.headers.get('authorization') || res.headers.get('Authorization') || res.headers.get('x-auth-token');
  let headerToken: string | undefined;
  if (headerAuth) {
    headerToken = headerAuth.startsWith('Bearer ')
      ? headerAuth.slice(7)
      : headerAuth;
  }

  if (!res.ok) {
    throw new Error(body?.message || `Request failed with ${res.status}`);
  }

  const result = (body || {}) as ApiResponse<T>;
  if (!result.token && headerToken) {
    (result as any).token = headerToken;
  }
  return result;
}

export const api = {
  post: <T>(path: string, data?: unknown) =>
    request<T>(path, { method: 'POST', body: data ? JSON.stringify(data) : undefined }),
  get: <T>(path: string) => request<T>(path),
  put: <T>(path: string, data?: unknown) =>
    request<T>(path, { method: 'PUT', body: data ? JSON.stringify(data) : undefined }),
  delete: <T>(path: string) => request<T>(path, { method: 'DELETE' }),
};

// Admin auth endpoints
type AdminLoginPayload = { email: string; password: string };

export type AdminUserDto = {
  _id: string;
  email: string;
  name: string;
  role: string;
  permissions?: string[];
  lastLogin?: string;
};

export async function adminLogin(payload: AdminLoginPayload) {
  const res = await api.post<AdminUserDto>('/admin/login', payload);
  if (res?.token) setToken(res.token);
  if (res?.data) localStorage.setItem('admin_user', JSON.stringify(res.data));
  return res;
}

export async function adminLogout() {
  clearToken();
  localStorage.removeItem('admin_user');
  localStorage.removeItem('isAdminLoggedIn');
}

export async function getCurrentAdmin() {
  const res = await api.get<AdminUserDto>('/admin/me');
  return res;
}

// Dashboard APIs
export async function getDashboardStats() {
  const res = await api.get('/admin/dashboard/stats');
  return res;
}

export async function getRecentActivities() {
  const res = await api.get('/admin/dashboard/activities');
  return res;
}

// ============ USER MANAGEMENT APIs ============

// User types
export type UserType = "worker" | "employer";

// User management DTOs
export type WorkerDto = {
  _id: string;
  name: string;
  email: string;
  phone: string;
  status: boolean;
  trustScore: number;
  createdAt: string;
  updatedAt: string;
};

export type EmployerDto = {
  _id: string;
  name: string;
  email: string;
  phone: string;
  status: boolean;
  createdAt: string;
  updatedAt: string;
};

export type UserStatsDto = {
  workers: {
    total: number;
    active: number;
    pending: number;
    trustScore: {
      avgTrustScore: number;
      maxTrustScore: number;
      minTrustScore: number;
    };
  };
  employers: {
    total: number;
    active: number;
    pending: number;
  };
};

// Get workers with pagination and filters
export async function getWorkers(params?: {
  page?: number;
  limit?: number;
  search?: string;
  status?: string;
  sortBy?: string;
  sortOrder?: string;
}) {
  const queryParams = new URLSearchParams();
  if (params?.page) queryParams.append("page", params.page.toString());
  if (params?.limit) queryParams.append("limit", params.limit.toString());
  if (params?.search) queryParams.append("search", params.search);
  if (params?.status) queryParams.append("status", params.status);
  if (params?.sortBy) queryParams.append("sortBy", params.sortBy);
  if (params?.sortOrder) queryParams.append("sortOrder", params.sortOrder);

  return api.get<{ data: WorkerDto[]; pagination: any; stats: any }>(`/admin/workers?${queryParams.toString()}`);
}

// Get employers with pagination and filters
export async function getEmployers(params?: {
  page?: number;
  limit?: number;
  search?: string;
  status?: string;
  sortBy?: string;
  sortOrder?: string;
}) {
  const queryParams = new URLSearchParams();
  if (params?.page) queryParams.append("page", params.page.toString());
  if (params?.limit) queryParams.append("limit", params.limit.toString());
  if (params?.search) queryParams.append("search", params.search);
  if (params?.status) queryParams.append("status", params.status);
  if (params?.sortBy) queryParams.append("sortBy", params.sortBy);
  if (params?.sortOrder) queryParams.append("sortOrder", params.sortOrder);

  return api.get<{ data: EmployerDto[]; pagination: any; stats: any }>(`/admin/employers?${queryParams.toString()}`);
}

// Approve user account
export async function approveAccount(id: string, userType: UserType) {
  return api.post("/admin/approve-account", { id, userType });
}

// Reject user account
export async function rejectAccount(id: string, userType: UserType, reason: string) {
  return api.post("/admin/reject-account", { id, userType, reason });
}

// Get user details by ID and type
export async function getUserDetails(id: string, userType: UserType) {
  return api.get<WorkerDto | EmployerDto>(`/admin/users/${userType}/${id}`);
}

// Get user statistics
export async function getUserStats() {
  return api.get<UserStatsDto>("/admin/users/stats");
}

// Job Management APIs
export async function getJobs(page = 1, limit = 10, filters?: any) {
  const queryParams = new URLSearchParams({
    page: page.toString(),
    limit: limit.toString(),
    ...filters
  });
  const res = await api.get(`/admin/jobs?${queryParams}`);
  return res;
}

export async function deleteJob(jobId: string, reason?: string) {
  const res = await api.delete(`/admin/jobs/${jobId}?reason=${reason || ''}`);
  return res;
}

// Progress Management APIs
export async function getWorkProgress(date?: string, filters?: any) {
  const queryParams = new URLSearchParams({
    ...(date && { date }),
    ...filters
  });
  const res = await api.get(`/admin/progress?${queryParams}`);
  return res;
}

// Contract & Payment APIs
export async function getContracts(page = 1, limit = 10, filters?: any) {
  const queryParams = new URLSearchParams({
    page: page.toString(),
    limit: limit.toString(),
    ...filters
  });
  const res = await api.get(`/admin/contracts?${queryParams}`);
  return res;
}

export async function getPayments(page = 1, limit = 10, filters?: any) {
  const queryParams = new URLSearchParams({
    page: page.toString(),
    limit: limit.toString(),
    ...filters
  });
  const res = await api.get(`/admin/payments?${queryParams}`);
  return res;
}

// Reputation Management APIs
export async function getReputationReports(page = 1, limit = 10, filters?: any) {
  const queryParams = new URLSearchParams({
    page: page.toString(),
    limit: limit.toString(),
    ...filters
  });
  const res = await api.get(`/admin/reputation?${queryParams}`);
  return res;
}

// Complaint Management APIs
export async function getComplaints(page = 1, limit = 10, filters?: any) {
  const queryParams = new URLSearchParams({
    page: page.toString(),
    limit: limit.toString(),
    ...filters
  });
  const res = await api.get(`/admin/complaints?${queryParams}`);
  return res;
}

export async function resolveComplaint(complaintId: string, resolution: string) {
  const res = await api.post(`/admin/complaints/${complaintId}/resolve`, { resolution });
  return res;
}

// Reports APIs
export async function getReports(type: string, dateRange?: { from: string; to: string }) {
  const queryParams = new URLSearchParams({
    type,
    ...(dateRange && { from: dateRange.from, to: dateRange.to })
  });
  const res = await api.get(`/admin/reports?${queryParams}`);
  return res;
}

// ============ ADMIN JOBS ============
export async function listAdminJobs(params?: { page?: number; limit?: number; status?: string; search?: string }) {
  const queryParams = new URLSearchParams();
  if (params?.page) queryParams.append('page', String(params.page));
  if (params?.limit) queryParams.append('limit', String(params.limit));
  if (params?.status) queryParams.append('status', params.status);
  if (params?.search) queryParams.append('search', params.search);
  return api.get(`/admin/jobs?${queryParams.toString()}`);
}

export async function approveJob(jobId: string) {
  return api.post(`/admin/jobs/${jobId}/approve`);
}

export async function rejectJob(jobId: string, reason?: string) {
  return api.post(`/admin/jobs/${jobId}/reject`, { reason });
}

// Skills APIs
export type SkillDto = {
  _id: string;
  name: string;
  slug: string;
  description?: string;
  status: "active" | "inactive";
  createdAt?: string;
  updatedAt?: string;
};

export async function listSkills(params?: { page?: number; limit?: number; search?: string; status?: string; }) {
  const queryParams = new URLSearchParams();
  if (params?.page) queryParams.append("page", params.page.toString());
  if (params?.limit) queryParams.append("limit", params.limit.toString());
  if (params?.search) queryParams.append("search", params.search);
  if (params?.status) queryParams.append("status", params.status);
  return api.get<SkillDto[]>(`/admin/skills?${queryParams.toString()}`);
}

export async function createSkill(payload: { name: string; slug: string; description?: string; status?: string; }) {
  return api.post<SkillDto>("/admin/skills", payload);
}

export async function updateSkill(id: string, payload: { name?: string; slug?: string; description?: string; status?: string; }) {
  return api.put<SkillDto>(`/admin/skills/${id}`, payload);
}

export async function deleteSkill(id: string) {
  return api.delete(`/admin/skills/${id}`);
}