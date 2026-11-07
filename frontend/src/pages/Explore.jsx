import { useEffect, useState } from 'react';
import axios from 'axios';
import api, { errMsg } from '../api';

// Task 2: external public REST API (JSONPlaceholder) with loading / error / empty / search / filter states
const URL = 'https://jsonplaceholder.typicode.com/todos?_limit=40';

export default function Explore() {
  const [ideas, setIdeas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all');
  const [added, setAdded] = useState([]); // ids already added by this user
  const [notice, setNotice] = useState('');

  const load = () => {
    setLoading(true); setError('');
    axios.get(URL)
      .then((res) => setIdeas(res.data))
      .catch(() => setError('Could not load ideas. Check your internet and try again.'))
      .finally(() => setLoading(false));
  };

  useEffect(load, []);

  const addToMyTasks = async (idea) => {
    const title = idea.title.charAt(0).toUpperCase() + idea.title.slice(1);
    try {
      await api.post('/tasks', { title: title.slice(0, 100), priority: 'low' });
      setAdded((prev) => [...prev, idea.id]);
      setNotice('Added to My Tasks!');
      setTimeout(() => setNotice(''), 2000);
    } catch (e) { setNotice(errMsg(e)); }
  };

  const visible = ideas
    .filter((i) => (filter === 'all' ? true : filter === 'done' ? i.completed : !i.completed))
    .filter((i) => i.title.toLowerCase().includes(search.toLowerCase()));

  return (
    <>
      <h1>Explore task ideas</h1>
      <p className="muted">Browse ideas from a public API and add the ones you like to your own list.</p>
      {notice && <p className="success banner">{notice}</p>}

      <div className="toolbar">
        <input placeholder="Search ideas..." value={search} onChange={(e) => setSearch(e.target.value)} />
        <div className="tabs">
          {[['all', 'All'], ['todo', 'To do'], ['done', 'Done by others']].map(([v, l]) => (
            <button key={v} className={filter === v ? 'tab on' : 'tab'} onClick={() => setFilter(v)}>{l}</button>
          ))}
        </div>
      </div>

      {loading && <p className="center muted">Loading ideas...</p>}
      {error && (
        <div className="card center">
          <p className="error">{error}</p>
          <button className="btn" onClick={load}>Retry</button>
        </div>
      )}
      {!loading && !error && visible.length === 0 && <div className="card center muted">No ideas match your search.</div>}

      <div className="grid">
        {visible.map((i) => (
          <div className="card idea" key={i.id}>
            <p>{i.title}</p>
            <button className="btn" disabled={added.includes(i.id)} onClick={() => addToMyTasks(i)}>
              {added.includes(i.id) ? 'Added' : '+ Add'}
            </button>
          </div>
        ))}
      </div>
    </>
  );
}
