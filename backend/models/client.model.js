const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const clientSchema = new mongoose.Schema({
	companyName: { type: String, required: true, unique: true },
	registrationNumber: { type: String, required: true, unique: true },
	adress: {
		country: { type: String },
		region: { type: String },
		city: { type: String },
		street: { type: String },
		number: { type: String },
		postalCode: { type: String },
	},
	phone: { type: String },
	email: { type: String },
});
clientSchema.plugin(uniqueValidator, {
	message: "Error, expected {PATH} to be unique.",
});

module.exports = mongoose.model("Client", clientSchema);
