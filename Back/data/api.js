const pool = require('../config/pool')
/************************socket send messages to DB********* */
let ms = [
    {userA : 1, txt:'nice', time:'1'},
    {userA : 2, txt:'nice', time:'1'},
    {userA : 3, txt:'nice', time:'1'}
]
const sendMessages = async(msmArray)=>{
    let values = ''
    let len = msmArray.length
    for(let i=0; i<len; i++){
        let {userA, txt, time}=msmArray[i]
        if(i < len - 1)
            values += `(${userA}, ${txt}, ${time}),`
        else
            values += `(${userA}, ${txt}, ${time})`
    }
    let query = `INSERT INTO messages (user_id, message, time) ${values}`
    try{
        pool.query(query)
    }catch(e){
        console.log('error in sendMessages '+e)
    }
}

const getMessagesFromRoom = async(room)=>{
    let query = `SELECT user_id, message Frome messages Where room = ${room} LIMIT 20`
}

sendMessages(ms)
/************************LIKE BUTTON Api **********************/
const fetchMutualLikes = async(userA) =>{
    try{
        let query = `SELECT * FROM mutuallike WHERE (user_a=${userA}) OR (user_b=${userA})`
        let res = await pool.query(query)
        console.log(res)
        if(!res[0])
            return false
        return res
    }catch(e){
        console.log('fetchMutualdata Error '+ e )
    }
}
const checkMutualLike = async(userA, userB)=>{
    try{
        let query = `SELECT * FROM mutuallike WHERE (user_a=${userA} AND user_b=${userB}) OR (user_a=${userB} AND user_b=${userA})`
        let res = await pool.query(query)
        if(!res[0])
            return false
        return {mutual : true, room : res[0].room}
    }catch(e){
        console.log('checkMutualLike error '+e)
    }
}

//checkMutualLike(518, 288).then((res)=>console.log(res))
const double_like_verif = async (userA, userB)=>{
    try{
        let queryA = `SELECT * FROM singlelike WHERE user_a = ${userB} AND user_b = ${userA}`
        let queryB = `SELECT * FROM singlelike WHERE user_a = ${userA} AND user_b = ${userB}`
        let resA = await pool.query(queryA)
        let resB = await pool.query(queryB)
        if(resA[0] && resB[0]){
            return true
        }
        return false
    }catch(e){
        console.log('like_verif error ' +e)
    }
}

const addSingleLike = async(userA, userB)=>{
    try{
        let query = `INSERT INTO singlelike(user_a, user_b) VALUES(${userA}, ${userB})`
        await pool.query(query)
    }catch(e){
        console.log('addSingleLike Error' + e)
    }
}

const addMutualLike = async(userA, userB)=>{
    try{
        let query = `INSERT INTO mutuallike(user_a, user_b, room) VALUES(${userA}, ${userB}, ${userA}${userB})`
        let res = await pool.query(query)
        //console.log(res)
    }catch(e){
        console.log('addMutualLike Error '+e)
    }
}

const insertLike = async(userA, userB)=>{
    //chang to double
    await addSingleLike(userA, userB)
    let juger = await double_like_verif(userA, userB)
    if(juger === true){
        addMutualLike(userA, userB)
        return('two')
    }
    return('one')
}

const deleteMutualLike = async(userA, userB)=>{
    try{
        let query = `DELETE FROM mutuallike WHERE (user_a =${userA} AND user_b=${userB}) OR (user_a=${userB} AND user_b=${userA})`
        await pool.query(query)
    }catch(e){
        console.log('error in deletMutuallike '+e)
    }
}

const deleteSingleLike = async(userA, userB)=>{
    try{
        let query = `DELETE FROM singlelike WHERE user_a =${userA} AND user_b=${userB}`
        await pool.query(query)
    }catch(e){
        console.log('error in deletSingleLike '+e)
    }
}

const unmachted = async (userA, userB)=>{
    console.log('unmachted in api')
    try{
        deleteSingleLike(userA, userB)
        deleteMutualLike(userA, userB)
        return (true)
    }catch(e){
        console.log('error in unmachted ' + e)
    }
}

