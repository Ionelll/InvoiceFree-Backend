const mongoose = require("mongoose");



const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique:true },
  adresa: { type: String, required: true },
  phone: { type: String, required: true },
  cui: { type: String },
  email: { type: String , unique:true, required: true},
  website: { type: String },
  password: { type: String, required: true },
  numeFirma: { type: String, required: true },
  bank: [{
    owner : {type: String},
    accountNumber: {type: String},
    currency: {type: String},
    balance: {type: Number},
    createdOn: {type: Date},
    transactions: {type: Array}
  }]
});


module.exports = mongoose.model("User", userSchema);
