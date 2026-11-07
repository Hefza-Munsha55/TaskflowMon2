import { useEffect, useState } from 'react';
import api, { errMsg } from '../api';
import TaskForm from '../components/TaskForm';
import TaskList from '../components/TaskList';

export default function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');

  // Load tasks once when the page opens
  useEffect(() => {
    api.get('/tasks')
      .then((res) => setTasks(res.data.tasks))
      .catch((e) => setError(errMsg(e)))
      .finally(() => setLoading(false));
  }, []);

  // Each handler returns true/false so child forms know if it worked
  const addTask = async (data) => {
    try {
      const res = await api.post('/tasks', data);
      setTasks((prev) => [res.data.task, ...prev]);
      return true;
    } catch (e) { setError(errMsg(e)); return false; }
  };

  const editTask = async (id, data) => {
    try {
      const res = await api.put(`/tasks/${id}`, data);
      setTasks((prev) => prev.map((t) => (t._id === id ? res.data.task : t)));
      return true;
    } catch (e) { setError(errMsg(e)); return false; }
  };

  const toggleTask = (task) => editTask(task._id, { completed: !task.completed });

  const deleteTask = async (id) => {
    try {
      await api.delete(`/tasks/${id}`);
      setTasks((prev) => prev.filter((t) => t._id !== id));
    } catch (e) { setError(errMsg(e)); }
  };

  const done = tasks.filter((t) => t.completed).length;
  const visible = tasks
    .filter((t) => (filter === 'active' ? !t.completed : filter === 'done' ? t.completed : true))
    .filter((t) => t.title.toLowerCase().includes(search.toLowerCase()));

  if (loading) return <p className="center muted">Loading your tasks...</p>;

  return (
    <>
      <h1>My Tasks</h1>
      <div className="stats">
        <div className="card stat"><b>{tasks.length}</b><span>Total</span></div>
        <div className="card stat"><b>{tasks.length - done}</b><span>Pending</span></div>
        <div className="card stat"><b>{done}</b><span>Completed</span></div>
      </div>

      {error && <p className="error banner" onClick={() => setError('')}>{error} (click to dismiss)</p>}

      <TaskForm onAdd={addTask} />

      <div className="toolbar">
        <input placeholder="Search tasks..." value={search} onChange={(e) => setSearch(e.target.value)} />
        <div className="tabs">
          {['all', 'active', 'done'].map((f) => (
            <button key={f} className={filter === f ? 'tab on' : 'tab'} onClick={() => setFilter(f)}>{f}</button>
          ))}
        </div>
      </div>

      <TaskList tasks={visible} onToggle={toggleTask} onDelete={deleteTask} onEdit={editTask} />
    </>
  );
}
