const { Router } = require("express");
const jwt = require('jsonwebtoken')
const Notes = require("../models/NotesSchema");
const fetchid = require('../middlewares/fetchid')
require('dotenv').config({ path: 'D:\\PROJECTS FOR GIT\\iNotebook\\backend\\.env' })
const router = Router()

//ROUTE 1:TO INSERT A NOTE USING GET REQUEST
router.get('/insert',fetchid ,(req,res) => {
    if(res.headersSent){
        return
    }
    const {title,description,tag} = req.body
    const userid = req.id
    Notes.create({userid,title,description,tag})
    .then(note=>{
        res.status(200).json({note})
    })
    .catch(err=>{
        res.status(500).send("Internal Server Error")
    })
})

//ROUTE 2 : TO DISPLAY ALL THE NOTES USING GET REQUEST
router.get('/fetch-all',async(req,res)=>{
    const notes = await Notes.find({}).exec()
    res.json(notes)
})

//ROUTE 3 : TO UPDATE AN EXISTING NOTE ONLY IF IT BELONGS TO THAT USER
router.put('/update-note/:id' ,fetchid ,async (req,res)=>{
    if(res.headersSent){
        return
    }
    const {title,description,tag} = req.body
    const newNote = {}
    if(title){ newNote.title = title}
    if(description){ newNote.description = description}
    if(tag){ newNote.tag = tag}

    const note = await Notes.findById(req.params.id)
    if(!note){
        return res.status(404).json({"error":"Not Found"})
    }
    if(note.userid.toString() === req.id){
        const updatedNote = await Notes.findByIdAndUpdate(req.params.id,{$set:newNote},{new:true})
        return res.status(200).json({updatedNote})
    }
    res.status(404).send("NotFound")
})

//ROUTE 4 : DELETE A NOTE IF IT BELONGS TO THAT USER
router.delete('/delete-note/:id',fetchid,async(req,res)=>{
    if(res.headersSent){
        return
    }
    const note = await Notes.findById(req.params.id)
    if(!note){
        return res.status(404).send("NotFound")
    }
    if(note.userid.toString() === req.id){
        const deletedNote = await Notes.findByIdAndDelete(req.params.id)
        return res.status(200).send({deletedNote})
    }
    res.status(401).send("Unauthorized")
})

//ROUTE 5 : FETCH USER SPECIFIC NOTES USING GET REQUEST
router.get('/my-notes',fetchid ,async(req,res)=>{
    const userid = req.id
    const notes = await Notes.find({"userid":userid}).exec()
    return res.status(200).json({notes})
    // res.status(404).json("NotFound")
} )
module.exports = router