const jwt = require('jsonwebtoken');

const SECRET_KEY = process.env.APP_SECRET;

const isAuthenticated = (req, res, next) => {
  const token = req.headers.authorization
    ? req.headers.authorization.split(' ')[1]
    : null;

  if (!token) {
    return res.status(401).json({
      success: false,
      message: 'Unauthorized: No token provided',
    });
  }

  try {
    const decoded = jwt.verify(token, SECRET_KEY); // Verify the JWT
    req.user = decoded; // Add user info to the request object
    next(); // Allow the request to proceed
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: 'Unauthorized: Invalid or expired token',
    });
  }
};

module.exports = isAuthenticated;
