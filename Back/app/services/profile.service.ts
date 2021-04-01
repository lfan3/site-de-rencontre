
const {pool} = require('../../config/pool')
import {BaseService} from './base.service'
import {PhotoModel} from '../models/photo.model'


export class MatchService extends BaseService{

    //todo: creat all methods
    //change assess privat or public
    //creat photo object where stock the profile photo and others photos
    //all the empty case, use not found from base service
    public async getUserById(userId : number){
        try{
            let query = `SELECT * from users WHERE id =${userId}`
            let res = await pool.query(query)
            //todo: handle empty obje
            if(!res.length)
                this.notFound();
            return res[0]
        }catch(e){
            return('Error in fetchUserFromId' + e)
        }
    }

    //tag peut etre sera separe dans un autre fichier tag
    public async getUserProfilePhoto(userId : number){
        try{

        }catch(e){

        }
    }

    public async getUserPhotos(userId : number | string){
        try{
            let query = `SELECT photo_path, is_profile from photos WHERE user_id =${userId}`
            let raw = await pool.query(query)
            let res = new PhotoModel(raw[0])
            res.display();
            return this.success(res)
        }catch(e){
            return this.fail('something wrong in match service: userId=' + userId)
        }
    }
//? inthe user entity?
    public async getBioFromUser(userId : number){
        try{
            let query = `SELECT descrip FROM bioCourte WHERE user_id = ${userId}`
            let res = await pool.query(query)
            return res[0]
        }catch(e){
            return('Error in fetchuserDescription '+e)
        }
    }

    public async checkMutualLike(userA : number, otherB : number){
        try{
            let query = `SELECT * FROM mutuallike WHERE (user_a=${userA} AND user_b=${otherB}) OR (user_a=${userA} AND user_b=${otherB})`
            let res = await pool.query(query)
            if(!res[0])
                return false
            return {mutual : true, room : res[0].room}
        }catch(e){
            console.log('checkMutualLike error '+e)
        }
    }
}

// router.post('/profile/:userId', (req, res)=>{
//     let userB = req.params.userId
//     let userA = req.body.userA
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

