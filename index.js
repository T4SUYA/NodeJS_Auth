const express = require('express');

const app = express();

const dotenv = require('dotenv');

const moongose = require('mongoose');

const authRoute = require('./routes/auth');

dotenv.config();

app.use(express.json());

moongose.connect(process.env.DB_URI,{
    useNewUrlParser: true,
    useUnifiedTopology: true
}, 
() => console.log('conected to db!'));


app.use('/api/user', authRoute);

app.listen(3000, () => console.log("Up and running"));