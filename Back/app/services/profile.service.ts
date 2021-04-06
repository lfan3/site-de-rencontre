
const {pool} = require('../../config/pool')
import {BaseService} from './base.service'
import {IPhoto, IUser, IBioCourte, IChatRoom} from './interfaces.service'

export class ProfileService extends BaseService{

    //todo: creat all methods
    //change assess privat or public
    //add interface to tags related functions
    
    public async fetchUserProfile(userId : number, other : number){
        let promises = [
            this.getUserById(userId),
            //this.getUserTags(userId),
            this.getUserPhotos(userId),
            this.getBioFromUser(userId),
            this.checkMutualLike(userId, other)
        ]
        return await Promise.all(promises);
        // Promise.all(promises).then((values)=>{
        //     res.send(values)
        // }).catch((error)=>{
        //     console.log('error in promiseAll' +error)
        //     res.send({error : 'Four O Four == 404 Not Found'})
        // })
    }
//! tested
    public async getUserById(userId : number) : Promise<Array<IUser> | Error>{
        try{
            let query = `SELECT * from users WHERE id =${userId}`
            let res = await pool.query(query)
            //todo: handle empty obje, return emty array, send to controller where detect if it is an empty array and send header status in controller
            if(!res.length)
                this.notFound()
            return res[0]
        }catch(e){
            return this.fail('Error in fetchUserFromId' + e)
        }
    }
//! tested
    //tag peut etre sera separe dans un autre fichier tag
    public async getUserProfilePhoto(userId : number):Promise<Array<IPhoto> | Error>{
        try{
            let query = `SELECT photo_path, is_profile from photos WHERE user_id =${userId} AND is_profile = 1`
            let raw = await pool.query(query)
            if(!raw.length)
                return this.notFound()
            return this.success(raw)
        }catch(e){
            return this.fail('something wrong in match service: userId=' + userId)
        }
    }
//! tested
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
//! tested
    public async getBioFromUser(userId : number):Promise<Array<IBioCourte> | Error>{
        try{
            let query = `SELECT bioCourte FROM bio_courte WHERE user_id = ${userId}`
            let res = await pool.query(query)
            if(!res.length)
                return this.notFound()
            return res[0]
        }catch(e){
            return this.fail('Error in fetchuserDescription '+e)
        }
    }

    public async getUserTags(userId : number){
        try{
            let tagIds = await this.getUserTagsIds(userId)
            if(Array.isArray(tagIds)){
                let tags = Array<string>
                if(!tagIds.length)
                    return this.notFound()  
            //tags = tagIds.map(await this.getUserTag);
            // for(let i=0; i <len; i++){
            //     tags[i] = await this.getUserTag(tagIds[i])
            // }
                return tags
            }
        }catch(e){
            return('Error in fetchUserTagS' + e)
        }
    }

 
    public async getUserTagsIds(userId:number){
        try{
            let query = `SELECT tag_id from logins_tags WHERE user_id =${userId}`
            let res = await pool.query(query)
            let result = []
            if(!res.length)
                return this.notFound()
            for(let i=0; i<res.length; i++){
                result.push(res[i].tag_id);
            }
            return result
        }catch(e){
            return this.fail('Error in fetchUserTagIdS' + e)
        }
    }

    public async getUserTag(tagId:number){
        try{
            let query = `SELECT tag from tags WHERE id =${tagId}`
            let res = await pool.query(query)
            if(!res.length)
                return this.notFound()
            return res[0].tag
        }catch(e){
            return this.fail('Error in fetchUserTagS' + e)
        }
    }

    public async checkMutualLike(userA : number, otherB : number):Promise<IChatRoom | Error | Array<any>>{
        try{
            let query = `SELECT * FROM mutuallike WHERE (user_a=${userA} AND user_b=${otherB}) OR (user_a=${userA} AND user_b=${otherB})`
            let res = await pool.query(query)
            if(!res.length)
                return this.notFound()
            return {mutual : true, room : res[0].room}
        }catch(e){
            return this.fail('checkMutualLike error '+e)
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

