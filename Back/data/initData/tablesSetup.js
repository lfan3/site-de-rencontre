const {pool} = require('../../config/pool');

//!Expresso: mysql name convention : table and db's name, singuler, lower case, connected with underscore
//   INDEX par_ind (parent_id),\
// var Logins = "CREATE TABLE IF NOT EXISTS logins( \
//                 id INT NOT NULL AUTO_INCREMENT,\
//                 login VARCHAR(50) NOT NULL,\
//                 email VARCHAR(50) NOT NULL,\
//                 password VARCHAR(255) NOT NULL,\
//                 tocken VARCHAR(255) NOT NULL,\
//                 is_verified BOOLEAN NOT NULL DEFAULT 0,\
//                 PRIMARY KEY (id)\
//                 );"  

const Users = "CREATE TABLE IF NOT EXISTS users (\
            id INT NOT NULL AUTO_INCREMENT,\
            name VARCHAR(50) NOT NULL,\
            birthday DATE NOT NULL,\
            sex VARCHAR(10) NOT NULL,\
            orient VARCHAR(10) NOT NULL,\
            geo_loc GEOMETRY NOT NULL,\
            city VARCHAR(255),\
            login VARCHAR(50) NOT NULL,\
            email VARCHAR(50) NOT NULL,\
            password VARCHAR(255) NOT NULL,\
            tocken VARCHAR(255) NOT NULL,\
            is_verified BOOLEAN NOT NULL DEFAULT 0,\
            role VARCHAR(50),\
            PRIMARY KEY (id)\
        );"

const Preferences = "CREATE TABLE IF NOT EXISTS preferences( \
                    id INT NOT NULL AUTO_INCREMENT,\
                    sex VARCHAR(10) NOT NULL,\
                    orient VARCHAR(10) NOT NULL,\
                    age INT NOT NULL,\
                    distance INT NOT NULL\
                    PRIMARY KEY (id), \
                    FOREIGN KEY (user_id)\
                        REFERENCES users(id)\
                        ON DELETE CASCADE\
                    );"



const Photos = "CREATE TABLE IF NOT EXISTS photos( \
                id INT NOT NULL AUTO_INCREMENT,\
                photo_path VARCHAR(255) NOT NULL,\
                is_profile BOOLEAN DEFAULT 0,\
                user_id INT,\
                PRIMARY KEY (id),\
                FOREIGN KEY (user_id)\
                    REFERENCES users(id)\
                    ON DELETE CASCADE\
                );" 

const Tags = "CREATE TABLE IF NOT EXISTS tags( \
                id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,\
                tag VARCHAR(30) NOT NULL\
            );"

const Logins_Tags = "CREATE TABLE IF NOT EXISTS Logins_Tags( \
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

const Likes = "CREATE TABLE IF NOT EXISTS likes( \
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


const bio_courte = "CREATE TABLE IF NOT EXISTS bio_courte(\
                    id INT NOT NULL AUTO_INCREMENT,\
                    bioCourte TEXT(2500) NOT NULL, \
                    user_id INT NOT NULL,\
                    PRIMARY KEY (id),\
                    FOREIGN KEY (user_id)\
                        REFERENCES users(id)\
                        ON DELETE CASCADE\
                    );"

const single_like = "CREATE TABLE IF NOT EXISTS singleLike(\
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
                

const mutual_like = "CREATE TABLE IF NOT EXISTS mutualLike(\
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

const messages = "CREATE TABLE IF NOT EXISTS messages(\
                    id INT NOT NULL AUTO_INCREMENT,\
                    user_id INT NOT NULL,\
                    message TEXT(500),\
                    time TIMESTAMP NOT NULL,\
                    PRIMARY KEY (id)\
                    );"

let matchQuestions = "CREATE TABLE IF NOT EXISTS match_question(\
                        id INT NOT NULL AUTO_INCREMENT,\
                        user_id INT NOT NULL,\
                        q_index INT NOT NULL,\
                        option_one INT NOT NULL,\
                        option_two INT NOT NULL,\
                        option_three INT NOT NULL,\
                        PRIMARY KEY(id),\
                        FOREIGN KEY (user_id)\
                            REFERENCES users(id)\
                            ON DELETE NO ACTION\
                    );"

const tablesObj = {
    Users, 
    Photos, 
    Tags, 
    Logins_Tags, 
    Likes, 
    bio_courte, 
    single_like,
    mutual_like,
    messages,
    matchQuestions
}

// const photoTest = {
//     Photos
// }


//!expresso: pool.query is pool.query = util.promisify(pool.query) in the pool, so we can use [then catch] promise synthax instead of a callback
//!exemple promise syntax:
//! pool.query('SELECT 1 + 1 AS sol').then((results, fields)=>{
//!   console.log(results[0].sol);
//! }).catch((err)=>{
//!   console.log(err);
//! })
//!callback syntax
//! pool.query(queryTxt, function(err, result, fields){
//!     if(err) throw error;
//!     ...do something...
//! });
pool.getConnection((err, connection) => {
    if (err) {
        if (err.code === 'PROTOCOLE_CONNECTION_LOST')
            console.error('Database connection was closed');
        if (err.code === 'ER_CON_COUNT_ERROR')
            console.error('Database has too many connections');
        if (err.code === 'ECONNREFUSED')
            console.error('Dababase Connection was refused');
    }
  
    for(const [key, queryTxt] of Object.entries(tablesObj)){
        connection.query(queryTxt, function(err, result, fields){
             if(err) throw new Error(err);
             console.log( `Table ${key} has been created.\n`);
             connection.release();
        });
    }
})










