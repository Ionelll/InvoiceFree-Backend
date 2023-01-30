const mongoose = require("mongoose");


const clientSchema = new mongoose.Schema({
  nume : {type: String, required: true},
  adresa: {
    country: {type: String, required:true},
    region: {type: String, required:true},
    city: {type: String, required:true},
    street: {type: String, required:true},
    number: {type: String, required:true},
    postalCode: {type: String, required:true},
  },
  telefon: {type: String, required:true, unique:true},
  email:{type: String, unique:true}
});


module.exports = mongoose.model("Client", clientSchema);
