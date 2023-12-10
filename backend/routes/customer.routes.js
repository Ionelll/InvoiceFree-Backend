const Customer = require("../models/customer.model.js");
const express = require("express");
const router = express.Router();
const ObjectId = require("mongo-objectid");

router.post("/updatecustomer", (req, res) => {
	Customer.findOneAndUpdate({ _id: req.body.id }, req.body.customer)
		.then((result) => {
			res.status(200).json({
				message: "succesfully updated",
				result: result,
			});
		})
		.catch((error) => {
			res.status(400).json({
				message: error.error.message,
				error: error,
			});
		});
});
router.post("/addcustomer", (req, res) => {
	const client = new Customer(req.body);
	client
		.save()
		.then((result) => {
			res.status(200).json({
				message: "succesfully added",
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
router.get("/getcustomerbyid/:id", (req, res) => {
	const id = new ObjectId(req.params.id);
	Client.findOne({ _id: id })
		.then((result) => {
			res.status(200).json({
				result: result,
			});
		})
		.catch((error) => {
			res.status(400).json({
				message: "Client not found",
				error: error,
			});
		});
});

router.get("/searchcustomer/:name", (req, res) => {
	Customer.find(
		{
			$or: [
				{
					"Party.PartyName.Name": {
						$regex: req.params.name,
						$options: "i",
					},
				},
				{
					"Party.PartyIdentification.ID": {
						$regex: req.params.name,
						$options: "i",
					},
				},
				{
					"Party.BuyerReference": {
						$regex: req.params.name,
						$options: "i",
					},
				},
			],
		},
		"Party -_id"
	)
		.then((result) => {
			let list = [];
			result.forEach((item) => {
				list.push(item.Party.PartyName.Name);
			});
			res.status(200).json({
				list: list,
			});
		})
		.catch((error) => {
			res.status(400).json({
				message: error.message,
				error: error,
			});
		});
});

router.get("/returncustomer/:name", (req, res) => {
	Customer.findOne({ "Party.PartyName.Name": req.params.name })
		.then((result) => {
			res.status(200).json({
				result: result,
			});
		})
		.catch((error) => {
			res.status(400).json({
				message: "Customer not found",
				error: error,
			});
		});
});

module.exports = router;
