const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Protects routes: requires header  Authorization: Bearer <token>
module.exports = async (req, res, next) => {
  try {
    const header = req.headers.authorization || '';
    const token = header.startsWith('Bearer ') ? header.split(' ')[1] : null;
    if (!token) return res.status(401).json({ message: 'Not authorized, token missing' });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);
    if (!user) return res.status(401).json({ message: 'User no longer exists' });

    req.user = user; // available in controllers
    next();
  } catch (err) {
    res.status(401).json({ message: 'Not authorized, token invalid or expired' });
  }
};
