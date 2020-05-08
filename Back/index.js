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
//CROS polity
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

passport.use(new LocalStrategy(
    {usernameField: 'email'},
    (email, password, done) => {
        console.log('inside the local strategie callback')
        //test to grab user from database
        //name: DB.findByEmail()
        var data = DBfindByEmail(email)
        //data.then ==> will call deserialize
        data.then((res)=>{
            let user = res[0]
            if(!user)
                return done(null, false, {message : 'invalide'})
            if(!bcrypt.compareSync(password, user.password))
                return done(null, false, {message : 'invalide password'})
            //null is erro object, and then user object
            //done ===> will call sterilize to store the data
            return done(null, user)
        })
    }
))
passport.serializeUser((user, done)=>{
    console.log('inside the serilize cb')
    console.log(user.id)
    //stock user Id
    done(null, user.id)
})
passport.deserializeUser((id, done)=>{
    console.log('inside the deserialize')
    get_auth_user(id)
    .then((res)=>{done(null, res[0]);console.log('deserialize')})
    .catch(error => done(error))
})

app.use(cors({
    origin : 'http://localhost:8081',
    methods : ['GET', 'POST'],
    credentials:true
}));

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended : false}));
app.use(formData.parse())
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
app.use(passport.initialize())
app.use(passport.session())
app.use(router)

app.post('/signin', (req, res, next)=>{
    console.log('Inside Post/Login callback function')
    console.log('req.body: ')
    console.log(req.body)
    passport.authenticate('local', (err, user, info)=>{
        if(info) {console.log(info.message);return res.send(info.message)}
        if(err) {console.log(err);return next(err)}
        if(!user) {return res.redirect('/login')}
        req.login(user, (err)=>{
            console.log('Inside req.login() callback')
            console.log(req.sessionID)
            console.log(JSON.stringify(req.session.passport))
            console.log(JSON.stringify(req.user))
            if(err){
                return next(err)
            }
            return res.redirect('/authrequired')
        })
        })(req, res, next)
})
app.get('/authrequired', (req, res)=>{
    console.log('inside authrequire')
    console.log(`user authentificated? ${req.isAuthenticated()}`)
    if(req.isAuthenticated()){
        console.log('user is authenticated')
        //sign userId to express sesssion. so that we can get assces to everywhere
        req.session.userId = req.session.passport
        res.send(req.session.passport)
    }
    else{
        console.log('user is not autenticated')
        res.send({user: null})
        res.redirect('/')
    }
})


/**utility functions for socket */
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
