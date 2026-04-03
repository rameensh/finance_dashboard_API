const isAuthenticated = (req, res, next) => {
  if (((req.isAuthenticated()))) {
    return next();
  }
  res.status(401).json({ error: 'You must be logged in' });
};

const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        error: `Access denied. Required role: ${roles.join(' or ')}`
      });
    }
    next();
  };
};

module.exports = { isAuthenticated, authorizeRoles };