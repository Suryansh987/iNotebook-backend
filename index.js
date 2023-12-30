const express = require('express')
const connectToMongo = require('./db')
const cors = require('cors')
const app = express()
const port = 5000
app.use(cors())
//Calling connectToMonogo Function(db.js) to connect to database 
connectToMongo()

//To convert JSON String to JSON Object Comming in http request
app.use(express.json())

//Route for default path
app.get('/', (req, res) => res.send('Hello World!'))

//Route for User Auth
app.use('/api/user', require('./Routes/User'))

//Route for User notes
app.use('/api/notes', require('./Routes/Notes'))
app.listen(port, () => console.log(`iNoteBook backend Running at 127.0.0.1:${port}!`))

