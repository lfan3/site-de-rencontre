
const {pool} = require('../../config/pool')
import {BaseService} from './base.service'
import {IPhoto} from './interfaces.service'

export class MatchService extends BaseService{

    //todo: creat all methods
    //change assess privat or public
    public async getUserById(userId : number){
        try{
            let query = `SELECT * from users WHERE id =${userId}`
            let res = await pool.query(query)
            //todo: handle empty obje, return emty array, send to controller where detect if it is an empty array and send header status in controller
            if(!res.length)
                this.notFound()
            return res[0]
        }catch(e){
            return('Error in fetchUserFromId' + e)
        }
    }

    //tag peut etre sera separe dans un autre fichier tag
    public async getUserProfilePhoto(userId : number):Promise<Array<IPhoto> | Error>{
        try{
            //?1 or true
            let query = `SELECT photo_path, is_profile from photos WHERE user_id =${userId} AND is_profile = 1`
            let raw = await pool.query(query)
            if(!raw.length)
                return this.notFound()
            return this.success(raw)
        }catch(e){
            return this.fail('something wrong in match service: userId=' + userId)
        }
    }
    //all photos(profile or not)
    public async getUserPhotos(userId : number | string): Promise<Array<IPhoto> | Error>{
        try{
            let query = `SELECT photo_path, is_profile from photos WHERE user_id =${userId}`
            //impossible to be empty
            let raw = await pool.query(query)
            if(!raw.length)
                return this.notFound()
            return this.success(raw)
        }catch(e){
            return this.fail('something wrong in match service: userId=' + userId)
        }
    }
//? put the bioCourte directly inthe user entity is a better choise?
    public async getBioFromUser(userId : number){
        try{
            let query = `SELECT descrip FROM bioCourte WHERE user_id = ${userId}`
            let res = await pool.query(query)
            if(!res.length)
                return this.notFound()
            return res[0]
        }catch(e){
            return('Error in fetchuserDescription '+e)
        }
    }

    public async checkMutualLike(userA : number, otherB : number){
        try{
            let query = `SELECT * FROM mutuallike WHERE (user_a=${userA} AND user_b=${otherB}) OR (user_a=${userA} AND user_b=${otherB})`
            let res = await pool.query(query)
            if(!res.length)
                return this.notFound()
            return {mutual : true, room : res[0].room}
        }catch(e){
            console.log('checkMutualLike error '+e)
        }
    }
}

// router.post('/profile/:userId', (req, res)=>{
//     let userB = req.params.userId
//     let userA = req.body.userA
//todo: this part in service and test all the services in controller
//     let promises = [
//         fetchUserFromId(userB),
//         fetchUserTags(userB),
//         fetchUserPhotos(userB),
//         fetchUserDescription(userB),
//         checkMutualLike(userA, userB)
//     ]
//     Promise.all(promises).then((values)=>{
//         res.send(values)
//     }).catch((error)=>{
//         console.log('error in promiseAll' +error)
//         res.send({error : 'Four O Four == 404 Not Found'})
//     })
// })

