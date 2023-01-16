const Company = require("../models/companies");
const express = require("express");
const company = express.Router();
const ObjectId = require("mongo-objectid");
const path = require("path")
var fs = require('fs');
const { json } = require("express");
const jwt = require('jsonwebtoken');
require('dotenv').config()
const auth = require('../middleware/auth')
const bcrypt = require("bcrypt");


company.post("/addCompany", (req,res,next)=>{
  
    const newCompany = new Company({
        name: req.body.name,
        adresa: req.body.adresa,
        euid: req.body.euid,
        registrationNumber: req.body.registrationNumber,
        web: req.body.web,
        logo: req.body.logo,

        articles: req.body.articles,
        userId: req.body.userId,
        photeNumber: req.body.photeNumber,
        mobileNumber: req.body.mobileNumber,
        fax: req.body.fax,
        email: req.body.email,
        bigBossName: req.body.bigBossName,
        cui:  req.body.cui,
        codCaen: req.body.codCaen, 
        bank: req.body.bank
        })
      console.log(newCompany.email)
    newCompany.save()
      .then((result) => {
        res.status(200).json({
          message: "succesfully added",
          
        });
      })
      .catch((error) => {
        res.status(400).json({
          message: "Eroare interna incercati din nou",
          error: error,
        }); 
    });
 })
  

company.use("/getUserCompanies", (req, res, next) =>{
  let response
  let id = req.body.ids
  Company.find({userId: id}).then((result)=>{
    res.status(200).json({
      count: result.length,
      result: result
    })
  }).catch((error) => {
    res.status(400).json({
      message: "Eroare interna incercati din nou",
      error: error,
    }); 
});
 

})


module.exports = company