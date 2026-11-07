import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { errMsg } from '../api';

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', password: '', confirm: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const set = (key) => (e) => setForm({ ...form, [key]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.name.trim().length < 2) return setError('Name must be at least 2 characters.');
    if (!/^\S+@\S+\.\S+$/.test(form.email)) return setError('Enter a valid email.');
    if (form.password.length < 6) return setError('Password must be at least 6 characters.');
    if (form.password !== form.confirm) return setError('Passwords do not match.');
    setLoading(true); setError('');
    try { await register(form.name.trim(), form.email, form.password); navigate('/'); }
    catch (err) { setError(errMsg(err)); }
    finally { setLoading(false); }
  };

  return (
    <form className="card auth" onSubmit={handleSubmit} noValidate>
      <h2>Create your account</h2>
      <p className="muted">It takes less than a minute.</p>
      <input placeholder="Full name" value={form.name} onChange={set('name')} />
      <input type="email" placeholder="Email" value={form.email} onChange={set('email')} />
      <input type="password" placeholder="Password (min 6 characters)" value={form.password} onChange={set('password')} />
      <input type="password" placeholder="Confirm password" value={form.confirm} onChange={set('confirm')} />
      {error && <p className="error">{error}</p>}
      <button className="btn" disabled={loading}>{loading ? 'Creating...' : 'Register'}</button>
      <p className="muted">Already registered? <Link to="/login">Login</Link></p>
    </form>
  );
}
