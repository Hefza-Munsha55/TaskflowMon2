import { useState } from 'react';

// Controlled inputs + validation. Calls onAdd(task) when valid.
export default function TaskForm({ onAdd }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('medium');
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (title.trim().length < 3) return setError('Title must be at least 3 characters.');
    if (title.trim().length > 100) return setError('Title must be under 100 characters.');
    setError('');
    setSaving(true);
    const ok = await onAdd({ title: title.trim(), description: description.trim(), priority });
    setSaving(false);
    if (ok) { setTitle(''); setDescription(''); setPriority('medium'); }
  };

  return (
    <form className="card form" onSubmit={handleSubmit} noValidate>
      <h3>Add a new task</h3>
      <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="What needs to be done?" />
      <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Details (optional)" rows={2} />
      <div className="row">
        <select value={priority} onChange={(e) => setPriority(e.target.value)}>
          <option value="low">Low priority</option>
          <option value="medium">Medium priority</option>
          <option value="high">High priority</option>
        </select>
        <button className="btn" disabled={saving}>{saving ? 'Adding...' : 'Add Task'}</button>
      </div>
      {error && <p className="error">{error}</p>}
    </form>
  );
}
