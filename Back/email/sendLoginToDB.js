const randomstring = require('randomstring')
const bcrypt = require('bcrypt')
const sendMail = require('./sendEmail').sendMail
const mailTemplate = require('./email_template')
const {SERVER_EMAIL} = require('./sendEmail')
const pool = require('../config/pool')
const until = require('util')

pool.query = until.promisify(pool.query)

async function addNewUser(data){
    try{
        //clean data with escaping query=>prevent SQL injection attack
        let info = await pool.query('INSERT INTO logins SET ?', data)
        console.log(info)
        console.log('data sended out')
    }catch(err){
        console.log(err)
    }
}

var hashpass = async (pass) => {
    try{
        let hash = await bcrypt.hash(pass, 10);
        return hash;
    }catch(err){
        console.log(err)
    }
}

const sendLoginToDB = (req, res)=>{
        res.header("Access-Control-Allow-Origin", "http://localhost:8081")
        let {username,email,passwd, confPasswd} = req.body
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
        res.send("post to /api")
}

exports.sendLoginToDB = sendLoginToDB
