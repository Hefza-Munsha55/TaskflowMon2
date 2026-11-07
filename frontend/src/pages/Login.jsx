import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { errMsg } from '../api';

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!/^\S+@\S+\.\S+$/.test(form.email)) return setError('Enter a valid email.');
    if (!form.password) return setError('Enter your password.');
    setLoading(true); setError('');
    try { await login(form.email, form.password); navigate('/'); }
    catch (err) { setError(errMsg(err)); }
    finally { setLoading(false); }
  };

  return (
    <form className="card auth" onSubmit={handleSubmit} noValidate>
      <h2>Welcome back</h2>
      <p className="muted">Log in to manage your tasks.</p>
      <input type="email" placeholder="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
      <input type="password" placeholder="Password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} />
      {error && <p className="error">{error}</p>}
      <button className="btn" disabled={loading}>{loading ? 'Logging in...' : 'Login'}</button>
      <p className="muted">No account? <Link to="/register">Register</Link></p>
    </form>
  );
}
