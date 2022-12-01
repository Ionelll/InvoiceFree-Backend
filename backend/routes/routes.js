const Client = require("../models/client");
const express = require("express");
const router = express.Router();

//router.post folosesti, ok(Mariuss)

router.post("/addclient", (req, res) => {
  const clientnou = new Client({
    nume: req.body.nume,
    adresa: req.body.adresa,
    telefon: req.body.telefon,
    cui: req.body.cui,
    email: req.body.email,
    website: req.body.website,
  });
  if((clientnou.nume == null || clientnou.nume == "" || typeof(clientnou.nume) == 'undefined' )  || 
    (clientnou.adresa == null || clientnou.adresa == "" || typeof(clientnou.adresa) == 'undefined') || 
    (clientnou.telefon == null || clientnou.telefon == "" || typeof(clientnou.telefon) == 'undefined') || 
    (clientnou.cui == null || clientnou.cui == "" || typeof(clientnou.cui) == 'undefined') || 
    (clientnou.email == null || clientnou.email == "" || typeof(clientnou.email) == 'undefined') || 
    (clientnou.website == null || clientnou.website == "" || typeof(clientnou.website) == 'undefined')){
    res.status(403).json({
      message: "All fields are required",
      result: []
    })
    
  }
  else{
    clientnou
    .save()
    .then((result) => {
      res.status(200).json({
        message: "succesfully aded",
        result: result});
    })
    .catch((error) => {
      res.status(400).json({
        message: "Eroare interna incercati din nou",
        error: error,
      });
    });
  }
  
});

module.exports = router;
