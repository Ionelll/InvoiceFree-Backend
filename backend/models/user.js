
const mongoose = require("mongoose");



const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique:true },

  adresa: {
    country: {type: String, require:true},
    region: {type: String, require:true},
    city: {type: String, require:true},
    street: {type: String, require:true},
    number: {type: String, require:true},
    postalCode: {type: String, require:true},
  },

  //inca nu suntem siguri ce facem cu role
  // role: {type: String, require:true},
  phone: { type: String, required: true },
  email: { type: String , unique:true, required: true},
  password: { type: String, required: true },
  nume :{ type: String, required: true },
  companies: [{type: String, unique: true}],
});


module.exports = mongoose.model("User", userSchema);

