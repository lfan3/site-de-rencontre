require('dotenv').config()

const express = require('express')
const app = express()
const http = require('http')
const server = http.createServer(app)
const soketio = require('socket.io')
const io = soketio(server)

const path = require('path')
const bodyParser = require('body-parser')

const router = require('./router')

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
/*
app.use(session({
    genid : (req) =>{
        console.log('inside the session middleware')
        console.log(req.sessionID)
        return uuidv4()
    },
    store: new FileStore(),
    secret : process.env.SESSION_KEY,
    resave : false,
    saveUninitialized: true
}))
*/
const THREE_HOURS = 1000 * 60 * 60 * 3

app.use(session({
    secret: process.env.SESSION_KEY,
    resave : false,
    saveUninitialized:true,
    cookie:{
        maxAge : THREE_HOURS,
        secure:true
    }
}))
//app.use(router)
app.use(require('./routers/index.routers'))

//socket part
let users = []
let messages = []
const addUser = ({id, userA, name,room})=>{
    name = name.trim().toLowerCase()
    let user = {id, userA, name, room}
    console.log('inside adduser')
    console.log(user)
    users.push(user)
    return user
}
const getUser = (socketId)=>{
    let user = users.find((each)=>each.id ===socketId)
    return user
}

io.on('connect', (socket)=>{
    console.log('a user is connected')

    socket.on('joint',({userA, name, room})=>{
        let id = socket.id
        addUser({id, userA, name, room})
        console.log(`a user ${name} is joined in ${room}`)
    //    socket.broadcast.to(room).emit('message', {user: 'admin', txt : `${name} joins the room`})

      //  console.log(users)

        socket.join(room)
    })
    socket.on('message',(message, cb)=>{
        console.log('message on server '+ message)
        socket.emit('message', message)
        cb()
    })
   socket.on('sendMessage', (message, cb)=>{
        let user = getUser(socket.id)
        if(user){
           let time = new Date().toISOString().slice(0,19).replace('T', ' ')
        let eachMessage = {
            userA: user.userA, 
            user : user.name, 
            txt : message,
            time
        }
        messages.push(eachMessage)
        io.to(user.room).emit('message', eachMessage)
        cb()
       }else{
           console.log('user not joined')
       }
   })
    socket.on('disconnect', ()=>{
        console.log('a user is left')
    })
})


/*
io.on('connection', function(socket){
    console.log('a user connected');

    socket.on('join', ({name, room}, cb)=>{
        const {user, error} = addUser({id : socket.id, name, room})
        if(error)
            return cb(error)
        socket.emit('message', {user : 'admin', text : `welcome ${user.name} enters inside ${user.room}`})
        socket.broadcast.to(user.room).emit('message', {user: 'admin', text : `${user.name} joins the room`})
        socket.join(user.room)
        console.log(`${name} enters in ${room}`)
        cb()
    })

    socket.on('sendMessage', (message, cb)=>{
        let user = getUser(socket.id)
        console.log(message)
        let eachMessage = {user : user.name, text : message}
        messages.push(eachMessage)
        //io.to not soket.to
        io.to(user.room).emit('message', eachMessage)
        cb()
    })

    socket.on('disconnect', (name, room, cb)=>{

        //removeUser(soketio.id)
        //io.to(room).emit(`${name} is left`)
        console.log('a user is left')
    })
});
*/


//at first i use app.listen(), but that does not work
server.listen(5000, ()=>{
    console.log('running on 5000');
})
