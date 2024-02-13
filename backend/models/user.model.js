const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const userSchema = new mongoose.Schema({
	role: { type: String, default: "free" },
	email: { type: String, required: true, unique: true },
	password: { type: String, required: true },
	Items: [
		{
			Item: {
				Name: { type: String },
				ClassifiedTaxCategory: {
					ID: { type: String },
					Percent: { type: Number },
					TaxScheme: { ID: { type: String } },
				},
			},
			Price: {
				PriceAmount: { type: Number },
				BaseQuantity: { type: Number },
				UnitCode: { type: String },
			},
		},
	],
	invoiceSettings: {
		duePeriod: { type: Number },
		DocumentCurrencyCode: { type: String },
		Note: { type: String },
		PaymentTerms: { Note: { type: String } },
	},

	lastInvoiceNr: { type: String },
	Party: {
		PartyName: { Name: { type: String, required: true, unique: true } },
		PartyTaxScheme: {
			CompanyID: { type: String, required: true, unique: true },
			TaxScheme: { ID: { type: String } },
		},
		PartyLegalEntity: {
			RegistrationName: { type: String },
			CompanyLegalForm: { type: String },
		},
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
	},
	PayeeFinancialAccount: {
		ID: { type: String },
		CurrencyCode: { type: String },
		FinancialInstitution: {
			Name: { type: String },
			ID: { trype: String },
		},
	},
	Logo: { type: String },
});
userSchema.plugin(uniqueValidator, {
	message: "Error, expected {PATH} to be unique.",
});
module.exports = mongoose.model("User", userSchema);
