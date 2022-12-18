const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const router = require("./routes/client.js");
const send = require("./routes/facturi.js")
const user = require("./routes/user.js")
const fileUpload = require("express-fileupload")
const jwt = require('jsonwebtoken')
const auth = require('../backend/middleware/auth')
app = express();

mongoose.connect("mongodb://127.0.0.1:27017/Facturi", function (err) {
  if (err) {
    console.log("Failed to connect" + err);
  } else {
    console.log("You are connected to db");
  }
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ credentials: true, origin: "http://localhost:4200" }));
app.use(express.static("facturi"));
app.use(fileUpload())

app.use("/api", router)
app.use("/api/invoice", send);
app.use("/api/user", user)
module.exports = app;
