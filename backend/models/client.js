const mongoose = require("mongoose");


const clientSchema = new mongoose.Schema({
  nume: { type: String, required: true },
  adresa: { type: String, required: true },
  telefon: { type: String, required: true },
  cui: { type: String },
  email: { type: String , unique:true},
  website: { type: String },
});


module.exports = mongoose.model("Client", clientSchema);
