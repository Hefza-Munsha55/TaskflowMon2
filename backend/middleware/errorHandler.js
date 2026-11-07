module.exports = (err, req, res, next) => {
  let status = err.statusCode || 500;
  let message = err.message || 'Server error';

  if (err.name === 'ValidationError') {
    status = 400;
    message = Object.values(err.errors).map((e) => e.message).join(', ');
  }
  if (err.name === 'CastError') { status = 400; message = 'Invalid ID'; }
  if (err.code === 11000) { status = 400; message = 'Email already registered'; }

  res.status(status).json({ message });
};
