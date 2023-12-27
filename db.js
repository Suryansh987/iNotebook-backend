const mongoose = require('mongoose')
require('dotenv').config()

const connectToDb = async() => {

    //Connecting To Database
    await mongoose.connect(process.env.DATABASE_URI)
    console.log("Connected")
}

module.exports = connectToDb