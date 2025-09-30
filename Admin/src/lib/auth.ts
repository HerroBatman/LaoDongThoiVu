const TOKEN_KEY = 'admin_token';
const USER_KEY = 'admin_user';
const LOGIN_STATUS_KEY = 'isAdminLoggedIn';

export function isAuthenticated(): boolean {
  const token = localStorage.getItem(TOKEN_KEY);
  const loginStatus = localStorage.getItem(LOGIN_STATUS_KEY);
  return Boolean(token && loginStatus === 'true');
}

export function logout(): void {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
  localStorage.removeItem(LOGIN_STATUS_KEY);
}

export function getCurrentUser(): AdminUser | null {
  try {
    const raw = localStorage.getItem(USER_KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

export function getToken(): string | null {
  return localStorage.getItem(TOKEN_KEY);
}

export type AdminUser = {
  _id: string;
  email: string;
  name: string;
  role: string;
  permissions?: string[];
  lastLogin?: string;
};
