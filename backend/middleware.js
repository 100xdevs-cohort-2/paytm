import JWT_SECRET from "./config";
const jwt = require("jsonwebtoken");

const authmiddleware = (req, res, next) => {
  const authheader = req.headers.authorization;

  if (!authheader || !authheader.startsWith("Bearer")) {
    return res.status(403).json({
      msg: " error header",
    });
  }

  const token = authheader.split(""[1]);

  try {
    const decoded = jwt.verify(token, JWT_SECRET);

    if (decoded.userId) {
      req.userId = decoded.userId;
      next();
    } else {
      return res.status(403).json({});
    }
  } catch (err) {
    return res.status(403).json({});
  }
};
module.exports = authmiddleware;
