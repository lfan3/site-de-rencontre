const express = require('express')
const router = express.Router()
const fs = require('fs')
const signUp = require('./email/signUp').signUp
const path = require('path')
const Errors = require('./errors')
const HttpStatus = require('./httpStatus')

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
    unmachted,
    sendPhoto,
    getUserPhotos,
    updateAvatar,
    getAllTags,
    getFrenchCities,
    getArrondParis,
    insertNewUser,
    emailIsVerified,
    signInVerification
    } = require('./data/api')


router.get('/', (req, res)=>{
    res.send("Soket ")
})
router.post('/signup', signUp)


/*
app.post('/signin', (req, res, next)=>{
    console.log('Inside Post/Login callback function')
    console.log('req.body: ')
    console.log(req.body)
    passport.authenticate('local', (err, user, info)=>{
        if(info) {console.log(info.message);return res.send(info.message)}
        if(err) {console.log(err);return next(err)}
        if(!user) {return res.redirect('/login')}
        req.login(user, (err)=>{
            console.log('Inside req.login() callback')
            console.log(req.sessionID)
            console.log(JSON.stringify(req.session.passport))
            console.log(JSON.stringify(req.user))
            if(err){
                return next(err)
            }
            return res.redirect('/authrequired')
        })
        })(req, res, next)
}
*/
router.post('/signin', (req, res)=>{
    console.log('inside the signin get callback function')
    //console.log(req.body)
    //console.log(req.session)
    signInVerification(req.body).then(resp=>{
        req.session.loginId = resp.loginId
        req.session.userId = resp.userId
        res.json({loginId: req.session.loginId, userId: req.session.userId})
    }).catch((e)=>res.json({error: 'user is not validated, please retry'}))
    //req.session.userId 
})
router.post('/email_verify', (req, res)=>{
    emailIsVerified(req.body)
    .then(()=>res.send('email verified'))
    .catch((e)=>res.json({error: 'something is wrong, please retry'}))
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



//!done in macht, the path is not main anymore but /match
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
//! done in match.service et match.controller
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
//todo
router.post('/profile/:userId', (req, res)=>{
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

//! photo setting page routers
function threeLettersGene(){
    var result = ''
    var alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    for(let i=0; i<3; i++){
        result += alphabet.charAt(Math.random()*26)
    }
    return result
}
router.post('/uploadImg', (req, res)=>{
    let resolve_path = path.resolve('../')
    let imageName = threeLettersGene() + Date.now()
    let is_profile = req.body.profile
    let userA = req.body.userA
    //! imagepath like public/images
    //let imagePath = `${resolve_path}/public/images/${imageName}.png`
    let imagePathWrite = `${resolve_path}/Front/public/images/${imageName}.png`
    let imagePath = `public/images/${imageName}.png`
    let base64 = req.body.image64.replace(/^data:image\/png;base64,/, "")
    require('fs').writeFile(imagePathWrite, base64, 'base64', (error)=>{
        console.log(error)
    })
    sendPhoto(imagePath, userA, is_profile)
    res.send({imagePath : imagePath})
})

router.post('/getPhotos', async (req, res)=>{
    let userId = req.body.userA
    let photos = await getUserPhotos(userId)
    res.json(photos)
})
router.post('/updateAvatar', async(req, res)=>{
    let imagePath = req.body.imgPath
    let userId = req.body.userA
    await updateAvatar(userId, imagePath)
    let photos = await getUserPhotos(userId)
    res.json(photos)
})
//! basicquestions routers
router.get('/tags', async(req, res)=>{
    getAllTags(1)
    .then((tags)=>res.json(tags))
    .catch((e)=>{
        if(e instanceof Errors.NotFound)
            return res.status(HttpStatus.NOT_FOUND).send({message: e.message})
        else
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({error: e, message: e.message})
    })
})

//! this part should putted in geoservice and then consider to be puted in other place
router.get('/cities', async(req, res)=>{
    const promises = [getFrenchCities(), getArrondParis()]
    try{
        const [cities, arronds] = await Promise.all(promises).then()
        res.json({cities, arronds})
    }catch(e){
        if(e instanceof Errors.NotFound)
            return res.status(HttpStatus.NOT_FOUND).send({message : e.message})
        else
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({error: e, message: e.message})
    }
})

//! should be putted in security
router.post('/newUser', async(req, res)=>{
    let userData = req.body
    console.log(userData)
    insertNewUser(userData)
})

router.post('/match_questions', async(req, res)=>{
    let match_answers = req.body
    console.log(match_answers)
})


//forget to export 
module.exports = router