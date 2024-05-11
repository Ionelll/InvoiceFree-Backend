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

user.post("/login", async (req, res) => {
	const email = req.body.email;
	const password = req.body.password;
	try {
		const user = await User.findOne({ email: email }, { __v: 0 });
		if (user) {
			const isPasswordValid = await bcrypt.compare(
				password,
				user.password
			);
			if (isPasswordValid) {
				const { password, ...userWithoutPassword } = user.toObject();
				const token = jwt.sign(
					{ id: user._id.toString() },
					process.env.JWT_SECRET,
					{
						expiresIn: "24h",
					}
				);
				// res.cookie("authorization", token, {
				// 	httpOnly: true,
				// 	secure: true,
				// });
				res.status(200).json({
					loggedin: true,
					user: userWithoutPassword,
					token: token,
				});
			} else {
				res.status(401).json({ message: "Invalid credentials" });
			}
		} else {
			res.status(401).json({ message: "Invalid credentials" });
		}
	} catch (error) {
		res.status(500).json({ message: "Internal server error" });
	}
});

user.get("/isloggedin", auth, async (req, res) => {
	// Suggested code may be subject to a license. Learn more: ~LicenseLog:3789988381.
	const user = await User.findById(req.UserId, {
		password: 0,
		__v: 0,
		_id: 0,
	});
	if (user) {
		res.status(200).json({
			message: "Token passed",
			user: user,
		});
	}
});
user.post("/updatecompany", auth, upload.single("Logo"), async (req, res) => {
	if (req.file) {
		req.body.Logo =
			"http://" + req.headers.host + "/uploads/" + req.file.filename;
	}

	try {
		const userInput = JSON.parse(req.body.Party);
		const user = await User.findByIdAndUpdate(
			req.UserId,
			{
				$set: {
					Party: userInput.Party,
					PayeeFinancialAccount: userInput.PayeeFinancialAccount,
					Logo: req.body.Logo,
				},
			},

			{
				_id: 0,
				__v: 0,
				password: 0,
				new: true,
			}
		);
		if (user)
			res.status(201).json({
				user: user,
				message: "Updated succesfully",
			});
	} catch (error) {
		res.status(500).json({ message: "Internal server Error" });
	}
});

user.post("/updateItems", auth, (req, res) => {
	User.findByIdAndUpdate(
		req.UserId,
		{ $set: { Items: req.body } },
		{ _id: 0, __v: 0, password: 0, new: true }
	)
		.then((result) => {
			res.status(201).json({
				result,
			});
		})
		.catch((error) => {
			res.status(422).json({
				message: error.message,
			});
		});
});
user.post("/update-settings", auth, (req, res) => {
	User.findByIdAndUpdate(
		req.UserId,
		{ $set: { invoiceSettings: req.body } },
		{ _id: 0, __v: 0, password: 0, new: true }
	)
		.then((result) => {
			res.status(201).json({
				result,
			});
		})
		.catch((error) => {
			res.status(422).json({
				message: error.message,
			});
		});
});

user.post("/register", (req, res) => {
	User.init()
		.then(async () => {
			const user = new User({
				email: req.body.email,
				password: bcrypt.hashSync(req.body.password, 10),
			});
			const result = await user.save();
			res.status(200).json({
				message: "succesfully registered",
				result: result.company,
			});
		})
		.catch((error) => {
			res.status(400).json({
				message: error.message,
				error: error,
			});
		});
});

user.get("/logout", (req, res) => {
	res.clearCookie("authorization");
	res.status(200).json({
		message: "succesfully logged out",
	});
});

module.exports = user;
