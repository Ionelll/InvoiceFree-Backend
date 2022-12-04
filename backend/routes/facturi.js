const Factura = require("../models/facturi");
const express = require("express");
const send = express.Router();
const ObjectId = require("mongo-objectid");
const path = require("path")




send.post("/addInvoice", async(req, res) => {
    let date_ob = new Date();
    let year = date_ob.getFullYear()
    let month = date_ob.getMonth() + 1
    let day = date_ob.toISOString().slice(0, 10)
    let newDay = day[8] + day[9]
   
    console.log(month, newDay, year)
    let invoiceFile =  req.files.pathInvoice
    console.log(invoiceFile)
    const filePath = path.join(__dirname, '../uploads/' + "/" + `${year}` + "/" + `${month}` + "/" + `${newDay}` + "/" + `${day}` + `${invoiceFile.name}` ) ;
    const facturaNoua = new Factura({
      nume: req.body.nume,
      totalInvoice: req.body.totalInvoice,
      date: req.body.date,
      payed: req.body.payed,
      pathInvoice: filePath
    });
   

    facturaNoua
      .save()
      .then(async (result) => {
        await invoiceFile.mv(filePath)
        res.status(200).json({
          message: "succesfully aded",
          result: result
        });
      })
      .catch((error) => {
        res.status(400).json({
          message: "Eroare interna incercati din nou",
          error: error,
        }); 
    });
});



send.use("/invoices", (req, res) => {

    Factura.find().then((result) => {
      res.status(200).json({
        count: result.length,
        result: result
      });
    }).catch((error) => {
      res.status(400).json({
        message: "Eroare interna incercati din nou",
        error: error,
      });
    });;
  });


send.use("/invoice/:nume", (req, res) => {

    Factura.find({nume: req.params.nume}).then((result) => {
      res.status(200).json({
        count: result.length,
        result: result
      });
    }).catch((error) => {
      res.status(400).json({
        message: "Eroare interna incercati din nou",
        error: error,
      });
    });;
  });

module.exports = send;