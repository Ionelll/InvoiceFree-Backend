const User = require("../models/user.model");
const express = require("express");
const user = express.Router();
const jwt = require("jsonwebtoken");
require("dotenv").config();
const auth = require("../middleware/auth");
const bcrypt = require("bcrypt");
const multer = require("multer");
const { v4: uuid } = require("uuid");

var storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, "uploads/");
	},
	filename: function (req, file, cb) {
		cb(null, uuid() + "." + file.mimetype.split("/")[1]);
	},
});

var upload = multer({ storage: storage });

user.post("/login", (req, res) => {
	const email = req.body.email;
	const password = req.body.password;
	if (!email || !password) {
		res.status(400).json({
			error: "Please provide username and password",
		});
	} else {
		User.findOne({ email: email }).then((user) => {
			if (!user) {
				res.status(400).json({
					message: "Wrong email or password",
				});
			} else if (!bcrypt.compare(password, user.password)) {
				res.status(400).json({
					message: "Wrong email or password",
				});
			} else {
				const token = jwt.sign(
					{ id: user._id },
					process.env.JWT_SECRET,
					{
						expiresIn: "5h",
					}
				);
				const { password, ...userWithoutPassword } = user.toObject();
				try {
					res.cookie("authorization", token, {
						httpOnly: true,
						sameSite: true,
						secure: true,
					});
					res.status(200).json({
						loggedin: true,
						user: userWithoutPassword,
					});
				} catch (error) {
					res.status(400).json({
						message: "wrong username or password, please try again",
						error: error,
					});
				}
			}
		});
	}
});

user.get("/isloggedin", auth, (req, res) => {
	User.findById(req.UserId, { password: 0, _id: 0 })
		.then((response) => {
			if (!response) {
				res.status(200).json({
					message: "Not logged in",
				});
			} else {
				res.status(200).json({
					loggedin: true,
					user: response,
				});
			}
		})
		.catch((error) => {
			res.status(400).json({
				message: "Eroare interna",
				error: error,
			});
		});
});
user.post("/updatecompany", auth, upload.single("logo"), (req, res) => {
	const company = JSON.parse(req.body.company);
	if (req.file) {
		company.logo =
			"http://" + req.headers.host + "/uploads/" + req.file.filename;
	}
	User.findByIdAndUpdate(req.UserId, {
		$set: { company: company },
	})
		.then((response) => {
			res.status(201).json({
				company: response.company,
				message: "Updated succesfully",
			});
		})
		.catch((error) => {
			res.status(422).json({
				message: error.message,
			});
		});
});

user.post("/register", (req, res, next) => {
	User.init()
		.then(async () => {
			const user = new User({
				email: req.body.email,
				password: bcrypt.hashSync(req.body.password, 10),
				company: {
					companyName: req.body.companyName,
					registrationNumber: req.body.registrationNumber,
				},
			});
			const result = await user.save();
			res.status(200).json({
				message: "succesfully registered",
				result: result.company,
			});
		})
		.catch((error) => {
			res.status(400).json({
				message: "Eroare interna incercati din nou",
				error: error,
			});
		});
});

/*logout route*/
user.get("/logout", (req, res) => {
	res.clearCookie("authorization");
	res.status(200).json({
		message: "succesfully logged out",
	});
});

module.exports = user;
