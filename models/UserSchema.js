const { Schema } = require('mongoose')
const mongoose = require('mongoose')

//Defining the name of database to be used
const db = mongoose.connection.useDb("iNoteBook")

//User Schema
const UserSchema = new Schema({
    name : {
        type : String,
        required : true
    },
     email : {
        type : String,
        required : true,
        unique : true
     },
     password : {
        type : String,
        required : true,
     },
     Date : {
        type : Date,
        default : Date.now
     }
})

//Exporting User model
module.exports = db.model("Users",UserSchema,'User');
