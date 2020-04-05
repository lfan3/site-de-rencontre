var mysql = require('mysql2');

var con = mysql.createConnection({
    host            : "localhost",
	user 			: "root",
	password 		: "roooot",
	port    		: '5555',
	connectTimeout	: 0
});

con.connect(function(err) {
    if (err) throw err;
    var query = "CREATE DATABASE Macha";
    con.query(query, function(err, result){
        if(err) throw err;
        console.log('Macha created');
    });
});
