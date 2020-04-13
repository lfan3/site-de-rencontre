const pool = require('../config/pool')
const fs = require('fs')
const dummy = JSON.parse(fs.readFileSync('./dummy.json'))

//datas
const users = dummy.users
const logins = dummy.logins
const photos = dummy.images
const tags = dummy.tags

//create queries functions
var usersQuery = ()=>{
    let len = users.length
    let query = `INSERT INTO users (name, age, sex, sex_orient, geo_loc, city) VALUES `
    
    for(let i=0; i<len; i++){
        if(i < len - 1){
            query += `('${users[i].name}', ${users[i].age}, '${users[i].sex}', '${users[i].sex_orient}', ST_GeomFromText('POINT(${users[i].lat} ${users[i].lon})', 4326), '${users[i].city}'),`
        }else{
            query += `('${users[i].name}', ${users[i].age}, '${users[i].sex}', '${users[i].sex_orient}', ST_GeomFromText('POINT(${users[i].lat} ${users[i].lon})', 4326), '${users[i].city}')`
        }
    }
    return query
}

function tagsQuery(){
    let len = tags.length
    let query = 'INSERT INTO tags (tag) VALUES '
    for(let i=0; i<len; i++){
        if(i < len -1){
            //mistake : forget ' ' around ${}
            query += `('${tags[i]}'),`
        }else{
            query += `('${tags[i]}')`
        }
    }
    return query
}

function photosQuery(){
    let len = photos.length
    let query = 'INSERT INTO photos (photo_path, is_profile, user_id) VALUES '
    for(let i=0; i<len; i++){
        if(i < len -1){
            //mistake : forget ' ' around ${}
            query += `('${photos[i].photo_path}', ${photos[i].is_profile}, ${photos[i].user_id + 1}),`
        }else{
            query += `('${photos[i].photo_path}', ${photos[i].is_profile}, ${photos[i].user_id + 1})`
        }
    }
    return query
}

function loginsQuery(){
    let len = logins.length
    let query = 'INSERT INTO logins (login, email, password, tocken, is_verified, user_id) VALUES '
    for(let i=0; i<len; i++){
        if(i < len -1){
            //mistake : forget ' ' around ${}
            query += `('${logins[i].login}', '${logins[i].email}', '${logins[i].password}', '${logins[i].tocken}', ${logins[i].is_verified}, ${logins[i].user_id + 1}),`
        }else{
            query += `('${logins[i].login}', '${logins[i].email}', '${logins[i].password}', '${logins[i].tocken}', ${logins[i].is_verified}, ${logins[i].user_id + 1})`
        }
    }
    return query
}


//fill tables queries
const user_query = usersQuery()
const tags_query = tagsQuery()
const logins_query = loginsQuery()
const photos_query = photosQuery()

async function fill_users_func(){
    try{

        await pool.query(user_query)
        console.log('users is ok')
    }catch(e){
        console.log('error in users ' + e)
    }
}

async function fill_photos_func(){
    try{
        await pool.query(photos_query)
        console.log('photos is ok')
    }catch(e){
        console.log('error in photos ' + e)
    }
}

async function fill_logins_func(){
    try{
        await pool.query(logins_query)
        console.log('logins is ok')
    }catch(e){
        console.log('error in logins ' + e)
    }
}

async function fill_tags_func(){
    try{
        await pool.query(tags_query)
        console.log('tags is ok')
    }catch(e){
        console.log('error in tags ' + e)
    }
}
/* user table must be created firstly, as photos hava a foreign key reference to users
did not solve the order probmes
*/
async function fillAllTables(){
    await fill_users_func()
    let promises = [fill_photos_func(), fill_logins_func(), fill_tags_func()]
    Promise
        .all(promises)
}

fillAllTables()
