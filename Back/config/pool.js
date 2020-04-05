var mysql = require('mysql2');

var pool = mysql.createPool({
        connectionLimit : 15,
	    host	: "localhost",
	    user 	: "root",
        password 	: "roooot",
        database        : "mat1",
	    port    	: '5555',
        connectTimeout	: 0
})

module.exports = pool





