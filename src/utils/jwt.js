export function decodeJwtPayload(token) {
  try {
    const base = token.split('.')[1];
    if (!base) return null;
    const b64 = base.replace(/-/g, '+').replace(/_/g, '/');
    const padded = b64 + '='.repeat((4 - (b64.length % 4)) % 4);
    const json = atob(padded);
    return JSON.parse(json);
  } catch {
    return null;
  }
}

export function getTokenExp(token) {
  const payload = decodeJwtPayload(token);
  return payload && typeof payload.exp === 'number' ? payload.exp : null;
}
