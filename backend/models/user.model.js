const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const userSchema = new mongoose.Schema({
	role: { type: String, default: "free" },
	email: { type: String, required: true, unique: true },
	password: { type: String, required: true },
	articles: [
		{
			nume: { type: String },
			price: { type: String },
			units: { type: String },
		},
	],
	preferedCurrency: { type: String },
	preferedLanguage: { type: String },
	preferedInvoiceText: { type: String },
	footNotes: [{ type: String }],
	preferedVat: { type: String },
	preferedDuePeriod: { type: String },
	nextInvoiceNr: { type: String },
	company: {
		companyName: { type: String, required: true, unique: true },
		adress: {
			country: { type: String },
			region: { type: String },
			city: { type: String },
			street: { type: String },
			number: { type: String },
			apartament: { type: String },
			postalCode: { type: String },
		},
		euid: { type: String, unique: true, sparse: true },
		website: { type: String },
		logo: { type: String },
		phone: { type: String },
		mobile: { type: String },
		fax: { type: String },
		email: { type: String },
		registrationNumber: { type: String, required: true, unique: true },
		caen: { type: String },
		bank: [
			{
				bankname: { type: String },
				iban: { type: String },
				bic: { type: String },
			},
		],
	},
});
userSchema.plugin(uniqueValidator, {
	message: "Error, expected {PATH} to be unique.",
});
module.exports = mongoose.model("User", userSchema);
