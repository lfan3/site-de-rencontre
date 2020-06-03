const {pool, promisePool} = require('../config/pool')
const Errors = require('../errors')
const {formDateFormat,
        reducerTags,
        filterTags,
        getFinalCity,
} = require('./BQApi_helpers')
const {valideEmailReg, validePassReg} = require('./RegexValidator')
const bcrypt = require('bcrypt')
//var util = require('util')
//
//bcrypt.compare = util.promisify(bcrypt.compare)

//! match_question part
async function insertMatchQuestion(questionsObj){
    
}
//! basic question part
const dummyuserData = {
    login_id: 512,
    name: 'ja  ms',
    arronds: "1er Ardt",
    city: "Paris",
    day: 1,
    gender: "woman",
    index: 5,
    position: {lat: 48.784852199999996, lon: 2.3944554},
    month: 1,
    newTags: ["#adventure", "#great", "mosaic"],
    orient: "straight",
    tag: "",
    year: 2002,
}

//???? what is the best way to organise my db request logic?
//TODO0-1 Othres api error handling -not yet
//! user information from basicQuestion.js

async function getNewTagsObj(newTags, reducerTags){
    try{
        let tagsObj = await getAllTags(0)
        let oldTags = tagsObj.map((tagObj)=>tagObj.tag)
        let branlyNewTags = filterTags(reducerTags, newTags, oldTags, 1)
        let oldTagsFromNew = filterTags(reducerTags, newTags, oldTags, 0)
        return {branlyNewTags, oldTagsFromNew}
    }catch(err){
        //*router can get only the error from catch block
        throw new Error('getNewTags Error: ' + err)
    }
}
async function insertTag(newTags){
    try{
        let tagsObj = await getNewTagsObj(newTags, reducerTags)
        let tags = tagsObj.branlyNewTags
        if(tags.length){
            let values = ''
            for(let i=1; i< tags.length - 1; i++){
                values += `('${tags[i]}'),`
            }
            values += `('${tags[tags.length-1]}')`
            let query = `INSERT INTO tags(tag) VALUES ${values}`
            await pool.query(query)
        }else{
            console.log('no new tag in inserTag')
        }
    }catch(e){
        throw new Error('insertTag of api Error: '+e)
    }
}

//!multiply queries
async function insertLoginTag(newTags, login_id){
    let queries = []
    let ids = []
    //get all newTags id, then insert into logins_likes
    for(let i=0; i<newTags.length; i++)
        queries[i] = `SELECT id FROM tags WHERE tag = '${newTags[i]}'`
    queries.forEach((q)=>console.log(q))
    //pool.getConnection = util.promisify(pool.getConnection)
    //const connection = await pool.getConnection()
    const connection = await promisePool.getConnection()

    try{
        await connection.beginTransaction();
        for(let i=0; i<queries.length; i++){
            ids[i] = await connection.query(queries[i])
            await connection.query((`INSERT INTO logins_tags(login_id, tag_id)VALUES(${login_id}, ${ids[i][0][0]['id']})`))
        }
        await connection.commit()
    }catch(e){
        await connection.rollback()
        throw new Error('insertLoginTag Error '+e)
    }
    finally{
        await connection.release()
    }
    return ids
}

async function insertNewUser(userData){
    try{
        const {login_id, name, arronds, city, position, day, month, year,gender,newTags, orient} = userData
        
        let date = new Date(formDateFormat(year, month, day))
        console.log(date)
        let birthMysql = date.toISOString().slice(0,10)
        let finalcity = await getFinalCity(position, city, arronds)
        //!no , in ST_GEOMFROMTEXT, remember immer " "
        let query = `INSERT INTO users (name, birthday, sex, sex_orient, geo_loc, city, login_id)\
                     VALUES("${name}","${birthMysql}","${gender}","${orient}", \
                            ST_GeomFromText('POINT(${position.lat} ${position.lon})',4326),\
                            "${finalcity}", "${login_id}")`
                            console.log(query)
        pool.query(query)
        //*inster tags
        await insertTag(newTags)
        await insertLoginTag(newTags, login_id)
    }catch(e){
        console.log('insertNewUser Error' + e)
        if(e instanceof Errors.NotFound)
            throw new Errors.NotFound(e.message)
        throw new Error('Error from insertNewUser')
    }
}

//insertNewUser(userData)

async function getAllTags(order){
    try{
        let query = ''
        if(order == 1)
            query = 'SELECT tag FROM tags ORDER BY tag'
        else
            query =  'SELECT tag FROM tags'
        let tags = await pool.query(query)
        //* allow to see clearly where is the error, this error will be soon captured by the catch(e)
        if(!tags.length)
            throw new Errors.NotFound('tag not found tags')
        return(tags)

    }catch(err){
        //*router can get only the error from catch block
        console.log('getAllTags Error' + err)
        if(err instanceof Errors.NotFound){
            throw new Errors.NotFound(err.message)
        }else{
            throw new Error('normal error' + err)
        }
    }
}
//getAllTags(1).then(res=>console.log(res))
async function getFrenchCities(){
    try{
        let query = 'SELECT ville_nom FROM villes_france_free \
                        WHERE ville_population_2012>30000\
                        ORDER BY ville_nom'
        let cities = await pool.query(query)
        if(!cities.length)
            throw new Errors.NotFound('cities are not found')
        return(cities)
    }catch(e){
        console.log('getFrenchCities error ' +e )
        if(e instanceof Errors.NotFound){
            throw new Errors.NotFound(e.message)
        }else{
            throw new Error(e)
        }
    }
}

