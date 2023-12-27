const jwt = require('jsonwebtoken')

const createToken = data=>{
    console.log(data)
    const token = jwt.sign(data,process.env.JWT_SECRET_KEY)
    return token
}

module.exports = createToken