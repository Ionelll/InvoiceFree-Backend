
const mongoose = require("mongoose");



const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique:true },

  address: {
    country: {type: String },
    region: {type: String },
    city: {type: String },
    street: {type: String },
    number: {type: String},
    postalCode: {type: String},
  },

  //inca nu suntem siguri ce facem cu role
  // role: {type: String, required:true},
  phone: { type: String },
  email: { type: String , unique:true, required: true},
  password: { type: String,  required: true},
  nume :{ type: String  },
  companies: [{type: String}],
});


module.exports = mongoose.model("User", userSchema);

