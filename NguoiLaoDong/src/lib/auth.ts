const TOKEN_KEY = 'auth_token'
const USER_KEY = 'auth_user'

export function isAuthenticated(): boolean {
  const token = localStorage.getItem(TOKEN_KEY)
  return Boolean(token)
}

export function logout(): void {
  localStorage.removeItem(TOKEN_KEY)
  localStorage.removeItem(USER_KEY)
}

export function getCurrentUser(): { status?: boolean } | null {
  try {
    const raw = localStorage.getItem(USER_KEY)
    if (!raw) return null
    return JSON.parse(raw)
  } catch {
    return null
  }
}


