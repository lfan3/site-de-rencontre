
const {pool} = require('../../config/pool')
import {BaseService} from './base.service'
import {PhotoModel} from '../models/photo.model'


export class MatchService extends BaseService{

    public async getUserById(userId : number){
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

    //tag peut etre sera separe dans un autre fichier tag
    public async getTagsFromUser(){

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