async function getArrondParis(){
    try{
        let query = 'SELECT l_ar FROM arrondissements'
        let arronds = await pool.query(query)
        if(!arronds.length)
            throw new Errors.NotFound("l'arrondissements are not found")
        return (arronds)
    }catch(e){
        console.log('getArrondParis Error '+e)
        if(e instanceof Errors.NotFound)
            throw new Errors.NotFound(e.message)
        else
            throw new Error(e)
    }
}
//! setting photos api
async function getUserPhotos(userId){
    try{
        let query = `SELECT photo_path, is_profile from photos WHERE user_id = ${userId}`
        let res = await pool.query(query)
        return(res)
    }catch(e){
        console.log('getUserPhoto Error ' + e)
    }
}

async function changeProfilePhoto(userId){
    try{
        let query = `UPDATE photos SET is_profile = 0 WHERE user_id = ${userId}`
        await pool.query(query)
    }catch(e){
        console.log('changeProfilePhoto Error '+e)
    }
}
async function updateAvatar(userId, imagePath){
    try{
        await changeProfilePhoto(userId)
        let query = `UPDATE photos SET is_profile = 1 WHERE user_id = ${userId} AND photo_path="${imagePath}"`
        await pool.query(query)
        console.log('inside updataAvatar')
        console.log(query)
    }catch(e){
        console.log('changeProfilePhoto Error '+e)
    }
}
async function sendPhoto(imagePath, userId, is_profile){
    try{
        console.log('in send photo', userId, is_profile)

        if(is_profile){
            await changeProfilePhoto(userId)
        }
        let query = `INSERT INTO photos(photo_path, is_profile, user_id) VALUES("${imagePath}", ${is_profile}, ${userId})`
        await pool.query(query)
    }catch(e){
        console.log('sendPhoto erro '+e)
    }  
}
/************************socket send messages to DB********* */
/* mysql synthas proble
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
    //! VALUES KEY WORKD
    let query = `INSERT INTO messages (user_id, message, time) VALUES ${values}`
    try{
        pool.query(query)
    }catch(e){
        console.log('error in sendMessages '+e)
    }
}
*/
const getMessagesFromRoom = async(room)=>{
    let query = `SELECT user_id, message Frome messages Where room = ${room} LIMIT 20`
}

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

/***********************signUp API + signIn API****************************
 * email verification to confirme the subscription 
 * change is_verified of login to 1
 
**************************************************************************/

async function emailIsVerified(data){
    try{
        let {email, tocken} = data
        let query = "SELECT email FROM `logins` WHERE tocken = ? AND email=?"
        let result = await pool.query(query, [tocken, email])
        if(!result.length)
            throw new Errors.NotFound('email is not verified')
        else{
            let query2 = `UPDATE logins SET is_verified = 1 WHERE email = '${email}'`
            await pool.query(query2)
        }
        return true
    }catch(e){
        if(e instanceof Errors.NotFound)
            throw new Errors.NotFound(e.message)
        else{
            throw new Error('emailIsVerified error '+e)
        }
    }
}
//todo signup input validation
async function signInVerification(data){
    try{
        console.log(data)
        let {email, password} = data
        if(valideEmailReg.test(email) && validePassReg.test(password)){
            let query = `SELECT id, email, password FROM logins WHERE email= ?` 
            let res = await pool.query(query, [email])
            if(!res)
                throw new Errors.NotFound('signInVerification is not verified')
            let result = await bcrypt.compare(password, res[0].password)
            if(result)
                return res[0].id
            else
                return false
        }else{
            throw new Error('signInverification Error '+e)
        }
    }catch(e){
        if(e instanceof Errors.NotFound)
            throw new Errors.NotFound(e.message)
        else
            throw new Error('signInverification Error '+e)
    }
}
//signInVerification({ email: 'korosab626@qortu.com', password: 'Aa123@' })
//.then(res=>console.log(res))
let data = {
    confirm: false,
    email: 'korosab626@qortu.com',
    tocken: '2Exa9ltkrm1wRxxv8wXZ3jWlNvnUAvba'
}
/*
var hashpass = async (pass) => {
    try{
        let hash = await bcrypt.hash(pass, 10);
        return hash;
    }catch(err){
        console.log(`Error in hashpass ${err}`)
    }
}
let hash = hashpass('A')
*/
exports.emailIsVerified = emailIsVerified
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
exports.sendPhoto =  sendPhoto
exports.getUserPhotos = getUserPhotos
exports.updateAvatar = updateAvatar
exports.getAllTags = getAllTags
exports.getFrenchCities = getFrenchCities
exports.getArrondParis = getArrondParis
exports.insertNewUser = insertNewUser
exports.signInVerification = signInVerification
