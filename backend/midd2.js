const jwt = require("jsonwebtoken");
const JWT_SECRET = require("./config");

const withAuth = async (req, res, next) => {
  // console.log(req.headers);
  const authHeader = await req.headers.authorization.split(" ")[1];

  if (!authHeader) {
    return res.status(403).json({});
  }
  console.log(authHeader);

  try {
    console.log("try");
    const decoded = jwt.verify(token, JWT_SECRET);
    req.userId = decoded.userId;
    console.log(decoded);
    next();
  } catch (err) {
    console.log("Here");
    return res.status(403).json({});
  }
};
module.exports = withAuth;
