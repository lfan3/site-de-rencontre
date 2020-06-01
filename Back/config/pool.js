var mysql = require('mysql2');
var util = require('util')

var pool = mysql.createPool({
        connectionLimit : 15,
	    host	: "localhost",
	    user 	: "root",
        password 	: "roooot",
        database        : "mat1",
	    port    	: '5555',
        connectTimeout	: 0
})


//! Two ways to create a promisify mysql connections
const promisePool = pool.promise()
pool.query = util.promisify(pool.query)
module.exports.pool = pool
module.exports.promisePool = promisePool






