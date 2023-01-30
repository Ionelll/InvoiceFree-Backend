const mongoose = require("mongoose");


const companySchema = new mongoose.Schema({
    name: {type: String, required: true, unique: true},
    adresa: {
        country: {type: String, required: true},
        region: {type: String, required: true},
        city: {type: String, required: true},
        street: {type: String, required: true},
        number: {type: String, required: true},
        apartament: {type: String},
        postalCode: {type: String, required: true},
    },
    euid: {type: String,  unique: true},
    registrationNumber: {type: String, required: true, unique: true},
    web: {type: String, unique: true},
    logo: {type: String, unique: true },

    articles: [
      {
        nume: {type: String},
        price: {type: String},
        units: {type: String}
      }
    ],
    

    mobileNumber: {type: String, required: true, unique: true},
    fax: {type: String},
    email: {type: String, required: true, unique: true},
    bigBossName: {type: String},
    cui:  {type: String, required: true, unique: true},
    codCaen: {type: String}, // (domeniu de activitate al companiei "nu stiu daca trebe ")
    bank: // am gandit o lista de banci ca poate o companie are mai multe conturi, habar nu am cum functioneaza "din cate am citit poate sa aiba mai multe conturi la banci diferite"
      [{
        bankName: {type: String},
        iban: {type: String, unique: true},
        bic:  {type: String, unique: true},
      }],
    invoices: [{type: mongoose.Schema.Types.ObjectId, ref: "facturi"}],
});


module.exports = mongoose.model("Company", companySchema);
