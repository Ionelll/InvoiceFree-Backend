const Factura = require("../models/facturi");
const express = require("express");
const send = express.Router();
const ObjectId = require("mongo-objectid");
const path = require("path")
var fs = require('fs');
const auth = require('../middleware/auth')


// send.post("/addInvoice",auth ,async(req, res) => {
//     let date_ob = new Date();
//     let year = date_ob.getFullYear()
//     let month = date_ob.getMonth() + 1
//     let day = date_ob.toISOString().slice(0, 10)
//     let newDay = day[8] + day[9]

//     let dir = "uploads/facturi/" + year + "/" + month + "/" + newDay;
//     // console.log(req.file, req.body)
//     if (!fs.existsSync(dir)) {
//       fs.mkdirSync(dir, { recursive: true });
//     }

//     let invoiceFile =  req.files.pathInvoice
//     console.log(invoiceFile)
//     try {
//       const filePath = path.join(__dirname, '../uploads/facturi/' + "/" + `${year}` + "/" + `${month}` + "/" + `${newDay}` + "/" + `${day}` + " " +  `${invoiceFile.name}` );
//       console.log(filePath)
//       const facturaNoua = new Factura({
//         nume: req.body.nume,
//         totalInvoice: req.body.totalInvoice,
//         date: req.body.date,
//         payed: req.body.payed,
//         pathInvoice: filePath

//       });

//       facturaNoua
//       .save()
//       .then(async (result) => {
//         await invoiceFile.mv(filePath)
//         res.status(200).json({
//           message: "succesfully aded",
//           result: result
//         });
//       })
//       .catch((error) => {
//         res.status(400).json({
//           message: "Eroare interna incercati din nou",
//           error: error,
//         }); 
//     });

//     } catch (error) {
//       console.error(error);
  
//     }
// });


send.post("/saveInvoice", auth ,(req, res) => {
  console.log(req.body)
  const newInvoice = new Factura({
    clientdata: req.body.clientdata,
  
    userData: req.body.userData,
    companyId: req.body.companyId,
    dueDate: req.body.dueDate,
    tva : req.body.tva,
    currency: req.body.currency, 
    totalInvoice: req.body.totalInvoice,
    dateNow: req.body.dateNow,
    nrFactura: req.body.nrFactura,
    tabel: req.body.tabel,

  })
  newInvoice
      .save()
      .then( (result) => {
        res.status(200).json({
          message: "succesfully added",
          result: result
        });
      })
      .catch((error) => {
        res.status(400).json({
          message: "Eroare interna incercati din nou",
          error: error,
        }); 
    });

})



send.post("/invoices", auth ,(req, res) => {
  id = req.body.companyId
    Factura.find({companyId: id }).then((result) => {
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


send.post("/invoice", auth ,(req, res) => {

    Factura.find({"clientdata.nume": req.body.nume, companyId: req.body.companyId}).then((result) => {
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


  send.use("/getInvoice", auth ,(req, res) => {

    let searchDate = req.body.date
    let searchName = req.body.nume
    let id = req.body.companyId
    if (!id){
      res.status(400).json({
        message: "No company id provided"
      })
    }
    else{
      if(searchDate && searchName){
        Factura.find({"clientdata.nume" : searchName, date: searchDate, companyId: id}).then((result)=>{
          
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
          Factura.find({date: searchDate, companyId: id}).then((result)=>{
            
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
            Factura.find({"clientdata.nume": searchName, companyId: id}).then((result)=>{
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
              Factura.find({companyId: id }).then((result)=>{
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
    }
    
  });


  send.delete("/deleteInvoice",auth, (req, res) => {
    let Id = new ObjectId("");
    id = req.body._id
    
    Factura.deleteOne({_id: id, companyId: req.body.companyId}).then((result)=>{
      if(result.deletedCount < 1){
        res.status(401).json({
          message: "Can not delete this invoice",
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