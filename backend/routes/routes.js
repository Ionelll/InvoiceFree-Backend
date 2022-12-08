const Client = require("../models/client");
const express = require("express");
const router = express.Router();
const multer = require("multer");
const fs = require("fs");

const date = new Date();
let dir = "facturi/" + date.getFullYear() + "/" + (date.getMonth() + 1);
if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir, { recursive: true });
}
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, dir);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = date.getDate() + "-" + (date.getMonth() + 1);
    cb(null, req.body.filename + "-" + uniqueSuffix + ".pdf");
  },
});
const upload = multer({ storage: storage });

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
router.post("/savefactura", upload.any("file"), (req, res) => {
  res.status(200);
});
router.get("/clientlist", (req, res) => {
  Client.find({}, { nume: 1, _id: 0 }).then((result) => {
    var x = result.map((y) => {
      return y.nume;
    });
    res.status(200).json(x);
  });
});
router.get("/searchclient/:clientname", (req, res) => {
  console.log(req.params.clientname);
  Client.find({ nume: req.params.clientname })
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((error) => {
      res.status(404).json({
        message: "Kunde nicht gefundet",
        error: error,
      });
    });
});

module.exports = router;
