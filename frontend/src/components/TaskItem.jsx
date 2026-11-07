import { useState } from 'react';

export default function TaskItem({ task, onToggle, onDelete, onEdit }) {
  const [editing, setEditing] = useState(false);
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);
  const [error, setError] = useState('');
  const [confirming, setConfirming] = useState(false); // inline delete confirmation

  const save = async () => {
    if (title.trim().length < 3) return setError('Title must be at least 3 characters.');
    const ok = await onEdit(task._id, { title: title.trim(), description: description.trim() });
    if (ok) { setEditing(false); setError(''); }
  };

  if (editing) {
    return (
      <li className="task editing">
        <input value={title} onChange={(e) => setTitle(e.target.value)} />
        <textarea rows={2} value={description} onChange={(e) => setDescription(e.target.value)} />
        {error && <p className="error">{error}</p>}
        <div className="actions">
          <button className="btn" onClick={save}>Save</button>
          <button className="btn btn-ghost" onClick={() => { setEditing(false); setTitle(task.title); setDescription(task.description); }}>Cancel</button>
        </div>
      </li>
    );
  }

  return (
    <li className={`task ${task.completed ? 'done' : ''}`}>
      <input type="checkbox" checked={task.completed} onChange={() => onToggle(task)} />
      <div className="task-body">
        <strong>{task.title}</strong>
        {task.description && <p className="muted">{task.description}</p>}
        <span className={`tag ${task.priority}`}>{task.priority}</span>
      </div>
      <div className="actions">
        <button className="btn btn-ghost" onClick={() => setEditing(true)}>Edit</button>
        {confirming ? (
          <>
            <button className="btn btn-danger" onClick={() => onDelete(task._id)}>Yes, delete</button>
            <button className="btn btn-ghost" onClick={() => setConfirming(false)}>No</button>
          </>
        ) : (
          <button className="btn btn-danger" onClick={() => setConfirming(true)}>Delete</button>
        )}
      </div>
    </li>
  );
}
