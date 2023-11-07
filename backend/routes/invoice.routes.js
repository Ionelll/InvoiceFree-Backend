const Invoice = require("../models/invoice.model.js");
const User = require("../models/user.model.js");
const express = require("express");
const invoice = express.Router();
const auth = require("../middleware/auth");

invoice.post("/saveinvoice", auth, (req, res) => {
	const newInvoice = new Factura(req.body.invoice);
	const lastInvoiceNr = req.body.invoice.ID;
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
				message: error.message,
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
				message: "Invoice was succesfully deleted",
			});
		}
	});
});

module.exports = invoice;
