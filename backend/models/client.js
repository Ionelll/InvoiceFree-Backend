const mongoose = require("mongoose");


const clientSchema = new mongoose.Schema({
  nume: { type: String },
  adresa: { type: String },
  telefon: { type: String, required: true },
  cui: { type: String, unique: true },
  email: { type: String , unique: true},
  website: { type: String },
  cnpClient: {type: String, unique: true}
});


module.exports = mongoose.model("Client", clientSchema);
