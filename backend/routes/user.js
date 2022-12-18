const User = require("../models/user");
const express = require("express");
const user = express.Router();
const ObjectId = require("mongo-objectid");
const path = require("path")
var fs = require('fs');
const { json } = require("express");
const jwt = require('jsonwebtoken');
require('dotenv').config()
const auth = require('../middleware/auth')



user.post("/login" ,(req,res)=>{
    const username = req.body.username
    const password = req.body.password
    
    if(!username || !password){
        res.status(400).json({
            error: "fail to auth, please provide a username or a password"
        })
    }
    else{
        const id = new Date().getDate()
        
        const token = jwt.sign({id, username}, process.env.JWT_SECRET, {expiresIn: '30d'})

      try{
        res.status(200).json({
          message: "succesfully login",
          token: token
       })
      }
       catch(error) {
            res.status(400).json({
              message: "wrong username or password, please try again",
              error: error,
            }); 
        };
    }
   
})


user.use("/test", auth, (req,res)=>{
  
  res.status(200).json({
    message: "ok"
  })
})


user.post("/register", (req,res)=>{
   const newUser = new User({
    username: req.body.username,
    adresa: req.body.adresa,
    phone: req.body.phone,
    cui: req.body.cui,
    email: req.body.email,
    website: req.body.website,
    password: req.body.password,
    numeFirma: req.body.numeFirma,
    bank: req.body.bank
   })

   newUser.save()
   .then((result) => {
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
})




module.exports = user;