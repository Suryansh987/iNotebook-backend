const express = require("express");
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
require('dotenv').config()
const User = require("../models/UserSchema");
const createToken = require("../middlewares/createToken");
const router = express.Router()


//ROUTE 1: FOR SIGNUP USING POST REQUEST SEND AUTH-TOKEN IN RETURN
router.post('/signup',(req,res) =>{
    const {name,email,password} = req.body;
    bcrypt.genSalt(10)
    .then(salt =>{
        bcrypt.hash(password,salt)
        .then(hash =>{
            User.create({name,email,"password":hash})
            .then(user =>{
                const data = {
                    user:{
                        id:user._id
                    }
                }
                const token = createToken(data)
                res.status(200).json({token})
            })
            .catch(err =>{
                res.status(400).send(err.message)
            })
        })
        .catch(err => {
            res.status(500).send("Internal Server Error")
        })
    })
    .catch(err=>{
        res.status(500).send("Internal Server Error")
    })
})

//ROUTE 2: LOGIN USING POST REQUEST SEND AUTH-TOKEN IF SUCCESS
router.post('/login',async(req,res) =>{
    const {email,password} = req.body
    const credentials = await User.findOne({"email":email}).exec()
    if(credentials){
        const pass = credentials.password
        const data = {
            user:{
                id:credentials._id.toString()
            }
        }
        const token = createToken(data)
        bcrypt.compare(password,pass)
        .then(isCorrect =>{
            if(isCorrect){
                res.status(200).json({token})
            }
            else{
                res.status(401).json({"response":"Invalid Credentials"})
            }
        })
        .catch(err =>{
            res.status(401).json({"response":"Invalid Credentials"})
        })
    }
    else{
        res.status(401).json({"response":"Invalid Credentials"})
    }
})

module.exports = router