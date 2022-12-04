const mongoose = require("mongoose");


const facturiSchema = new mongoose.Schema({
  nume: { type: String, required: true , unique:true},
  totalInvoice: { type: Number, required: true },
  date: { type: Date, required: true },
  payed: { type: Boolean, required: true },
  pathInvoice: { type: String , unique:true, required: true}
});


module.exports = mongoose.model("Factura", facturiSchema);
