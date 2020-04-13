const fs = require('fs')
const data = fs.readFileSync('dummy.json')
const tables = JSON.parse(data)
const axios = require('axios')
const pool = require('../config/pool')

//all the funcitons to get the data from DB

//fetch all photos
const fetchAllPhotos = async ()=>{
    try{
        let query = 'SELECT photo_path from photos'
        let res = await pool.query(query)
        let photo_path = []
        photo_path = res.map((photo)=> photo.photo_path)
        //console.log(photo_path[0])
        return(photo_path)
    }catch(e){
        return('Error in FetchAllPphotos ' + e)
    }
}

//fetch all users except the person himself
const fetchUsersPhotos = async(userId)=>{
    try{
        let query = `SELECT users.id, users.name, users.age, users.city,users.sex, users.sex_orient, users.geo_loc,  photos.user_id, photos.photo_path \
                    FROM users\
                    LEFT JOIN photos\
                    ON users.id = photos.user_id\
                    WHERE photos.is_profile = true AND users.id != ${userId}`
        let res = await pool.query(query)
        //let users = res.map((user)=> user)
        //console.log(res[0])
        //console.log(users[0])
        return(res)
    }catch(e){
        return('Error in fetchUserPhotos ' + e)
    }
}

/******************************filter first page/preference user **************/
//filter users

const sexOrienAgeFilter = async (sex, orient, ages)=>{
    try{
        let min_age = ages[0]
        let max_age = ages[1]
        if(sex !== ''){
            let query = `SELECT users.id, users.name, users.city, users.sex, users.sex_orient, users.age
            FROM users WHERE users.sex = '${sex}' && users.sex_orient = '${orient}'
            && users.age >= ${min_age} && users.age <= ${max_age}`
            let res = await pool.query(query)
            return res
        }else{
            let query = `SELECT users.id, users.name, users.city, users.sex, users.sex_orient, users.age
            FROM users WHERE users.sex_orient = '${orient}'
            && users.age >= ${min_age} && users.age <= ${max_age}`
    let res = await pool.query(query)
    return res
        }

    }catch(e){
        return('Error in sexOrienAgeFilter '+ e)
    }
}
//filter distance after the sexorientage filter and return the UserId, matchesPersonId, and distance
const distanceCalculator = async(userId, otherId, distance)=>{
    try{
        let query = `SELECT ST_Distance_Sphere(
                        (SELECT geo_loc FROM users WHERE users.id = ${userId}),
                        (SELECT geo_loc FROM users WHERE users.id = ${otherId})
                    ) AS distance`
        let res = await pool.query(query)
        if(res[0].distance < distance * 1000)
            return {
                userId,
                otherId,
                distance : Math.round(res[0].distance)
            }
    }catch(e){
        return('Error in distanceCalculator ' + e)
    }
}

//filter distance after the sexorientage filter and return the UserId, matchesPersonId, and distance
const findMatchedUsers = async ({userId, sex, orient, ages, distance})=>{
    try{
        let results = []
        let others = await sexOrienAgeFilter(sex, orient, ages)
        for(let i= 0; i<others.length; i++){
            let result = await distanceCalculator(userId,others[i].id, distance )
            if(result)
                results.push(result)
        }
        //console.log(results)
        return results
    }catch(e){
        return('Error in findMatchedUsers ' + e)
    }
}
//get all information except distance from the mached persons
const fetchFilter = async(otherId)=>{
    let query = `SELECT users.name, users.city, users.sex, users.sex_orient, users.age, photos.photo_path \
                FROM users \
                LEFT JOIN photos \
                ON users.id = photos.user_id \
                WHERE users.id = ${otherId} && photos.is_profile` 
    let res = await pool.query(query)
    return res
}


//fetchPhotos and put the photo_path inside the filterUsers and get it at front
const filterUsers = async(conditions)=>{
    let matches = await findMatchedUsers(conditions)
    let filters = []
    for(let i=0; i<matches.length; i++){
        let info_res = await fetchFilter(matches[i].otherId)
        let info = info_res[0]
        filters[i] = Object.assign(matches[i], info)
        console.log(`filters ${i}`)
        console.log(filters[i])
    }

    return filters
}


function getCriterias(reqbody){
    let {userId} = reqbody
    let sex = reqbody.sexdata
    let orient = reqbody.orientdata
    let ages = [reqbody.fromdata, reqbody.toAge]
    let distance = reqbody.distancedata
    return {userId, sex, orient,ages, distance}
}
/*
let conditions =  {
    userId : 2,
    sex : 'woman',
    orient : 'gay',
    ages : [18, 35],
    distance : 5
}  
*/
//filterUsers(conditions)
exports.fetchAllPhotos = fetchAllPhotos
exports.fetchUsersPhotos = fetchUsersPhotos
exports.filterUsers = filterUsers
exports.getCriterias = getCriterias