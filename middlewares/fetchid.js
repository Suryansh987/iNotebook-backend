const jwt = require('jsonwebtoken')
require('dotenv').config()

const fetchid = (req,res,next)=>{
    const token = req.header("auth-token")
    if(token){
        jwt.verify(token,process.env.JWT_SECRET_KEY,(err,value)=>{
            if(err){
                return res.status(401).json({"error":"Please enter a valid token"})
            }
            else{
                req.id = value.user.id
            }
        })
    }
    else{
        return res.status(401).send({"error":"Please signup First"})
    }
    next()
}

module.exports = fetchid