const Invoice = require("../models/invoice.model.js");
const User = require("../models/user.model.js");
const express = require("express");
const invoice = express.Router();
const auth = require("../middleware/auth");

invoice.post("/saveinvoice", auth, (req, res) => {
	const newInvoice = new Factura({
		client: req.body.clientdata,
		provider: req.UserId,
		issueDate: req.body.issueDate,
		dueDate: req.body.dueDate,
		vat: req.body.tva,
		currency: req.body.currency,
		total: req.body.totalInvoice,
		invoiceNumber: req.body.invoiceNumber,
		tabel: req.body.tabel,
	});
	const invoiceNrList = req.body.invoiceNumber.match(
		/([A-Za-z])(\d+)([A-Za-z]+)/
	);
	const nextInvoiceNr =
		invoiceNrList[1] + (parseInt(invoiceNrList[2]) + 1) + invoiceNrList[3];
	User.findByIdAndUpdate(req.UserId, { nextInvoiceNr: nextInvoiceNr });
	newInvoice
		.save()
		.then((result) => {
			res.status(200).json({
				message: "succesfully added",
				result: result,
			});
		})
		.catch((error) => {
			res.status(400).json({
				message: "Eroare interna incercati din nou",
				error: error,
			});
		});
});

invoice.post("updateinvoice", auth, (req, res) => {
	Invoice.findOneAndUpdate({ _id: req.body.id }, req.body.invoice)
		.then((result) => {
			res.status(200).json({
				message: "succesfully updated",
				result: result,
			});
		})
		.catch((error) => {
			res.status(400).json({
				message: "Eroare incercati din nou",
				error: error,
			});
		});
});

invoice.post("deleteinvoice", auth, (req, res) => {
	Invoice.deleteOne({ _id: req.body.id }).then((result) => {
		if (result.deletedCount < 1) {
			res.status(401).json({
				message: "cant delete invoice",
			});
		} else {
			res.status(200).json({
				message: "Item was deleted succesfully",
			});
		}
	});
});

module.exports = invoice;
