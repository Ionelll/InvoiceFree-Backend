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
const bcrypt = require("bcrypt");



user.post("/login" ,(req,res)=>{
    const username = req.body.username
    const password = req.body.password
    // console.log(username)
    let fetchedUser
    if(!username || !password){
        res.status(400).json({
            error: "fail to auth, please provide a username or a password"
        })
    }
    else{

      User.findOne({username: username}).then(user =>{
        if(!user){
          return res.status(400).json({ 
            message: "Auth Fail"
          });
        }

        fetchedUser = user
        return bcrypt.compare(password, user.password)

      })
      .then(result =>{
        if(!result){
          return res.status(400).json({
            message: "Auth Fail"
          })
        }
        id = fetchedUser._id
        const token = jwt.sign({id,  username}, process.env.JWT_SECRET, {expiresIn: '1h'})
        try{
          res.status(200).json({
            message: "succesfully login",
            token: token,
            user: {
              username: fetchedUser.username,
              email: fetchedUser.email,
              companies: fetchedUser.companies
            }
         })
        }
         catch(error) {
              res.status(400).json({
                message: "wrong username or password, please try again",
                error: error,
              }); 
          };
      })
    }
})



user.use("/test", auth, (req,res)=>{
  
  res.status(200).json({
    message: "ok"
  })
})


user.post("/register", (req,res)=>{
  bcrypt.hash(req.body.password, 10)
        .then(hash => {
          const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: hash
           })


           newUser.save()
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
    });
})




module.exports = user;