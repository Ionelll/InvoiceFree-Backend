const jwt = require("jsonwebtoken");
require("dotenv").config();

const auth = (req, res, next) => {
	if (!req.cookies.authorization) {
		return res.status(200).json({
			message: "Not logged in",
		});
	}
	decodeJWT = JSON.parse(
		Buffer.from(
			req.cookies.authorization.split(".")[1],
			"base64"
		).toString()
	);

	if (!decodeJWT) {
		return res.status(401).json({
			message: "Unauthorized user",
		});
	}
	try {
		jwt.verify(req.cookies.authorization, process.env.JWT_SECRET);
		req.UserId = decodeJWT.id;
	} catch {
		return res.status(401).json({
			message: "Unauthorized user",
		});
	}
	next();
};

module.exports = auth;
