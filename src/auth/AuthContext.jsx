import React, { createContext, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { getTokenExp } from '../utils/jwt';

const AuthContext = createContext(null);

const LS_TOKEN_KEY = 'auth.token';
const LS_USER_KEY  = 'auth.user';

function getInitialAuth() {
  const token = localStorage.getItem(LS_TOKEN_KEY) || null;
  const userJson = localStorage.getItem(LS_USER_KEY);
  const user = userJson ? JSON.parse(userJson) : null;
  // drop expired tokens on load
  if (token) {
    const exp = getTokenExp(token);
    if (!exp || Math.floor(Date.now()/1000) >= exp) {
      localStorage.removeItem(LS_TOKEN_KEY);
      localStorage.removeItem(LS_USER_KEY);
      return { token: null, user: null, exp: null, isAuthed: false };
    }
    return { token, user, exp, isAuthed: true };
  }
  return { token: null, user: null, exp: null, isAuthed: false };
}

export function AuthProvider({ children }) {
  const [{ token, user, exp, isAuthed }, setAuth] = useState(getInitialAuth);
  const logoutTimerRef = useRef(null);

  function clearLogoutTimer() {
    if (logoutTimerRef.current) {
      clearTimeout(logoutTimerRef.current);
      logoutTimerRef.current = null;
    }
  }

  useEffect(() => {
    if (token && exp) {
      clearLogoutTimer();
      const ms = exp * 1000 - Date.now();
      if (ms > 0) {
        logoutTimerRef.current = setTimeout(() => logout(), ms);
      } else {
        logout();
      }
    }
    return clearLogoutTimer;
  }, [token, exp]);

  // cross-tab sync
  useEffect(() => {
    function onStorage(e) {
      if (e.key === LS_TOKEN_KEY || e.key === LS_USER_KEY) {
        setAuth(getInitialAuth());
      }
    }
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, []);

  async function login(email, password) {
    const r = await fetch('http://localhost:3000/api/auth/login', {

      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    if (!r.ok) throw new Error('Invalid email or password');

    const data = await r.json();
    const t = data?.token;
    const u = data?.user || null;
    if (!t) throw new Error('No token in response');

    const e = getTokenExp(t);
    if (!e) throw new Error('Token missing exp');

    localStorage.setItem(LS_TOKEN_KEY, t);
    localStorage.setItem(LS_USER_KEY, JSON.stringify(u));
    setAuth({ token: t, user: u, exp: e, isAuthed: true });
  }

  function logout() {
    localStorage.removeItem(LS_TOKEN_KEY);
    localStorage.removeItem(LS_USER_KEY);
    setAuth({ token: null, user: null, exp: null, isAuthed: false });
  }

  const value = useMemo(() => ({
    token, user, exp, isAuthed, login, logout,
    getAuthHeader: () => (token ? { Authorization: `Bearer ${token}` } : {})
  }), [token, user, exp, isAuthed]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside <AuthProvider>');
  return ctx;
}
