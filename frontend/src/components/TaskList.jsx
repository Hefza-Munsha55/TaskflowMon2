import TaskItem from './TaskItem';

export default function TaskList({ tasks, onToggle, onDelete, onEdit }) {
  if (tasks.length === 0) {
    return <div className="card center muted">No tasks to show here. Add one above!</div>;
  }
  return (
    <ul className="task-list">
      {tasks.map((t) => (
        <TaskItem key={t._id} task={t} onToggle={onToggle} onDelete={onDelete} onEdit={onEdit} />
      ))}
    </ul>
  );
}
