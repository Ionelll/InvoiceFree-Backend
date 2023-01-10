const mongoose = require("mongoose");


const facturiSchema = new mongoose.Schema({
  clientdata: {
    nume : {type: String}, 
    adresa: {type: String}, 
    telefon: {type: String}, 
    cui: {type: String}, 
    email: {type: String} 
    
  },

  totalInvoice: { type: Number },
  dateNow: { type: Date  },

  nrFactura: { type: String  },
  tabel: [{ 
      articol:{type: String}, 
      bucati:{type: String},
      pret:{type: String}
  }]
});


module.exports = mongoose.model("Factura", facturiSchema);
