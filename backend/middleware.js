// import JWT_SECRET from "./config";
const JWT_SECRET = require("./config");
const jwt = require("jsonwebtoken");

const authmiddleware = (req, res, next) => {
  const authheader = req.headers.authorization;

  if (!authheader || !authheader.startsWith("Bearer")) {
    return res.status(403).json({
      msg: " error header",
    });
  }

  const token = authheader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, JWT_SECRET);

    req.userId = decoded.userId;

    next();
  } catch (err) {
    console.error("Error verifying the token:", err.message);
    return res.status(403).json({
      msg: "eror in header",
    });
  }
};
module.exports = authmiddleware;
