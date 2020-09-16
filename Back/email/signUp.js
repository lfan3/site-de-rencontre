require('dotenv').config()
const randomstring = require('randomstring')
const sendMail = require('./sendEmail').sendMail
const {pool} = require('../config/pool')
const hashpass = require('../utilites/hashpass').hashpass

const SERVER_EMAIL = process.env.EMAIL_SENDER

async function check_existing_use(data){
    try{
        let query = 'SELECT * FROM logins WHERE email = ?'  
        let existing = await pool.query(query, [data])
        if(existing[0])
            return true
        else
            return false
    }catch(e){
        console.log('Error in check_existing_user' + e)
    }
}
/*
async function addNewUser(data){
    try{
        console.log('inside addNewUser')
        //clean data with escaping query=>prevent SQL injection attack
        let exiting_user = await check_existing_use(data.email)
        if(!exiting_user){
            let info = await pool.query('INSERT INTO logins SET ?', data)
            return({success : 'new user is added to the DB'})
        }
        else{
            return({error : 'user is already existed'})
        }
    }catch(err){
        console.log(`Error in addNewUser ${err}`)
    }
}
*/
async function DBfindByEmail(email){
    try{
        let data = await pool.query('SELECT id, email, password, tocken FROM logins WHERE email= ?', [email])
        return data
    }catch(err){
        console.log(err)
    }
}
async function get_auth_user(id){
    try{
        let data = await pool.query('SELECT id, email, password FROM logins WHERE id= ?', [id])
        return data
    }catch(err){
        console.log(err)
    }
}


/*
const signUp = (req, res)=>{
    console.log('inside the signUp.js')
        res.header("Access-Control-Allow-Origin", "http://localhost:8081")
        let {username,email,passwd} = req.body
        //we can do another server input security check again like in frontend
        console.log(req.body)
        let tocken = randomstring.generate()
   
        hashpass(passwd).then((hashpasswd)=>{
            let data = {
                login : username,
                email : email,
                password : hashpasswd,
                tocken : tocken
            }
            let content = mailTemplate.confirm(data.email, data.tocken)
            sendMail(SERVER_EMAIL, content);
            addNewUser(data).then((answer)=>{
                console.log(answer)
                if(answer.error)
                    res.send(answer)
                else
                    res.send({sendEmail : true})
            })

        }).catch((e)=>{console.log('error in hashpass '+e)})
}
exports.signUp = signUp
*/
exports.DBfindByEmail = DBfindByEmail
exports.get_auth_user = get_auth_user

hashpass('Mustafa_Mante123').then((hash)=>console.log(hash))