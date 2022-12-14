const mongoose = require("mongoose");


const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique:true },
  adresa: { type: String, required: true },
  telefon: { type: String, required: true },
  cui: { type: String },
  email: { type: String , unique:true, required: true},
  website: { type: String },
  password: { type: String, required: true },
});


module.exports = mongoose.model("User", userSchema);
