const mongoose = require("mongoose");


const companySchema = new mongoose.Schema({
    name: {type: String, require: true, unique: true},
    adresa: {
        country: {type: String, require:true},
        region: {type: String, require:true},
        city: {type: String, require:true},
        street: {type: String, require:true},
        number: {type: String, require:true},
        postalCode: {type: String, require:true},
    },
    euid: {type: String, require: true, unique: true},
    registrationNumber: {type: String, require: true, unique: true},
    web: {type: String, unique: true},
    logo: {type: String, unique: true},
 
    photeNumber: {type: String},
    mobileNumber: {type: String, require: true, unique: true},
    Fax: {type: String},
    Email: {type: String, require: true, unique: true},
    BigBossName: {type: String},
    Cui:  {type: String, require: true, unique: true},
    CodCaen: {type: String}, // (domeniu de activitate al companiei "nu stiu daca trebe ")
   Bank: // am gandit o lista de banci ca poate o companie are mai multe conturi, habar nu am cum functioneaza "din cate am citit poate sa aiba mai multe conturi la banci diferite"
    [{
      iban: {type: String, require: true, unique: true},
      companyName:  {type: String, require: true, unique: true},
    }],
  invoices: [{type: String, unique: true}],
});


module.exports = mongoose.model("Company", companySchema);
