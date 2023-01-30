const Client = require("../models/client");
const express = require("express");
const router = express.Router();
const ObjectId = require("mongo-objectid");
const auth = require('../middleware/auth')


router.post("/addclient", async (req, res) => {
  
  
  let searchClient = Client.find({nume: req.body.nume}).then((result) => {
    return result
  })
  
  let existedClient = await searchClient
  
  if (existedClient.length < 1){
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
  else{
    const updateClient = {
      nume: req.body.nume,
      adresa: req.body.adresa,
      telefon: req.body.telefon,
      cui: req.body.cui,
      email: req.body.email,
      website: req.body.website,
    }
    
    Client.findByIdAndUpdate({_id: existedClient[0]._id }, updateClient, (error, data) => {
      
      if (error) {
        res.status(400).json(error);
      } else {
        res.status(200).json({message: "succesfully updated"}); 
      }
    })
  }
});


router.use("/clients", auth,(req, res) => {

  Client.find().then((result) => {
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


router.use("/client/:nume", (req, res) => {

  Client.find({nume: req.params.nume}).then((result) => {
    // console.log(result)
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



router.post("/deleteClient", (req, res) => {
  let Id = new ObjectId("");
  id = req.body._id
  Client.deleteOne({_id: id}).then((result)=>{
    if(result.deletedCount < 1){
      res.status(401).json({
        message: "cant delete client",
      });
    }
    else{
      res.status(200).json({
        message: "Item was deleted succesfully",
      });
    }
  })
})


router.post("/updateClient", (req,res)=> {
  
  let Id = new ObjectId("");
  id = req.body._id
  Client.findOne({_id: id}).then((result)=>{
    if(req.body.nume === null || req.body.nume === "" || typeof(req.body.nume) === undefined){
      var nume = result.nume
    }
    else{
      var nume = req.body.nume
    }

    if(req.body.adresa === null || req.body.adresa === "" || typeof(req.body.adresa) === undefined){
      var adresa = result.adresa
    }
    else{
      var adresa = req.body.adresa
    }

    if(req.body.telefon === null || req.body.telefon === "" || typeof(req.body.telefon) === undefined){
      var telefon = result.telefon
    }
    else{
      var telefon = req.body.telefon
    }

    if(req.body.cui === null || req.body.cui === "" || typeof(req.body.cui) === undefined){
      var cui = result.cui
    }
    else{
      var cui = req.body.cui
    }

    if(req.body.email === null || req.body.email === "" || typeof(req.body.email) === undefined){
      var email = result.email
    }
    else{
      var email = req.body.email
    }

    if(req.body.website === null || req.body.website === "" || typeof(req.body.website) === undefined){
      var website = result.website
    }
    else{
      var website = req.body.website
    }

    const  updateClient = ({
      nume: nume,
      adresa: adresa,
      telefon: telefon,
      cui: cui,
      email: email,
      website: website,
    });

   
    Client.findByIdAndUpdate({_id: id}, updateClient, (error, data) => {
      if (error) {
        res.status(400).json(error);
      } else {
        res.status(200).json({message: "succesfully updated"}); 
      }
    }
    );
  })

})


module.exports = router;
