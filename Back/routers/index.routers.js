var express = require('express');
var router = express.Router();

var userRouter = require('./user.routes');
/*
router.use('/',(req,res)=>{
    res.send('main page');
})
*/
router.use('/users',userRouter);

module.exports = router;