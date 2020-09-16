var UserService = require('../services/user.services');


exports.getUserById = async function(req, res,next){
    var userId = req.body.userId;
    try{
        var user = await UserService.getUserById(userId);
        res.status(200).json({status:200, data: user, message:'success'});
    } catch(e){
        res.status(400).json({status:400, message:e.message});
    }
}

exports.signUp = async function(req, res){
    var userInfo = req.body;
    try{
        var msg = await UserService.signUp(userInfo);
        res.status(200).json({status:200, data:msg});
    }catch(e){
        res.status(400).json({status:400, message:e.message});
    }
}
