require('dotenv').config()

const express = require('express')
const app = express()
const http = require('http')
const server = http.createServer(app)
const soketio = require('socket.io')
const io = soketio(server)

const path = require('path')
const bodyParser = require('body-parser')

//const router = require('./router')
const {RootRouter} = require('./build/routers/index.routers')

const cors = require('cors')
const cloudinary = require('cloudinary')
const formData = require('express-form-data')
const {v4 : uuidv4} = require('uuid')
const session = require('express-session')
const FileStore = require('session-file-store')(session)
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const axios = require('axios')
const bcrypt = require('bcrypt')
const get_auth_user = require('./email/signUp').get_auth_user
const DBfindByEmail = require('./email/signUp').DBfindByEmail
//const {getUser, removeUser, addUser, getUserInRoom} = require('./helpers')

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key : process.env.API_KEY,
    api_secret: process.env.API_SECRET
})

app.use(cors({
    origin : 'http://localhost:8085',
    methods : ['GET', 'POST'],
    credentials:true
}));

app.use(bodyParser.json({limit : '10mb'}))
app.use(bodyParser.urlencoded({extended : true, limit : '10mb'}));
app.use(formData.parse())

app.use('/', RootRouter)


//at first i use app.listen(), but that does not work
server.listen(5000, ()=>{
    console.log('running on 5000');
})
