const Client = require("../models/client.model.js");
const express = require("express");
const router = express.Router();
const ObjectId = require("mongo-objectid");

router.post("/updateclient", (req, res) => {
	Client.findOneAndUpdate({ _id: req.body.id }, req.body.client)
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
router.post("/addclient", (req, res) => {
	const client = new Client({
		companyName: req.body.companyName,
		registrationNumber: req.body.registrationNumber,
		adress: {
			country: req.body.adress.country,
			region: req.body.adress.region,
			city: req.body.adress.city,
			street: req.body.adress.street,
			number: req.body.adress.number,
			postalCode: req.body.adress.postalCode,
		},
		phone: req.body.phone,
		email: req.body.email,
	});
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
				message: "Eroare interna incercati din nou",
				error: error,
			});
		});
});
router.get("/getclientbyid/:id", (req, res) => {
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

router.get("/clients/:nume", (req, res) => {
	Client.find(
		{ companyName: { $regex: req.params.nume, $options: "i" } },
		"companyName -_id"
	)
		.then((result) => {
			console.log(result);
			const list = [""];
			result.forEach((item) => {
				list.push(item.companyName);
			});

			res.status(200).json({
				list: list,
			});
		})
		.catch((error) => {
			res.status(400).json({
				message: "Eroare interna incercati din nou",
				error: error,
			});
		});
});

router.get("/client/:nume", (req, res) => {
	Client.findOne({ companyName: req.params.nume })
		.then((result) => {
			res.status(200).json({
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

router.post("/deleteClient", (req, res) => {
	id = req.body._id;
	Client.deleteOne({ _id: id }).then((result) => {
		if (result.deletedCount < 1) {
			res.status(401).json({
				message: "cant delete client",
			});
		} else {
			res.status(200).json({
				message: "Item was deleted succesfully",
			});
		}
	});
});

module.exports = router;
