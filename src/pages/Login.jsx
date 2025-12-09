import React, { useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';
import "../styles/login.css";

export default function Login() {
  const [sp] = useSearchParams();
  const next = sp.get('next') || '/control-987';
  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [err, setErr] = useState(null);
  const [busy, setBusy] = useState(false);

  async function onSubmit(e) {
    e.preventDefault();
    setErr(null);
    setBusy(true);
    try {
      await login(email, password);
      navigate(next, { replace: true });
    } catch (ex) {
      setErr(ex.message || 'Login failed');
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="login-page-center">

      <div className="login-wrapper">
        <h1 className="login-title">Sign in</h1>

        <form onSubmit={onSubmit}>
          <label>Email</label>
          <input
            type="email"
            required
            value={email}
            onChange={e => setEmail(e.target.value)}
            className="login-input"
          />

          <label>Password</label>
          <input
            type="password"
            required
            value={password}
            onChange={e => setPassword(e.target.value)}
            className="login-input"
          />

          <button disabled={busy} className="login-button">
            {busy ? 'Signing in…' : 'Sign in'}
          </button>
        </form>

        {err && <p className="login-error">{err}</p>}
      </div>

    </div>
  );
}
