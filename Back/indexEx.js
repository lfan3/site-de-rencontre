require('dotenv').config()
const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const app = express()
//CROS polity
const cors = require('cors')
const md = require('./email/sendLoginToDB')
const cloudinary = require('cloudinary')

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key : process.env.API_KEY,
    api_secret: process.env.API_SECRET
})
console.log(process.env.CLOUD_NAME)
app.use(bodyParser.json());
app.use(cors({
    origin : 'http://localhost:8081'
}));
app.use(bodyParser.urlencoded({extended : false}));
app.get('/', (req, res)=>{
    res.send('env ' + process.env.CLOUD_NAME )
})
app.post('/api', md.sendLoginToDB)


app.listen(5000, ()=>{
    console.log('running on 5000');
})