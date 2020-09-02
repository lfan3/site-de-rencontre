//var UserModel = require('../models/user.model') 
var UserService = require('../services/user.services') 

exports.getUserById = async function(req, res,next){
    var userId = req.body.userId;
    console.log(req.body);
    try{
        var user = await UserService.getUserById(userId);
        res.status(200).json({status:200, data: user, message:'success'});
    } catch(e){
        res.status(400).json({status:400, message:e.message});
    }
}