/************************Profile Page Api **********************/
//fetch user's tags_id from his id
const fetchUserTagIds = async (userId)=>{
    try{
        let query = `SELECT tag_id from users_tags WHERE user_id =${userId}`
        let res = await pool.query(query)
        if(res[0]){
            let tagIds = res.map((each)=>each.tag_id)
            return tagIds
        }else{
            console.log('fetchUserTagIds no tagsId')
        }
    }catch(e){
        return('Error in fetchUserTagIdS' + e)
    }
}
//fetchUserTagIds(258).then((res)=>console.log(res))
//fetch user's tag from tag_id
const fetchUserTag = async (tagId)=>{
    try{
        let query = `SELECT tag from tags WHERE id =${tagId}`
        let res = await pool.query(query)
        return res[0].tag
    }catch(e){
        return('Error in fetchUserTagS' + e)
    }
}

//fetch user's tagS 
const fetchUserTags = async (tagId)=>{
    try{
        let tags = []
        let tagIds = await fetchUserTagIds(tagId)
        let len = tagIds.length
        for(let i=0; i <len; i++){
            tags[i] = await fetchUserTag(tagIds[i])
        }
        return tags
    }catch(e){
        return('Error in fetchUserTagS' + e)
    }
}

//fetchUserTags(258).then((res)=>console.log(res))
//fetch user's photos from his id
const fetchUserPhotos = async (userId)=>{
    try{
        let query = `SELECT photo_path, is_profile from photos WHERE user_id =${userId}`
        let res = await pool.query(query)
        return res
    }catch(e){
        return('Error in fetchUserPhotos' + e)
    }
}
//fetchUserPhotos(285).then((res)=>console.log(res))
//fetch oneUser and get his information, return an Object of user information
const fetchUserFromId = async (userId)=>{
    try{
        let query = `SELECT * from users WHERE id =${userId}`
        let res = await pool.query(query)
        if(res[0])
            return res[0]
        console.error('the user does not exist from fetchUserFromId')
    }catch(e){
        return('Error in fetchUserFromId' + e)
    }
}

//fetchUserFromId(285).then((res)=>console.log(res))

