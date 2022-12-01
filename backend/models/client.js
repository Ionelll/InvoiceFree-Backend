const mongoose = require("mongoose");

const clientSchema = new mongoose.Schema({
  nume: { type: String, require: true },
  adresa: { type: String, require: true },
  telefon: { type: String, require: true },
  cui: { type: String },
  email: { type: String },
  website: { type: String },
});

module.exports = mongoose.model("Client", clientSchema);
