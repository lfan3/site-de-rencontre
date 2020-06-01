//creat a long lat table, and insert data inside and then calculte the distance of them
const pool = require('../config/pool')
const util = require('util')
//we have two ways to do with ip-lat-long position
//api like IP-API, we need just longi and lati
//or from mysql, there are also two ways in mysql (geo function) or stock lat and long as float
var Geo = "CREATE TABLE IF NOT EXISTS geo (\
    id INT NOT NULL AUTO_INCREMENT,\
    geo_loc GEOMETRY NOT NULL,\
    PRIMARY KEY (id)\
);"

pool.query = util.promisify(pool.query)

async function createGeo(){
    try{
        let result = await pool.query(Geo)
        console.log(result)
        console.log('geo is created')
    }catch(e){
        console.log('Error '+ e)
    }   
}

//createGeo()

function getGeoDatas(){
    let points = []
    let query =  "INSERT INTO `geo`(`geo_loc`) VALUES\
    (ST_GeomFromText('POINT(0.09000 0.18000)', 4326)),\
    (ST_GeomFromText('POINT(0.18000 0.36000)', 4326)),\
    (ST_GeomFromText('POINT(0.27000 0.54000)', 4326));"
    pool.query(query)

//    point lati longi
//    SET @p := ST_GeomFromText('POINT(33.9434 -118.4079 )',4326);
//SET @t := ST_GeomFromText('POINT(49.0083 2.5559)', 4326);
//SELECT
//	ST_DISTANCE_Sphere(@p, @t) AS distance;
}

async function distance(){
    //mistake: need () for the two geo_loc
    let query = 'SELECT ST_Distance_Sphere( \
        (SELECT geo_loc FROM users WHERE id = 1),\
        (SELECT geo_loc FROM users WHERE id = 2)\
    ) AS distance;'
    let res = await pool.query(query)
    let distance = res[0]
    console.log(res)
    console.log(distance)
}



distance()
