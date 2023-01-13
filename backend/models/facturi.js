const mongoose = require("mongoose");


const facturiSchema = new mongoose.Schema({
  clientdata: {
    nume : {type: String, required:true}, 
    adresa: {
      country: {type: String, required:true},
      region: {type: String, required:true},
      city: {type: String, required:true},
      street: {type: String, required:true},
      number: {type: String, required:true},
      postalCode: {type: String, required:true},
    }, 
    telefon: {type: String, required: true, unique: true}, 
    cui: {type: String,required: true, unique: true}, 
    email: {type: String,required: true, unique: true} 
    
  },

  userData: {
    username: {type: String, required:true},
    timeDate: { type: Date, required: true}
  },

  dueDate: { type: Date, required: true},
  tva : { type: String, required: true},  
  currency: { type: String, required: true}, 
  totalInvoice: { type: Number, required: true},
  dateNow: { type: Date, required: true},
  nrFactura: { type: String, required: true},
  tabel: [{ 
      articol:{type: String, required: true}, 
      bucati:{type: String, required: true},
      pret:{type: String, require: true}
  }]
});


module.exports = mongoose.model("Factura", facturiSchema);
