const jwt = require("jsonwebtoken");
require("dotenv").config();

const auth = (req, res, next) => {
	const token = req.headers["authorization"];
	if (!token) {
		return res.status(200).json({
			message: "Not logged in",
		});
	}
	decodeJWT = JSON.parse(
		Buffer.from(token.split(".")[1], "base64").toString()
	);

	if (!decodeJWT) {
		return res.status(401).json({
			message: "Unauthorized user",
		});
	}
	try {
		jwt.verify(token, process.env.JWT_SECRET);
		req.UserId = decodeJWT.id;
	} catch {
		return res.status(401).json({
			message: "Unauthorized user",
		});
	}
	next();
};

module.exports = auth;
