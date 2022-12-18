const mongoose = require("mongoose");


const bankSchema = new mongoose.Schema({
    owner : {type: String},
	accountNumber: {type: String},
	currency: {type: String},
	balance: {type: Number},
	createdOn: {type: Date},
	transactions: {type: Array}
});


module.exports = mongoose.model("Bank", bankSchema);
