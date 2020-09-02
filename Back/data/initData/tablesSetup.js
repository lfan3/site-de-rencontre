var {pool} = require('../../config/pool');

//! mysql name convention : table and db's name, singuler, lower case, connected with underscore
//   INDEX par_ind (parent_id),\
var Logins = "CREATE TABLE IF NOT EXISTS logins( \
                id INT NOT NULL AUTO_INCREMENT,\
                login VARCHAR(50) NOT NULL,\
                email VARCHAR(50) NOT NULL,\
                password VARCHAR(255) NOT NULL,\
                tocken VARCHAR(255) NOT NULL,\
                is_verified BOOLEAN NOT NULL DEFAULT 0,\
                PRIMARY KEY (id)\
                );"  

var Users = "CREATE TABLE IF NOT EXISTS users (\
                id INT NOT NULL AUTO_INCREMENT,\
                name VARCHAR(50) NOT NULL,\
                birthday DATE NOT NULL,\
                sex VARCHAR(10) NOT NULL,\
                sex_orient VARCHAR(10) NOT NULL,\
                geo_loc GEOMETRY NOT NULL,\
                city VARCHAR(255),\
                login_id INT,\
                PRIMARY KEY (id),\
                FOREIGN KEY (login_id)\
                    REFERENCES logins(id)\
                    ON DELETE NO ACTION\
            );"

var Preferences = "CREATE TABLE IF NOT EXISTS preferences( \
                    id INT NOT NULL AUTO_INCREMENT,\
                    sex VARCHAR(10) NOT NULL,\
                    sex_orient VARCHAR(10) NOT NULL,\
                    age INT NOT NULL,\
                    distance INT NOT NULL\
                    PRIMARY KEY (id), \
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

var Logins_Tags = "CREATE TABLE IF NOT EXISTS Logins_Tags( \
                id INT NOT NULL AUTO_INCREMENT,\
                login_id INT NOT NULL,\
                tag_id INT NOT NULL,\
                PRIMARY KEY (id),\
                FOREIGN KEY (login_id)\
                    REFERENCES logins(id)\
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


var profileText = "CREATE TABLE IF NOT EXISTS profileText(\
                    id INT NOT NULL AUTO_INCREMENT,\
                    descrip TEXT(2500) NOT NULL, \
                    user_id INT NOT NULL,\
                    PRIMARY KEY (id),\
                    FOREIGN KEY (user_id)\
                        REFERENCES users(id)\
                        ON DELETE CASCADE\
                    );"

var single_like = "CREATE TABLE IF NOT EXISTS singleLike(\
                    id INT NOT NULL AUTO_INCREMENT,\
                    user_a INT NOT NULL,\
                    user_b INT NOT NULL,\
                    PRIMARY KEY (id),\
                    FOREIGN KEY (user_a)\
                        REFERENCES users(id)\
                        ON DELETE CASCADE,\
                    FOREIGN KEY (user_b)\
                        REFERENCES users(id)\
                        ON DELETE CASCADE\
                    );"
                

var mutual_like = "CREATE TABLE IF NOT EXISTS mutualLike(\
                    id INT NOT NULL AUTO_INCREMENT,\
                    user_a INT NOT NULL,\
                    user_b INT NOT NULL,\
                    room INT NOT NULL,\
                    PRIMARY KEY (id),\
                    FOREIGN KEY (user_a)\
                        REFERENCES users(id)\
                        ON DELETE CASCADE,\
                    FOREIGN KEY (user_b)\
                        REFERENCES users(id)\
                        ON DELETE CASCADE\
                    );"

var messages = "CREATE TABLE IF NOT EXISTS messages(\
                    id INT NOT NULL AUTO_INCREMENT,\
                    user_id INT NOT NULL,\
                    message TEXT(500),\
                    time TIMESTAMP NOT NULL,\
                    PRIMARY KEY (id)\
                    );"

let matchQuestions = "CREATE TABLE IF NOT EXISTS match_question(\
                        id INT NOT NULL AUTO_INCREMENT,\
                        login_id INT NOT NULL,\
                        q_index INT NOT NULL,\
                        option_one INT NOT NULL,\
                        option_two INT NOT NULL,\
                        option_three INT NOT NULL,\
                        PRIMARY KEY(id),\
                        FOREIGN KEY (login_id)\
                            REFERENCES logins(id)\
                            ON DELETE NO ACTION\
                    );"

let tables = [
    Logins, 
    Users, 
    Photos, 
    Tags, 
    Logins_Tags, 
    Likes, 
    profileText, 
    single_like,
    mutual_like,
    messages,
    matchQuestions
]

pool.getConnection((err, connection) => {
    if (err) {
        if (err.code === 'PROTOCOLE_CONNECTION_LOST')
            console.error('Database connection was closed');
        if (err.code === 'ER_CON_COUNT_ERROR')
            console.error('Database has too many connections');
        if (err.code === 'ECONNREFUSED')
            console.error('Dababase Connection was refused');
    }
    tables.map((queryTxt, index)=>{
        connection.query(queryTxt, function(err, result, fields){
            if(err) throw new Error(err);
            console.log( index + 'created');
            connection.release();
        });
    })
})








