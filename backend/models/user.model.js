const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const userSchema = new mongoose.Schema({
	role: { type: String, default: "free" },
	email: { type: String, required: true, unique: true },
	password: { type: String, required: true },
	Items: [
		{
			Item: {
				Name: { typr: String },
				ClassifiedTaxCategory: {
					ID: { type: String },
					Percent: { type: Number },
					TaxScheme: { type: String },
				},
			},
			Price: {
				PriceAmount: { type: Number },
				BaseQuantity: { type: Number },
				unitCode: { type: String },
			},
		},
	],
	preferedCurrency: { type: String },
	preferedLanguage: { type: String },
	preferedInvoiceText: { type: String },
	Note: { type: String },
	preferedDuePeriod: { type: String },
	lastInvoiceNr: { type: String },
	Party: {
		PartyName: { type: String, unique: true },
		PartyIdentification: { type: String, unique: true },
		EndpointID: { type: String },
		IndustryClassificationCode: { type: String },
		PostalAdress: {
			Psotbox: { type: String },
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
		Logo: { type: String },
	},
});
userSchema.plugin(uniqueValidator, {
	message: "Error, expected {PATH} to be unique.",
});
module.exports = mongoose.model("User", userSchema);
