const Client = require("../models/client");
const express = require("express");
const router = express.Router();

//router.post folosesti

router.post("/addclient", (req, res) => {
  const clientnou = new Client({
    nume: req.body.nume,
    adresa: req.body.adresa,
    telefon: req.body.telefon,
    cui: req.body.cui,
    email: req.body.email,
    website: req.body.website,
  });
  clientnou
    .save()
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((error) => {
      res.status(500).json({
        message: "Eroare interna incercati din nou",
        error: error,
      });
    });
});

module.exports = router;
