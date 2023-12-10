const mongoose = require("mongoose");

const invoiceSchema = new mongoose.Schema({
	InvoiceTypeCode: { type: String, required: true },
	ID: { type: String, required: true },
	IssueDate: { type: String, required: true },
	InvoicePeriod: {
		StartDate: { type: String },
		EndDate: { type: String },
	},
	Note: { type: String },
	DocumentCurrencyCode: { type: String, required: true },
	BuyerReference: { type: String },
	OrderReference: { ID: { type: String } },
	ContractDocumentReference: {
		ID: { type: String },
		DocumentType: { type: String },
	},
	AccountingSupplierParty: {
		Party: {
			PartyName: { Name: { type: String, required: true } },
			PartyIdentification: { ID: { type: String, required: true } },
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
				ElectronicMail: String,
			},
		},
	},
	AccountingCustomerParty: {
		Party: {
			PartyName: { Name: { type: String, required: true } },
			PartyIdentification: { ID: { type: String, required: true } },
			EndpointID: { type: String },
			IndustryClassificationCode: { type: String },
			BuyerReference: { type: String },
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
			CurrencyCode: { type: String },
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
					TaxableAmount: { type: String },
					TaxCategory: {
						ID: { type: String },
						Percent: { type: String },
						TaxScheme: {
							ID: { type: String },
						},
					},
				},
			},
		],
	},
	LegalMonetaryTotal: {
		TaxExclusiveAmount: { type: String },
		TaxInclusiveAmount: { type: String },
		LineExtensionAmount: { type: String },
		PayableAmount: { type: String },
	},
	Lines: [
		{
			InvoiceLine: {
				InvoicedQuantity: { type: String },
				LineExtensionAmount: { type: String },
				Item: {
					Name: { type: String },
					ClassifiedTaxCategory: {
						ID: { type: String },
						Percent: { type: String },
						TaxScheme: { type: String },
					},
				},
				Price: {
					PriceAmount: { type: String },
					BaseQuantity: { type: String },
					UnitCode: { type: String },
				},
			},
		},
	],
});

module.exports = mongoose.model("Invoice", invoiceSchema);
