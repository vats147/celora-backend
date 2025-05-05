const ErrorResponse = require('../utils/errorResponse');

const checkRolePermission = (...roles) => {
  return (req, res, next) => {
    // Assuming the user role is saved in req.user (from authentication middleware)
    if (!roles.includes(req.user.role)) {
      return next(new ErrorResponse(`Access denied for role: ${req.user.role}`, 403));
    }
    next();
  };
};

module.exports = checkRolePermission;
