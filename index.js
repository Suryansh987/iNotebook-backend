const express = require('express')
const connectToMongo = require('./db')
const app = express()
const port = 3000

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
app.listen(port, () => console.log(`Example app listening on port ${port}!`))

