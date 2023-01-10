const mongoose = require("mongoose");


const clientSchema = new mongoose.Schema({
  nume : {type: String},
  adresa: {
    country: {type: String, require:true},
    region: {type: String, require:true},
    city: {type: String, require:true},
    street: {type: String, require:true},
    number: {type: String, require:true},
    postalCode: {type: String, require:true},
  },
  telefon: {type: String, require:true, unique:true},
  cui: {type: String, require:true, unique:true},
  email:{type: String, require:true, unique:true},
});


module.exports = mongoose.model("Client", clientSchema);
