const mongoose = require("mongoose");


const facturiSchema = new mongoose.Schema({
  clientdata: {
    nume : {type: String, require:true}, 
    adresa: {
      country: {type: String, require:true},
      region: {type: String, require:true},
      city: {type: String, require:true},
      street: {type: String, require:true},
      number: {type: String, require:true},
      postalCode: {type: String, require:true},
    }, 
    telefon: {type: String, require: true, unique: true}, 
    cui: {type: String,require: true, unique: true}, 
    email: {type: String,require: true, unique: true} 
    
  },
  totalInvoice: { type: Number, require: true},
  dateNow: { type: Date, require: true},
  nrFactura: { type: String, require: true},
  tabel: [{ 
      articol:{type: String, require: true}, 
      bucati:{type: String, require: true},
      pret:{type: String, require: true}
  }]
});


module.exports = mongoose.model("Factura", facturiSchema);
