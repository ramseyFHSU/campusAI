const jwt = require('jsonwebtoken');

module.exports = function optionalAuth(req, _res, next) {
  const header = req.headers.authorization || '';
  const token = header.startsWith('Bearer ') ? header.slice(7) : null;
  if (!token) return next();
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { id: decoded.id, role: decoded.role };
  } catch (_error) {
    // Ignore invalid optional tokens and let controller enforce public access rules.
  }
  next();
};
