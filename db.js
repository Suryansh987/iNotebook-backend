const mongoose = require('mongoose')
require('dotenv').config({ path: 'D:\\PROJECTS FOR GIT\\iNotebook\\backend\\.env' })

const connectToDb = async() => {
    //Connecting To Database
    await mongoose.connect(process.env.DATABASE_URI)
    console.log("Connected")
}

module.exports = connectToDb