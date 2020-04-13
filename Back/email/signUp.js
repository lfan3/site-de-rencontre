const randomstring = require('randomstring')
const sendMail = require('./sendEmail').sendMail
const mailTemplate = require('./email_template')
const {SERVER_EMAIL} = require('./sendEmail')
const pool = require('../config/pool')
const hashpass = require('../utilites/hashpass').hashpass

async function addNewUser(data){
    try{
        //clean data with escaping query=>prevent SQL injection attack
        let info = await pool.query('INSERT INTO logins SET ?', data)
        console.log(info)
        console.log('data sended out')
    }catch(err){
        console.log(`Error in addNewUser ${err}`)
    }
}

async function DBfindByEmail(email){
    try{
        let data = await pool.query('SELECT id, email, password, tocken FROM logins WHERE email= ?', [email])
        return data
    }catch(err){
        console.log(err)
    }
}
async function test_auth(id){
    try{
        let data = await pool.query('SELECT id, email, password FROM logins WHERE id= ?', [id])
        return data
    }catch(err){
        console.log(err)
    }
}



const signUp = (req, res)=>{
    console.log('inside the signUp.js')
        res.header("Access-Control-Allow-Origin", "http://localhost:8081")
        let {username,email,passwd} = req.body
        //we can do another server input security check again like in frontend
        let tocken = randomstring.generate()
        hashpass(passwd).then((hashpasswd)=>{
            let data = {
                login : username,
                email : email,
                password : hashpasswd,
                tocken : tocken
            }
            addNewUser(data)
            let content = mailTemplate.confirm(data.email, data.tocken)
            sendMail(SERVER_EMAIL, content);
        })
        res.send("Email has been sended")
}

exports.signUp = signUp
exports.DBfindByEmail = DBfindByEmail
exports.test_auth = test_auth
