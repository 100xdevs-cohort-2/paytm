const jwt=require('jsonwebtoken')

const authMiddleware = (req, res, next) => {
  const authHeader = req.header("Authorization");

  if (!authHeader) {
    return res.status(401).json({
      error: "Access denied, no token!",
    });
  }

  // Correctly extract token
  const token = authHeader.replace("Bearer ", "");

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified;
    next();
  } catch (error) {
    return res.status(400).json({
      error: "Invalid token!",
      success: false,
    });
  }
};

module.exports = authMiddleware;