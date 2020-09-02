require('dotenv').config()
var mysql = require('mysql2');

var con = mysql.createConnection({
	host        : process.env.MYSQLHOST,
	user 		: process.env.MYSQLUSER,
	password 	: process.env.MYSQLPASSWORD,
	port    	: process.env.MYSQLPORT,
	connectTimeout	: 0
});
//console.log('data: ' + process.env.MYSQLHOST);
con.connect(function(err) {
    if (err) throw err;
    var query = "CREATE DATABASE Matcha";
    con.query(query, function(err, result){
        if(err) throw err;
        console.log('Matcha created');
    });
});


