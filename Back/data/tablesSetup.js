var pool = require('../config/pool');
    
var Users = "CREATE TABLE IF NOT EXISTS users (\
                id INT NOT NULL AUTO_INCREMENT,\
                age INT NOT NULL,\
                sex INT NOT NULL,\
                sex_orient INT NOT NULL,\
                geo_loc GEOMETRY NOT NULL,\
                city VARCHAR(255),\
                race VARCHAR(20),\
                PRIMARY KEY (id)\
            );"

//   INDEX par_ind (parent_id),\
var Logins = "CREATE TABLE IF NOT EXISTS logins( \
                id INT NOT NULL AUTO_INCREMENT,\
                login VARCHAR(20) NOT NULL,\
                email VARCHAR(50) NOT NULL,\
                password VARCHAR(255) NOT NULL,\
                tocken VARCHAR(255) NOT NULL,\
                is_verified BOOLEAN NOT NULL DEFAULT 0,\
                user_id INT,\
                PRIMARY KEY (id),\
                FOREIGN KEY (user_id)\
                    REFERENCES users(id)\
                    ON DELETE CASCADE\
                );"  

var Photos = "CREATE TABLE IF NOT EXISTS photos( \
                id INT NOT NULL AUTO_INCREMENT,\
                photo_path VARCHAR(255) NOT NULL,\
                is_profile BOOLEAN DEFAULT 0,\
                user_id INT,\
                PRIMARY KEY (id),\
                FOREIGN KEY (user_id)\
                    REFERENCES users(id)\
                    ON DELETE CASCADE\
                );" 

var Tags = "CREATE TABLE IF NOT EXISTS tags( \
                id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,\
                tag VARCHAR(30) NOT NULL\
            );"

var Users_Tags = "CREATE TABLE IF NOT EXISTS Users_Tags( \
                id INT NOT NULL AUTO_INCREMENT,\
                user_id INT NOT NULL,\
                tag_id INT NOT NULL,\
                PRIMARY KEY (id),\
                FOREIGN KEY (user_id)\
                    REFERENCES users(id)\
                    ON DELETE CASCADE,\
                FOREIGN KEY (tag_id)\
                    REFERENCES tags(id)\
                    ON DELETE CASCADE\
                );" 

var Likes = "CREATE TABLE IF NOT EXISTS likes( \
                id INT NOT NULL AUTO_INCREMENT,\
                userA_id INT NOT NULL,\
                userB_id INT NOT NULL,\
                PRIMARY KEY (id),\
                FOREIGN KEY (userA_id)\
                    REFERENCES users(id)\
                    ON DELETE CASCADE,\
                FOREIGN KEY (userB_id)\
                    REFERENCES users(id)\
                    ON DELETE CASCADE\
            );" 



let tables = [Users, Logins, Photos, Tags, Users_Tags, Likes]

pool.getConnection((err, connection) => {
    if (err) {
        if (err.code === 'PROTOCOLE_CONNECTION_LOST')
            console.error('Database connection was closed');
        if (err.code === 'ER_CON_COUNT_ERROR')
            console.error('Database has too many connections');
        if (err.code === 'ECONNREFUSED')
            console.error('Dababase Connection was refused');
    }
    tables.map((query, index)=>{
        connection.query(query, function(err, result, fields){
            if(err) throw new Error(err);
            console.log( index + 'created');
            connection.release();
        });
    })
})









