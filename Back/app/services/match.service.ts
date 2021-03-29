const {pool} = require('../../config/pool');
import {BaseService} from './base.service'
import {PhotoModel} from '../models/photo.model';
//import {PaireDistance} from './paireDistance';

interface IFilterPoints{
    userId : number;
    sex : string;
    orient : string;
    ages : Array<number>;
    distance : number 
}
//?distance?
interface IUserFilterResult{
    userId : number;
    name : string;
    city : string;
    sex : string;
    sex_orient : string;
    ages : Array<number>;
}

interface IPairDistance{
    userId : number;
    otherId : number;
    distance : number | string;
}

class PaireDistance{
    private _props : IPairDistance;

    constructor(props : IPairDistance){
        this._props = props;
    }

    get userId (): number {
        return this._props.userId;
    }

    get otherId (): number {
        return this._props.otherId;
    }
}




export class MatchService extends BaseService{

    public async fetchUserPhotos(userId : number | string){
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

    public getCriterias(reqBody : any):IFilterPoints{
        //todo(not import) to change the name of the varialbe, problem with nomination
        //??i forget what it is the value when they are 0 or empty or not inside
        const userId = reqBody.userId
        
        const sex = reqBody.sexdata
        let orient = reqBody.orientdata.toLowerCase()
        if(orient === 'bisexual')
            orient = 'bi'
        const ages = [reqBody.fromdata, reqBody.toAge]
        const distance = reqBody.distancedata
        //expresso: even though, the userId type is string, but it seems that js converted it to int during runtime, as there is no error as I defined the IFilterPoints as output
        return {userId, sex, orient, ages, distance}
    }
  
    // public async filterUsers(conditions : IFilterPoints){
    //     try{
    //         let matches = await this.findMatchedUsers(conditions)
    //         let filters = []
    //         for(let i=0; i<matches.length; i++){
    //             let info = await this.fetchFilter(matches[i].otherId)
    //             filters[i] = Object.assign(matches[i], info)
    //         }
    //         return filters
    //     }catch(e){
    //         return('Error in filterUsers' + e)
    //     }
    // }

    // //get all information except distance from the mached persons
    // private async fetchFilter(otherId : number){
    //     try{
    //         let query = `SELECT users.id, users.name, users.city, users.sex, users.sex_orient, users.birthday, photos.photo_path \
    //                     FROM users \
    //                     LEFT JOIN photos \
    //                     ON users.id = photos.user_id \
    //                     WHERE users.id = ${otherId} && photos.is_profile` 
    //         let res = await pool.query(query)
    //         if(res[0] !== undefined){
    //             let year = res[0].birthday
    //             //birthtime and now are UTC time, wee need to convert the UTC time with Date instance inorder to user getUTCFullYear
    //             let birthtime = year.getTime()
    //             let now = Date.now()
    //             let diff = new Date(now - birthtime)
    //             let age = diff.getUTCFullYear() - 1970
    //             let info = {
    //                 id : res[0].id,
    //                 name : res[0].name,
    //                 city : res[0].city,
    //                 sex : res[0].sex,
    //                 sex_orient : res[0].sex_orient,
    //                 age,
    //                 photo_path : res[0].photo_path
    //             }
    //             return info
    //         }
    //     }catch(e){
    //         console.log('error in fetchFilter ' + e)
    //     }
    // }

    // private async findMatchedUsers(conditions : IFilterPoints) : Promise< Array<PaireDistance> | void>{
    //     try{
    //         let results = []
    //         const {userId, sex, orient, ages, distance} = conditions;
    //         let others = await this.sexOrienAgeFilter(userId, sex, orient, ages)
    //             for(let i= 0; i<others.length; i++){
    //                 let result = await this.distanceCalculator(userId,others[i].id, distance )
    //                 if(result)
    //                     results.push(result)
    //             }
    //             return results
    //     }catch(e){
    //         return('Error in findMatchedUsers ' + e)
    //     }
    // }
    // //filter users
 
    public async sexOrienAgeFilter(condition : IFilterPoints): Promise<IUserFilterResult>{
        const userId = condition.userId
        const sex = condition.sex
        const orient = condition.orient
        const min_age = condition.ages[0]
        const max_age = condition.ages[1]
        condition.userId, condition.sex, condition.orient, condition.ages
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
    }
    public async distanceCalculator(userId : number, otherId : number, distance:number): Promise< PaireDistance>{

        //todo: to see the mysql point, create a function to calcule the distance
        let query = `SELECT ST_Distance_Sphere(
                        (SELECT geo_loc FROM users WHERE users.id = ${userId}),
                        (SELECT geo_loc FROM users WHERE users.id = ${otherId})
                    ) AS distance`
        let res = await pool.query(query)
        //*MAX distance = 500
        if(distance === 500){
            //todo: in new context, it is better to use a number, like negative number instead of string
            //! potential problem with front, change over 500km to 500
            return new PaireDistance({userId, otherId, distance})
        }
        //?what is the scale here, m or km??
        distance = Math.round(res[0].distance)
        console.log(distance);
        return new PaireDistance({userId, otherId, distance})
    }
    public async getPoint(){
        try{
            let query = `SELECT geo_loc FROM users WHERE users.id < 3`;
            let res = await pool.query(query);
            return res;
        }catch(e){
            return e;
        }
    }
    public async test(){
        try{
            let query = `select hello('sweet home')`;
            let res = await pool.query(query);
            return res;
        }catch(e){
            return e;
        }
    }


}
