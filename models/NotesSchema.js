const mongoose = require('mongoose')
const { Schema } = require('mongoose')

//Defining the name of database to be used
const db = mongoose.connection.useDb("iNoteBook")

//Notes Schema
const NotesSchema = new Schema({
    userid : {
        type : mongoose.Schema.Types.ObjectId
    },
    title : {
        type : String,
        required : true
    },
    description : {
        type : String,
        required : true
    },
    tag : {
        type : String,
        default : "Genral"
    },
    Date : {
        type : Date,
        default : Date.now
    }
})

//Exporting mongoose Model
module.exports = db.model("Notes",NotesSchema,'Note')