const Task = require('../models/Task');

// Every query includes { user: req.user._id } => User A can never touch User B's tasks.

exports.getTasks = async (req, res, next) => {
  try {
    const tasks = await Task.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.json({ tasks });
  } catch (err) { next(err); }
};

exports.createTask = async (req, res, next) => {
  try {
    const { title, description, priority } = req.body;
    const task = await Task.create({ title, description, priority, user: req.user._id });
    res.status(201).json({ task });
  } catch (err) { next(err); }
};

exports.updateTask = async (req, res, next) => {
  try {
    const { title, description, priority, completed } = req.body;
    const task = await Task.findOneAndUpdate(
      { _id: req.params.id, user: req.user._id },
      { title, description, priority, completed },
      { new: true, runValidators: true, omitUndefined: true }
    );
    if (!task) return res.status(404).json({ message: 'Task not found' });
    res.json({ task });
  } catch (err) { next(err); }
};

exports.deleteTask = async (req, res, next) => {
  try {
    const task = await Task.findOneAndDelete({ _id: req.params.id, user: req.user._id });
    if (!task) return res.status(404).json({ message: 'Task not found' });
    res.json({ message: 'Task deleted', id: task._id });
  } catch (err) { next(err); }
};
