const { JWT_SECRET } = require("./config");
const jwt = require("jsonwebtoken");

/**
 * This middleware function is used to authenticate the user
 * It checks if the request has a valid token in the Authorization header
 * If the token is valid, it sets the userId in the request object
 * If the token is invalid or not provided, it returns a 401 Unauthorized status code
 * @param {Object} req - The request object
 * @param {Object} res - The response object
 * @param {Function} next - The next middleware function
 */
const authMiddleware = (req, res, next) => {
    // Get the Authorization header from the request
    const authHeader = req.headers.authorization;

    // If the Authorization header is not present or does not start with "Bearer ", return a 401 status code
    if(!authHeader || !authHeader.startsWith("Bearer ")){
        return res.status(401).json({
            msg: "No token provided"
        });
    }

    // Extract the token from the Authorization header
    const token = authHeader.split(" ")[1];

    try {
        // Verify the token using the secret key
        const decode = jwt.verify(token, JWT_SECRET);
        // Set the userId in the request object
        req.userId = decode.userId;
        // Call the next middleware function
        next();
    }catch(err){
        // If the token is invalid, return a 403 status code with the error message
        return res.status(403).json({message: err.message});
    }
}

module.exports = { authMiddleware };