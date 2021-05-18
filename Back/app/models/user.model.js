const {pool, promisePool} = require('../config/pool');
const Errors = require('../errors');

//est-ce que c'est utile cette requete getUserById??
exports.getUserById = async function find(userId){
    try{
        let query = `select * From users where id = ${userId}`
        let user = await pool.query(query)
        //throw and status? in controller?
        if(!user.length)
            throw new Errors.NotFound('user is not found')
        return user
    }catch(err){
        throw new Error(err)
    }
}  

//is it useful to export this function ?
async function checkExistingUser(email)
{
    try{
        let query = 'SELECT * FROM logins WHERE email = ?'  
        let existing = await pool.query(query, [email])
        if(existing[0])
            return true
        else
            return false
    }catch(e){
        throw new Error('checkExistingUser Error ' + e)
    }
}

exports.addNewUser = async function addNewUser(data){

    try{
        let exiting_user = await checkExistingUser(data.email)
        console.log("inside add new user");
        console.log(exiting_user);
        if(!exiting_user){
            await pool.query('INSERT INTO logins SET ?', data)

            return({message : 'success'})
        }else{
            throw new Errors.Existed("User already existed");
        }
    }catch(err){
        throw new Error(err)
    }
}


