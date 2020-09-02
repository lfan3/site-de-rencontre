var express = require('express');
var router = express.Router();

var UserControler = require('../controllers/user.controllers');

router.post('/', UserControler.getUserById);
//router.post('/authenticate', UserControler);

//test
router.get('/test',(req,res)=>{
    console.log('test');
})

module.exports = router;