require('dotenv').config()
const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const app = express()
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
const signUp = require('./email/signUp').signUp
const test_auth = require('./email/signUp').test_auth
const DBfindByEmail = require('./email/signUp').DBfindByEmail
const fetchAllPhotos = require('./data/api').fetchAllPhotos
const {filterUsers, fetchUsersPhotos, getCriterias} = require('./data/api')


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
        data.then((res)=>{
        let user = res[0]
        if(!user){
            return done(null, false, {message : 'invalide'})
        }
        if(!bcrypt.compareSync(password, user.password)){
            return done(null, false, {message : 'invalide password'})
        }
        //null is erro object, and then user object
        return done(null, user)
        })
    }
))
passport.serializeUser((user, done)=>{
    console.log('inside the serilize cb')
    console.log(user.id)
    done(null, user.id)
})
passport.deserializeUser((id, done)=>{
    console.log('inside the deserialize')
    test_auth(id)
    .then((res)=>{done(null, res[0])})
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

app.get('/signin', (req, res)=>{
    console.log('inside the signin get callback function')
    console.log(req.sessionID)
    //res.send('env ' + process.env.CLOUD_NAME)
    res.send('singin')
})

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
    if(req.isAuthenticated())
        res.send('verified')
    else
        res.redirect('/')
})

app.post('/signup', signUp)
app.post('/email_verify', (req, res)=>{
    console.log('inside email_verify')
   const {email, tocken} = req.body 
   let datapromise = DBfindByEmail(email)
   datapromise.then((data)=>{
        if(data){
            //user != data, but data[0]
            let user = data[0]
            if(user.tocken === tocken){
                console.log("email verified")
                return res.send('email verified')
            }
        }else{
            return res.send('email verification is KO')
        }
   })

})

app.post('/main', (req, res)=>{
    //const results = fetchAllPhotos()
    let userId = req.body.userId
    const results = fetchUsersPhotos(userId)
    console.log(req.body)
    results.then(users => {      
        //send an array
        res.send(users)
    })
})

app.post('/filterUsers', (req, res)=>{

    let conditions = getCriterias(req.body)
    console.log(conditions)
    //filterUsers(conditions).then((result)=>{
    //    console.log(result)
    //    //result is an array of user object
    //    res.send(result)
    //})
})
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