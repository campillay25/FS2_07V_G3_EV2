const STORAGE_KEY = 'levelup.auth';
export const AUTH_EVENT = 'levelup-auth-changed';

export function getAuthSession() {
  try {
    const session = JSON.parse(sessionStorage.getItem(STORAGE_KEY));
    if (
      typeof session?.accessToken === 'string' &&
      Number.isFinite(session.expiresAt) &&
      session.expiresAt > Date.now()
    ) {
      return session;
    }
  } catch {
  
  }
  return null;
}

export function saveAuthSession(response) {
  const session = {
    accessToken: response.accessToken,
    email: response.email,
    rol: response.rol,
    expiresAt: Date.now() + response.expiresIn * 1000,
  };
  sessionStorage.setItem(STORAGE_KEY, JSON.stringify(session));
  window.dispatchEvent(new Event(AUTH_EVENT));
}

export function clearAuthSession() {
  sessionStorage.removeItem(STORAGE_KEY);
  window.dispatchEvent(new Event(AUTH_EVENT));
}