const {pool, promisePool} = require('../config/pool');
const Errors = require('../errors');

exports.getUserById = async function find(userId){
    try{
        let query = `select * From users where id = ${userId}`
        let user = await pool.query(query)
        console.log(query, user);
        //throw and status? in controller?
        if(!user.length)
            throw new Errors.NotFound('user is not found')
        return user
    }catch(err){
        throw new Error(err)
    }
}  



