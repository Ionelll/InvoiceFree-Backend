const Factura = require("../models/facturi");
const express = require("express");
const user = express.Router();
const ObjectId = require("mongo-objectid");
const path = require("path")
var fs = require('fs');
const { json } = require("express");


user.post("/login", (req,res)=>{
    const username = req.body.username
    const password = req.body.password
    
    if(!username || !password){
        res.status(400).json({
            error: "fail to auth, please provide a username or a password"
        })
    }
    else{
        res.status(200).json({
            username: req.body.username,
            password: req.body.password
        }).catch((error) => {
            res.status(400).json({
              message: "wrong username or password, please try again",
              error: error,
            }); 
        });
    }
   
})

user.post("/register", (req,res)=>{
   
})




module.exports = user;