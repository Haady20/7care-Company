import React, { useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';
<<<<<<< HEAD
import "../styles/login.css";
=======
>>>>>>> e358e1aa16128d625cfe0ead105dd741127f3d66

export default function Login() {
  const [sp] = useSearchParams();
  const next = sp.get('next') || '/control-987';
  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState('admin@example.com');
  const [password, setPassword] = useState('Admin123!');
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
<<<<<<< HEAD
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

=======
    <div style={{ maxWidth: 380, margin: '48px auto', padding: 16 }}>
      <h1 style={{ fontSize: 22, marginBottom: 12 }}>Sign in</h1>
      <form onSubmit={onSubmit}>
        <label>Email</label>
        <input
          type="email"
          required
          value={email}
          onChange={e => setEmail(e.target.value)}
          style={{ display: 'block', width: '100%', padding: 8, marginBottom: 8 }}
        />
        <label>Password</label>
        <input
          type="password"
          required
          value={password}
          onChange={e => setPassword(e.target.value)}
          style={{ display: 'block', width: '100%', padding: 8, marginBottom: 12 }}
        />
        <button disabled={busy} style={{ width: '100%', padding: 10 }}>
          {busy ? 'Signing in…' : 'Sign in'}
        </button>
      </form>
      {err && <p style={{ color: 'crimson', marginTop: 10 }}>{err}</p>}
    </div>
>>>>>>> e358e1aa16128d625cfe0ead105dd741127f3d66
  );
}
