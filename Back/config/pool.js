require('dotenv').config();

var mysql = require('mysql2');
var util = require('util');

var pool = mysql.createPool({
	host        : process.env.MYSQLHOST,
	user 		: process.env.MYSQLUSER,
	password 	: process.env.MYSQLPASSWORD,
	port    	: process.env.MYSQLPORT,
	database    : 'matcha'
	//database : "mat1"
});

pool.query = util.promisify(pool.query)

module.exports.pool = pool

// let query = `SELECT photo_path, is_profile from photos WHERE user_id =1`
// pool.query(query)
// .then(res => console.log(res))
// .catch(e =>console.log(e))
//! Expresso: seconde ways to create a promisify mysql connections
//const promisePool = pool.promise()
//module.exports.promisePool = promisePool