//fetch user description, return an array, res[0] is an object
const fetchUserDescription = async (userId)=>{
    try{
        let query = `SELECT descrip FROM profiletext WHERE user_id = ${userId}`
        let res = await pool.query(query)
        return res[0]
    }catch(e){
        return('Error in fetchuserDescription '+e)
    }
}
//fetchUserDescription(285).then((res)=>console.log(res))

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
const fetchOtherPhotos = async(userId)=>{
    try{
        let query = `SELECT users.id, users.name, users.birthday, users.city,users.sex, users.sex_orient, users.geo_loc,  photos.user_id, photos.photo_path \
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

const sexOrienAgeFilter = async (userId,sex, orient, ages)=>{
    try{
        let min_age = ages[0]
        let max_age = ages[1]
     
        if(sex !== 'all'){
            let query = `SELECT id, name, city, sex, sex_orient, age FROM(
                SELECT id, name, city,sex, sex_orient, FLOOR(DATEDIFF(CURRENT_DATE, (SELECT birthday))/365) AS age
                FROM users) AS detrive_tab  WHERE id != '${userId}' && sex = '${sex}' && sex_orient = '${orient}'
                && age >= ${min_age} && age <= ${max_age}`
            let res = await pool.query(query)
            return res
        }else{
            let query = `SELECT id, name, city, sex, sex_orient, age FROM (
                SELECT id, name, city, sex, sex_orient, FLOOR(DATEDIFF(CURRENT_DATE, (SELECT birthday))/365) AS age
                FROM users) AS detrive_tab WHERE sex_orient = '${orient}'
                && age >= ${min_age} && age <= ${max_age}`
            let res = await pool.query(query)
            return res
        }

    }catch(e){
        return('Error in sexOrienAgeFilter '+ e)
    }
}

//sexOrienAgeFilter('women','gay',[21, 45]).then((res)=>console.log(res))

//filter distance after the sexorientage filter and return the UserId, matchesPersonId, and distance
const distanceCalculator = async(userId, otherId, distance)=>{
    try{
        let query = `SELECT ST_Distance_Sphere(
                        (SELECT geo_loc FROM users WHERE users.id = ${userId}),
                        (SELECT geo_loc FROM users WHERE users.id = ${otherId})
                    ) AS distance`
        let res = await pool.query(query)
  // !!!!!! need to change to 1000
        if (res[0].distance < (distance * 1000) && distance !== 500){
            return {
                userId,
                otherId,
                distance : Math.round(res[0].distance)
            }
        }
        else if(distance === 500){
            return {
                userId,
                otherId,
                distance : 'over 500km'
            }
        }
    }catch(e){
        return('Error in distanceCalculator ' + e)
    }
}

//filter distance after the sexorientage filter and return the UserId, matchesPersonId, and distance
const findMatchedUsers = async ({userId, sex, orient, ages, distance})=>{
    try{
        let results = []
        let others = await sexOrienAgeFilter(userId, sex, orient, ages)
            for(let i= 0; i<others.length; i++){
                let result = await distanceCalculator(userId,others[i].id, distance )
                if(result)
                    results.push(result)
            }
            return results
    }catch(e){
        return('Error in findMatchedUsers ' + e)
    }
}
//get all information except distance from the mached persons
const fetchFilter = async(otherId)=>{
    try{
    let query = `SELECT users.id, users.name, users.city, users.sex, users.sex_orient, users.birthday, photos.photo_path \
                FROM users \
                LEFT JOIN photos \
                ON users.id = photos.user_id \
                WHERE users.id = ${otherId} && photos.is_profile` 
    let res = await pool.query(query)
    if(res[0] !== undefined){
        let year = res[0].birthday
        //birthtime and now are UTC time, wee need to convert the UTC time with Date instance inorder to user getUTCFullYear
        let birthtime = year.getTime()
        let now = Date.now()
        let diff = new Date(now - birthtime)
        let age = diff.getUTCFullYear() - 1970
        let info = {
            id : res[0].id,
            name : res[0].name,
            city : res[0].city,
            sex : res[0].sex,
            sex_orient : res[0].sex_orient,
            age,
            photo_path : res[0].photo_path
        }
        return info
    }
  }catch(e){
        console.log('error in fetchFIlter ' + e)
    }
}
//fetchFilter(1)

//fetchPhotos and put the photo_path inside the filterUsers and get it at front
const filterUsers = async(conditions)=>{
    let matches = await findMatchedUsers(conditions)
    let filters = []
    for(let i=0; i<matches.length; i++){
        let info = await fetchFilter(matches[i].otherId)
        filters[i] = Object.assign(matches[i], info)
    }
    return filters
}


function getCriterias(reqbody){
    let {userId} = reqbody
    let sex = reqbody.sexdata
    let orient = reqbody.orientdata.toLowerCase()
    if(orient === 'bisexual')
        orient = 'bi'
    let ages = [reqbody.fromdata, reqbody.toAge]
    let distance = reqbody.distancedata
    return {userId, sex, orient,ages, distance}
}

let conditions = 
{
    userId: 66,
    sex: 'woman',
    orient: 'gay',
    ages: [ 17, 99 ],
    distance: 300
}/*
let conditions = 
{
    userId: 66,
    sex: 'woman',
    orient: 'gay',
    ages: [ 17, 99 ],
    distance: 300
  }
  
  */


//filterUsers(conditions)
//findMatchedUsers(conditions)

exports.fetchAllPhotos = fetchAllPhotos
exports.fetchOtherPhotos = fetchOtherPhotos
exports.filterUsers = filterUsers
exports.getCriterias = getCriterias
exports.fetchUserFromId = fetchUserFromId
exports.fetchUserPhotos = fetchUserPhotos
exports.fetchUserTags = fetchUserTags
exports.fetchUserDescription = fetchUserDescription
exports.fetchMutualLikes = fetchMutualLikes
exports.addMutualLike = addMutualLike
exports.insertLike = insertLike
exports.checkMutualLike = checkMutualLike
exports.unmachted = unmachted
