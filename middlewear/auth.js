// middleware/auth.js
const jwt = require('jsonwebtoken');

const verifyJWT = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) return res.status(401).send('Access Denied: No token');

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified;
    next();
  } catch {
    res.status(400).send('Invalid token');
  }
};

module.exports = verifyJWT;