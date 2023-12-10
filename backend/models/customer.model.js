const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const Customer = new mongoose.Schema({
	Party: {
		PartyName: { Name: { type: String, required: true, unique: true } },
		PartyIdentification: {
			ID: { type: String, required: true, unique: true },
		},
		EndpointID: { type: String },
		IndustryClassificationCode: { type: String },
		PostalAdress: {
			Postbox: { type: String },
			StreetName: { type: String },
			CityName: { type: String },
			BuildingNumber: { type: String },
			PostalZone: { type: String },
			CountrySubentity: { type: String },
			Country: { IdentificationCode: { type: String } },
		},
		Contact: {
			Name: { type: String },
			Telephone: { type: String },
			ElectronicMail: { type: String },
		},
		BuyerReference: { type: String },
	},
});
Customer.plugin(uniqueValidator, {
	message: "Error, expected {PATH} to be unique.",
});

module.exports = mongoose.model("Client", Customer);
