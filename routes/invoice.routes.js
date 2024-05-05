const Invoice = require("../models/invoice.model.js");
const User = require("../models/user.model.js");
const express = require("express");
const invoice = express.Router();
const auth = require("../middleware/auth");
const { create } = require("xmlbuilder2");

invoice.post("/save-invoice", auth, (req, res) => {
	const newInvoice = new Invoice(req.body);
	console.log(req.body.Lines);
	console.log(newInvoice.Lines);
	const lastInvoiceNr = req.body.ID;
	User.findByIdAndUpdate(req.UserId, { lastInvoiceNr: lastInvoiceNr });
	newInvoice
		.save()
		.then((result) => {
			res.status(200).json({
				message: "Invoice Saved Succesfully",
				result: result,
			});
		})
		.catch((error) => {
			res.status(400).json({
				message: error.message,
				error: error,
			});
		});
});

invoice.post("/updateinvoice", auth, (req, res) => {
	Invoice.findOneAndUpdate({ _id: req.body.id }, req.body.invoice)
		.then((result) => {
			res.status(200).json({
				message: "succesfully updated",
				result: result,
			});
		})
		.catch((error) => {
			res.status(400).json({
				message: error.message,
				error: error,
			});
		});
});

invoice.post("/deleteinvoice", auth, (req, res) => {
	Invoice.deleteOne({ _id: req.body.id }).then((result) => {
		if (result.deletedCount < 1) {
			res.status(401).json({
				message: "cant delete invoice",
			});
		} else {
			res.status(200).json({
				message: "Invoice was succesfully deleted",
			});
		}
	});
});
invoice.post("/e-invoice", (req, res) => {
	const invoice = req.body.Invoice;
	const root = create({ version: "1.0" })
		.ele("Invoice", {
			xmlns: "urn:oasis:names:specification:ubl:schema:xsd:Invoice-2",

			"xmlns:cac":
				"urn:oasis:names:specification:ubl:schema:xsd:CommonAggregateComponents-2",

			"xmlns:cbc":
				"urn:oasis:names:specification:ubl:schema:xsd:CommonBasicComponents-2",
		})
		.ele("cbc:UBLVersionID")
		.txt("2.1")
		.up()
		.ele("cbc:CustomizationID")
		.txt(
			"urn:cen.eu:en16931:2017#compliant#urn:efactura.mfinante.ro:CIUS-RO:1.0.0"
		)
		.up()
		.ele("cbc:ID")
		.txt(invoice.ID)
		.up()
		.ele("cbc:IssueDate")
		.txt(invoice.InvoicePeriod.IssueDate)
		.up()
		.ele("cbc:DueDate")
		.txt(invoice.InvoicePeriod.EndDate)
		.up()
		.ele("cbc:InvoiceTypeCode")
		.txt(invoice.InvoiceTypeCode)
		.up()
		.ele("cbc:Note")
		.txt(invoice.Note)
		.up()
		.ele("cbc:DocumentCurrencyCode")
		.txt(invoice.DocumentCurrencyCode)
		.up()
		.ele("cac:InvoicePeriod")
		.ele("cbc:EndDate")
		.txt(invoice.InvoicePeriod.EndDate)
		.up()
		.up()
		.ele("cac:AccountingSupplierParty")
		.ele("cac:Party")
		.ele("cac:PartyName")
		.ele("cbc:Name")
		.txt(invoice.AccountingSupplierParty.Party.PartyName.Name)
		.up()
		.up()
		.ele("cac:PostalAdress")
		.ele("cbc:StreetName")
		.txt(invoice.AccountingSupplierParty.Party.PostalAdress.StreetName)
		.up()
		.ele("cbc:CityName")
		.txt(invoice.AccountingSupplierParty.Party.PostalAdress.CityName)
		.up()
		.ele("cbc:PostalZone")
		.txt(invoice.AccountingSupplierParty.Party.PostalAdress.PostalZone)
		.up()
		.ele("cbc:CountrySubentity")
		.txt(
			invoice.AccountingSupplierParty.Party.PostalAdress.CountrySubentity
		)
		.up()
		.ele("cac:Country")
		.ele("cbc:IdentificationCode")
		.txt(
			invoice.AccountingSupplierParty.Party.PostalAdress.Country
				.IdentificationCode
		)
		.up()
		.up()
		.ele("cac:PartyTaxScheme")
		.ele("cbc:CompanyID")
		.txt(invoice.AccountingSupplierParty.Party.PartyIdentification.ID)
		.up()
		.ele("cac:TaxScheme")
		.ele("ID")
		.txt("VAT")
		.up()
		.up()
		.up()
		.ele("cac:PartyLegalEntity")
		.ele("cbc:RegistrationName")
		.txt(invoice.AccountingSupplierParty.Party.PartyName.Name)
		.up()
		.ele("cbc:CompanyLegalForm")
		.txt()
		.ele("cac:AccountingCustomerParty");
	const xml = root.end({ prettyPrint: true });
	console.log(xml);
});

module.exports = invoice;
