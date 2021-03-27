"use strict";
var express = require('express');
var router = express.Router();
var MainControler = require('../controllers/main.controller');
router.post('/main', MainControler.fetchUsersPhotos);
//router.post('/authenticate', UserControler);
module.exports = router;
