require('dotenv').config()
const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const app = express()
//CROS polity
const cors = require('cors')
const md = require('./email/sendLoginToDB')
const cloudinary = require('cloudinary')
const formData = require('express-form-data')

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key : process.env.API_KEY,
    api_secret: process.env.API_SECRET
})

app.use(bodyParser.json())
app.use(formData.parse())

app.use(cors({
    origin : 'http://localhost:8081'
}));
app.use(bodyParser.urlencoded({extended : false}));
app.get('/', (req, res)=>{
    res.send('env ' + process.env.CLOUD_NAME )
})
app.post('/api', md.sendLoginToDB)
app.post('/image-upload', (req, res)=>{
   
    const values = Object.values(req.files)
    const promises = values.map((image)=> cloudinary.uploader.upload(image.path))
    Promise
        .all(promises)
        .then(results => {res.json(results); console.log(results)})
})

app.listen(5000, ()=>{
    console.log('running on 5000');
})