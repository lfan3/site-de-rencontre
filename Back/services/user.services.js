var UserModel = require('../models/user.model');

exports.getUserById = async function(userId){
    try{
        var user = await UserModel.getUserById(userId);
        return user;
    }catch(e){
        throw Error(e)
    }
}