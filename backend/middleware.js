const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("./config");

//this function is mainly to indentify the person via jsonwebtoken

async function authMiddleware(req, res, next) {
	const authHeader = req.headers?.authorization;

	console.log(authHeader);

	if (!authHeader || !authHeader.startsWith("Bearer")) {
		res.status(403).json({
			message: "There is an issue with authorization headers",
		});
	}

	const token = authHeader.split(" ")[1];
	jwt.verify(token, JWT_SECRET, (err, payload) => {
		if (err) {
			res.status(403).json({
				message: "Please check the login credentials",
			});
		} else {
			const userId = payload.userId;

			//putting the userID in the request body, so that it can be used by next callback function
			//in a route, you can add multiple callback functions
			req.userId = userId;

			next();
		}
	});
}

module.exports = {
	authMiddleware,
};
