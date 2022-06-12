const jwt = require("jsonwebtoken");
const jwtConfig = require("../config/jwt");

const authorize = (req, res, next) => {
  try {
    if (!req.headers.authorization) return res.status(401).json({ message: 'Invalid authorization'});
    const token = req.headers.authorization.replace("Bearer ", "");
    jwt.verify(token, jwtConfig.secret);
    next();
  } catch (err) {
    return res.status(401).json({
      error: true,
      message: err.message,
    });
  }
};

module.exports = authorize;
