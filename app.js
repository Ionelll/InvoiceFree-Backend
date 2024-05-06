const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const clientRoutes = require("./routes/customer.routes.js");
const invoiceRoutes = require("./routes/invoice.routes.js");
const userRoutes = require("./routes/user.routes.js");
const cookieParser = require("cookie-parser");

app = express();

mongoose
	.connect(process.env.RAILWAY_CONNECTION)
	.then(() => {
		console.log("connected");
	})
	.catch((err) => {
		console.log(err);
	});

app.use(cookieParser());
app.use(express.json({ limit: "5mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(cors({withCredentials:true,origin:process.env.CLIENT}));
app.use("/uploads", express.static("uploads"));

app.use("/api", clientRoutes);
app.use("/api", invoiceRoutes);
app.use("/api", userRoutes);

module.exports = app;
