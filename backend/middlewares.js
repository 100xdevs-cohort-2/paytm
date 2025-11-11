const jwt = require("jsonwebtoken");
function authMiddleware(req, res, next) {
  const header = req.headers.authorization;

  // if header is not present or header doesn't start with bearer
  if (!header || !header.startsWith("Bearer")) {
    return res.status(401).json({
      msg: "Unauthorized",
    });
  }
  const token = header.split(" ")[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.userId;
    /*Assigning to req.userId: The middleware assigns the userId from the decoded token to the userId property on the req object. This makes the userId accessible in subsequent middleware functions or route handlers, enabling the application to identify the authenticated user. */
    next();
  } catch (err) {
    return res.status(401).json({
      msg: "Unauthorized",
    });
  }
}

module.exports = { authMiddleware };
