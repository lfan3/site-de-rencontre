const express = require('express')
const router = express.Router()
const signUp = require('./email/signUp').signUp
const fetchAllPhotos = require('./data/api').fetchAllPhotos
const {
    filterUsers, 
    fetchUsersPhotos, 
    getCriterias, 
    fetchUserFromId, 
    fetchUserPhotos,
    fetchUserTags,
    fetchUserDescription,
    fetchMutualLikes,
    insertLike,
    checkMutualLike,
    unmachted
    } = require('./data/api')


router.get('/', (req, res)=>{
    res.send("Soket ")
})
router.post('/signup', signUp)
router.get('/signin', (req, res)=>{
    console.log('inside the signin get callback function')
    //console.log(req.sessionID)
    //res.send('env ' + process.env.CLOUD_NAME)
    res.send('singin')
})
router.get('/logout', (req, res)=>{
    req.session.destroy()
    res.send('distroy')
})
router.post('/session', (req, res)=>{
    console.log('inside /session post')
    console.log(req.body.data)
    req.setTimeout(0)
    //res.send(req.session.userId)
    res.send({data : 'ok from server'})
})
/***main page */
router.post('/main', (req, res)=>{
    //const results = fetchAllPhotos()
    let userId = req.body.userId
    const results = fetchUsersPhotos(userId)
    console.log(req.body)
    results.then(users => {      
        //send an array
        res.send(users)
    })
})
//test next 3 function
let foo = ()=> new Promise((res)=>{
    setTimeout(() => res('foo'), 200);
})
async function fifi(){
    let users = await foo()
    console.log(users)
}
router.post('/filterUsers', async(req, res)=>{
    let conditions = getCriterias(req.body)
    console.log('inside filterUsers')
    let users = await filterUsers(conditions)
    //let users = await fetchUserFromId(22)
    //setTimeout(foo().then((res)=>res.send('ok')), 300)
    res.send(users)
    //filterUsers(conditions).then((result)=>{
    //    console.log(result[0])
    //    res.send(result)
    //}).catch((error)=>{
    //    console.log('error in post filterUsers '+error)
    //})
})
/***profile page */
router.post('/profile/:userId', (req, res)=>{
        //url = '/profile/285'
        //let url = req.originalUrl
        let userB = req.params.userId
        let userA = req.body.userA
        let promises = [
            fetchUserFromId(userB),
            fetchUserTags(userB),
            fetchUserPhotos(userB),
            fetchUserDescription(userB),
            checkMutualLike(userA, userB)
        ]
        Promise.all(promises).then((values)=>{
            res.send(values)
        }).catch((error)=>{
            console.log('error in promiseAll' +error)
            res.send({error : 'Four O Four == 404 Not Found'})
        })
})

router.post('/addlike', (req, res)=>{
    //userA == owner of the compte, oneself
    let userB = req.body.userB
    let userA = req.body.userA
    console.log('i ma in the addlike')
    insertLike(userA, userB).then((value)=>{
        res.send(value)
    }).catch((e)=>{
        console.log('error in post profile/addlike' + e)
        res.send({error : 'Four O Four == 404 Not Found'})
    })
})

router.post('/removelike', (req, res)=>{
    //userA == owner of the compte, oneself
    let userB = req.body.userB
    let userA = req.body.userA
    console.log(userA + userB)
    unmachted(userA, userB).then((value)=>{
        console.log('value in remlike' + value)
        if(value === true)
            res.send(value)
    }).catch((e)=>{
        console.log('error in post /removelike' + e)
        res.send({error : 'Four O Four == 404 Not Found'})
    })
})

router.get('/matched/:userId', (req, res)=>{
    let userA = req.params.userId
    fetchMutualLikes(userA).then((value)=>{
        console.log(value)
        res.send(value)        
    }).catch((e)=>{
        console.log('error in post matched ' + e)
        res.send({error : 'Four O Four == 404 Not Found'})
    })
})


//forget to export 
module.exports = router