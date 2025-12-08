// Usage: import { apiFetch } from './api/client'; await apiFetch('/some/protected/resource')
export async function apiFetch(path, { method = 'GET', headers = {}, body, ...rest } = {}) {
  const token = localStorage.getItem('auth.token');
  const h = { ...headers };
  if (token) h['Authorization'] = `Bearer ${token}`;
  if (body && !h['content-type']) h['content-type'] = 'application/json';

  const res = await fetch(path, { method, headers: h, body, ...rest });
  // If your backend returns 401 on token expiry, you might want to handle it here.
  return res;
}
