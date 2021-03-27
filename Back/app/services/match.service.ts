const {pool} = require('../../config/pool');
import {BaseService} from './base.service'
import {PhotoModel} from '../models/photo.model';

export class MatchService extends BaseService{

    public async fetchUserPhotos(userId :number){
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

    public async fetchAllPhotos(){
        try{
            let query = 'SELECT photo_path from photos'
            let res = await pool.query(query)
            let photo_path = []
            photo_path = res.map((photo:any)=> photo.photo_path)
            //console.log(photo_path[0])
            return(photo_path)
        }catch(e){
            return('Error in FetchAllPphotos ' + e)
        }
    }
}
