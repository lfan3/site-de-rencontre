require('dotenv').config()
var UserModel = require('../models/user.model');
var EmailService = require('../services/email.services')
const randomstring = require('randomstring')
const hashpass = require('../utilites/hashpass').hashpass

const SERVER_EMAIL = process.env.EMAIL_SENDER

exports.getUserById = async function(userId){
    try{
        var user = await UserModel.getUserById(userId);
        return user;
    }catch(e){
        throw Error(e)
    }
}

exports.signUp = async function(userInfo){
    //res.header("Access-Control-Allow-Origin", CLIENT_ORIGIN);
    let {username,email,passwd} = userInfo

    let tocken = randomstring.generate()
    hashpass(passwd).then((hashpasswd)=>{
        let data = {
            login : username,
            email : email,
            password : hashpasswd,
            tocken : tocken
        }
        //change to mail service
        let content = EmailService.EmailConfirmTemplate(data.email, data.tocken)
        EmailService.SendMail(SERVER_EMAIL, content);
        UserModel.addNewUser(data).then((success)=>{
            console.log(success);
            return success;
        })
    }).catch((e)=>{throw Error(e)})
}