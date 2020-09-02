const {pool} = require('../../config/pool')
const fs = require('fs')
const users = JSON.parse(fs.readFileSync('../dummy_datas/dummy_user.json'))
const photos = JSON.parse(fs.readFileSync('../dummy_datas/dummy_avatars_all.json'))
const logins = JSON.parse(fs.readFileSync('../dummy_datas/dummy_login.json'))
const tags = JSON.parse(fs.readFileSync('../dummy_datas/dummy_tags.json'))
const descrip = require('../dummy_datas/dummy_texts')
//datas from big_dummy seperate files

//create queries functions
var usersQuery = ()=>{
    let len = users.length
    let query = `INSERT INTO users (name, birthday, sex, sex_orient, geo_loc, city, login_id) VALUES `
  
    
    for(let i=0; i<len; i++){
        if(i < len - 1){
            query += `("${users[i].name}", "${users[i].birthday}", "${users[i].sex}", "${users[i].sex_orient}", ST_GeomFromText('POINT(${users[i].lat} ${users[i].lon})', 4326), "${users[i].city}", ${users[i].login_id + 1}),`
        }else{
            query += `("${users[i].name}", "${users[i].birthday}", "${users[i].sex}", "${users[i].sex_orient}", ST_GeomFromText('POINT(${users[i].lat} ${users[i].lon})', 4326), "${users[i].city}", ${users[i].login_id + 1})`
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
            query += `("${photos[i].photo_path}", ${photos[i].is_profile}, ${photos[i].user_id + 1}),`
        }else{
            query += `("${photos[i].photo_path}", ${photos[i].is_profile}, ${photos[i].user_id + 1})`
        }
    }
    return query
}

function loginsQuery(){
    let len = logins.length
    let query = 'INSERT INTO logins (login, email, password, tocken, is_verified) VALUES '
    for(let i=0; i<len; i++){
        if(i < len -1){
            //mistake : forget ' ' around ${}
            query += `('${logins[i].login}', '${logins[i].email}', '${logins[i].password}', '${logins[i].tocken}', ${logins[i].is_verified}),`
        }else{
            query += `('${logins[i].login}', '${logins[i].email}', '${logins[i].password}', '${logins[i].tocken}', ${logins[i].is_verified})`
        }
    }
    return query
}

function loginTagQuery(){
 
    let query = 'INSERT INTO logins_tags(tag_id, login_id) VALUES '
    for(let i=0; i<3000; i++){
        let tagId = Math.floor(Math.random() * 199)+1
        let loginId = Math.floor(Math.random() * 519)+1
        if(i<2999)
            query += `(${tagId} ,${loginId} ),`
        else
            query += `(${tagId} ,${loginId} )`
        //console.log(i)
    }
    return query
}

function likeQuery(){
 
    let query = 'INSERT INTO likes(userA_id, userB_id) VALUES '
    for(let i=0; i<5000; i++){
        let userId = Math.floor(Math.random() * 519)+1
        let userId2 = Math.floor(Math.random() * 519)+1
        if(i<4999)
            query += `(${userId2} ,${userId} ),`
        else
            query += `(${userId2} ,${userId} )`
        //console.log(i)
    }
    return query
}

function descriptQuery(){
    let query = 'INSERT INTO profiletext(descrip, user_id) VALUES '
    for(let i=0; i<520; i++){
        if(i<519)
            query += `("${descrip}" ,${i+1}),`
        else
            query += `("${descrip}" ,${i+1})`
        //console.log(i)
    }
    return query
}

//const query = descriptQuery()
//console.log(query)
//fill_user_tag_func(userTagQuery())

async function fill_users_func(user_query){
    try{

        await pool.query(user_query)
        console.log('users is ok')
    }catch(e){
        console.log('error in users ' + e)
    }
}

async function fill_photos_func(photos_query){
    try{
        await pool.query(photos_query)
        console.log('photos is ok')
    }catch(e){
        console.log('error in photos ' + e)
    }
}

async function fill_logins_func(logins_query){
    try{
        await pool.query(logins_query)
        console.log('logins is ok')
    }catch(e){
        console.log('error in logins ' + e)
    }
}

async function fill_tags_func(tags_query){
    try{
        await pool.query(tags_query)
        console.log('tags is ok')
    }catch(e){
        console.log('error in tags ' + e)
    }
}

async function fill_login_tag_func(login_tag_query){
    try{
        await pool.query(login_tag_query)
        console.log('login_tag is ok')
    }catch(e){
        console.log('error in user_tag ' + e)
    }
}

async function fill_likes_func(likes_query){
    try{
        await pool.query(likes_query)
        console.log('likes is ok')
    }catch(e){
        console.log('error in likes ' + e)
    }
}

async function fill_descript_func(descrip_query){
    try{
        await pool.query(descrip_query)
        console.log('decript is ok')
    }catch(e){
        console.log('error in descript func '+e)
    }
}


async function fillAllTables(){
    await fill_logins_func(loginsQuery())
    let promises1 = [fill_users_func(usersQuery()), fill_tags_func(tagsQuery())]
    await Promise.all(promises1)

    let promises2 = [fill_photos_func(photosQuery()), fill_login_tag_func(loginTagQuery()), fill_likes_func(likeQuery()), fill_descript_func(descriptQuery())]
    await Promise.all(promises2)
}
//! two parts of data to setup
//! csvToMysql.js setup arrondissemnts datas/tables
//! vill_france_free.sql setup the all the cities data.

fillAllTables();
//fill_login_tag_func(loginTagQuery())

