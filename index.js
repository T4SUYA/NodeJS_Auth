const express = require('express')

const app = express()

const dotenv = require('dotenv')

const moongose = require('mongoose')

const authRoute = require('./routes/auth')
const postsRoute = require("./routes/posts")

dotenv.config()

app.use(express.json())

moongose.connect(process.env.DB_URI,{
    useNewUrlParser: true,
    useUnifiedTopology: true
}, 
() => console.log('conected to db!'))


app.use('/api/user', authRoute)
app.use('/api/posts', postsRoute)

app.listen(3000, () => console.log("Up and running"))