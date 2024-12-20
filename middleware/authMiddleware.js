const jwt = require('jsonwebtoken');
const User = require('../Models/user');

const authMiddleware = async (req, res, next) => {
  try {
    const token = req.cookies.AccessToken;

    if (!token) {
      return res.status(401).json({ message: 'Access denied. No token provided.' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded._id);

    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error('Authentication error:', error);
    res.status(400).json({ message: 'Invalid token.' });
  }
};

module.exports = authMiddleware;