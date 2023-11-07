const mongoose = require("mongoose");

const invoiceSchema = new mongoose.Schema({
	InvoiceTypeCode: { type: String, required: true },
	ID: { type: String, required: true },
	IssueDate: { type: String, required: true },
	InvoicePeriod: {
		StartDate: { type: String },
		EndDate: { type: String },
	},
	Note: { languageID: { type: String }, Note: { type: String } },
	DocumentCurrencyCode: { type: String, required: true },
	BuyerReference: { type: String },
	OrderReference: { ID: { type: String } },
	ContractDocumentReference: {
		ID: { type: String },
		DocumentType: { type: String },
	},
	AccountingSupplierParty: {
		Party: {
			PartyName: { type: String, required: true },
			PartyIdentification: { type: String, required: true },
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
				ElectronicMail: String,
			},
		},
	},
	AccountingCustomerParty: {
		Party: {
			PartyName: { type: String, required: true },
			PartyIdentification: { type: String, required: true },
			EndpointID: { type: String },
			IndustryClassificationCode: { type: String },
			BuyerReference: { type: String },
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
		},
	},
	Delivery: {
		ActualDeliveryDate: { type: String },
		DeliveryLocation: {
			Adress: {
				Psotbox: { type: String },
				StreetName: { type: String },
				CityName: { type: String },
				BuildingNumber: { type: String },
				PostalZone: { type: String },
				CountrySubentity: { type: String },
				Country: { IdentificationCode: { type: String } },
			},
		},
	},
	PaymentMeans: {
		PaymentCode: { type: String },
		PaymentID: { type: String },
		PayeeFinancialAccount: {
			ID: { type: String },
			CurrencyCode: { Type: String },
			FinancialInstitution: {
				Name: { type: String },
				ID: { type: String },
			},
		},
	},
	TaxTotal: {
		TaxAmout: { type: String },
		ApplyedTaxes: [
			{
				TaxSubtotal: {
					TaxableAmount: { type: Number },
					TaxCategory: {
						ID: { type: String },
						Percent: { type: Number },
						TaxScheme: {
							ID: { type: String },
						},
					},
				},
			},
		],
	},
	LegalMonetaryTotal: {
		TaxExclusiveAmount: { type: Number },
		TaxInclusiveAmount: { type: Number },
		LineExtensionAmount: { type: Number },
		PayableAmount: { type: Number },
	},
	Lines: [
		{
			InvoiceLine: {
				ID: { type: Number },
				InvoicedQuantity: { type: Number },
				LineExtensionAmount: { type: Number },
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
		},
	],
});

module.exports = mongoose.model("Invoice", invoiceSchema);
