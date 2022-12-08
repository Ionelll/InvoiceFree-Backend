const Factura = require("../models/facturi");
const express = require("express");
const send = express.Router();
const ObjectId = require("mongo-objectid");
const path = require("path")
var fs = require('fs');



send.post("/addInvoice", async(req, res) => {
    let date_ob = new Date();
    let year = date_ob.getFullYear()
    let month = date_ob.getMonth() + 1
    let day = date_ob.toISOString().slice(0, 10)
    let newDay = day[8] + day[9]

    let dir = "uploads/facturi/" + year + "/" + month + "/" + newDay;
    console.log(dir)
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }


    
    let invoiceFile =  req.files.pathInvoice
   
    const filePath = path.join(__dirname, '../uploads/facturi/' + "/" + `${year}` + "/" + `${month}` + "/" + `${newDay}` + "/" + `${day}` + " " +  `${invoiceFile.name}` );
    console.log(filePath)
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


  send.use("/getInvoice", (req, res) => {

    let searchDate = req.body.date
    let searchName = req.body.nume

    if(searchDate && searchName){
      Factura.find({nume : searchName, date: searchDate}).then((result)=>{
        
        res.status(200).json({
          count: result.length,
          result: result
        });
      }).catch((error)=>{
          res.status(400).json({
            message: "This invoice does not exists",
            error: error
          })
        })
      
    }
    else{
      if(searchDate && !searchName){
        Factura.find({date: searchDate}).then((result)=>{
          
          res.status(200).json({
            count: result.length,
            result: result
          });
        }).catch((error)=>{
            res.status(400).json({
              message: "This invoice does not exists",
              error: error
            })
          })
        
      }
      else{
        if(!searchDate && searchName){
          Factura.find({nume: searchName}).then((result)=>{
            res.status(200).json({
              count: result.length,
              result: result
            });
          }).catch((error)=>{
              res.status(400).json({
                message: "This invoice does not exists"
              })
            })
          
        }
        else{
          if((searchDate == null || searchDate == "" || typeof(searchDate) === undefined) 
          && (searchName == null || searchName == "" || typeof(searchName) === undefined)){
            Factura.find().then((result)=>{
              res.status(200).json({
                count: result.length,
                result: result
              })
            }).catch((error) => {
              res.status(400).json({
                message: "error",
                error: error
              })
            })
          }
        else{
          res.status(400).json({
            message: "intern error"
          })
        }
      }
    }
}
  });


  send.post("/deleteInvoice", (req, res) => {
    let Id = new ObjectId("");
    id = req.body._id
    console.log(req.body._id)
    Factura.deleteOne({_id: id}).then((result)=>{
      if(result.deletedCount < 1){
        res.status(401).json({
          message: "cant delete this invoice",
        });
      }
      else{
        /// dont forget to delete the invoice from the folder
        res.status(200).json({
          message: "Item was deleted succesfully",
        });
      }
    })
  })





module.exports = send;