const {pool} = require('../../config/pool');
import {BaseService} from './base.service'
import {PhotoModel} from '../models/photo.model';
import {CalculeSphereDistance} from './utility.service';
import {UserModel} from '../models/user.model'
//import {PaireDistance} from './paireDistance';

interface IFilterUsersRaw{
    userId : number;
    sex : string;
    orient : string;
    ages : Array<number>;
    distance : number 
}
//?distance?
interface ISexOrienAgeFilterResult{
    id : number;
    name : string;
    city : string;
    sex : string;
    orient : string;
    ages : Array<number>;
}

interface IPairDistance{
    userId : number;
    otherId : number;
    distance : number | string;
}
//??do i need to create this object
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

    public getCriterias(reqBody : any):IFilterUsersRaw{
        //todo(not import) to change the name of the varialbe, problem with nomination
        //??i forget what it is the value when they are 0 or empty or not inside
        const userId = reqBody.userId
        
        const sex = reqBody.sexdata
        let orient = reqBody.orientdata.toLowerCase()
        if(orient === 'bisexual')
            orient = 'bi'
        const ages = [reqBody.fromdata, reqBody.toAge]
        const distance = reqBody.distancedata
        //expresso: even though, the userId type is string, but it seems that js converted it to int during runtime, as there is no error as I defined the IFilterUsersRaw as output
        return {userId, sex, orient, ages, distance}
    }
  
    public async filterUsers(conditions : IFilterUsersRaw){
        try{
            //todo:tri empty distance
            let matches = await this.findMatchedUsers(conditions)
            //let filters = [PaireDistance]
            let filters : Array<PaireDistance> = []
            for(let pd of matches){
                if(pd.userId !== 0)
                    filters.push(pd)
            }
            // for(let i=0; i<matches.length; i++){
            //     let info = await this.fetchFilter(matches[i].otherId)
            //     filters[i] = Object.assign(matches[i], info)
            // }
            //return filters
            return filters
        }catch(e){
            return('Error in filterUsers' + e)
        }
    }

    // //get all information except distance from the mached persons
    // private async fetchFilter(otherId : number){
    //     try{
    //         let query = `SELECT users.id, users.name, users.city, users.sex, users.orient, users.birthday, photos.photo_path \
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
    //                 orient : res[0].orient,
    //                 age,
    //                 photo_path : res[0].photo_path
    //             }
    //             return info
    //         }
    //     }catch(e){
    //         console.log('error in fetchFilter ' + e)
    //     }
    // }

    public async findMatchedUsers(conditions : IFilterUsersRaw) : Promise< Array<PaireDistance>>{
     
        let results = [new PaireDistance({userId:0, otherId:0, distance:0})];
        let promises = []
       
        let others = await this.sexOrienAgeFilter(conditions);
        //if empty
        if(others.length === 0){
            return results;
        }
        for(let i= 0; i<others.length; i++){
            promises.push(this.distanceFilter(conditions.userId, others[i].id, conditions.distance))
        }
        //todo tri les empty pairedis??

        return Promise.all(promises)
    }
    // //filter users
 
    public async sexOrienAgeFilter(condition : IFilterUsersRaw): Promise<Array<ISexOrienAgeFilterResult>>{
        const userId = condition.userId
        const sex = condition.sex
        const orient = condition.orient
        const min_age = condition.ages[0]
        const max_age = condition.ages[1]

        if(sex !== 'all'){
            let query = `SELECT id, name, city, sex, orient, age FROM(
                SELECT id, name, city,sex, orient, FLOOR(DATEDIFF(CURRENT_DATE, (SELECT birthday))/365) AS age
                FROM users) AS detrive_tab  WHERE id != '${userId}' && sex = '${sex}' && orient = '${orient}'
                && age >= ${min_age} && age <= ${max_age}`
            let res = await pool.query(query)
            return res
        }else{
            let query = `SELECT id, name, city, sex, orient, age FROM (
                SELECT id, name, city, sex, orient, FLOOR(DATEDIFF(CURRENT_DATE, (SELECT birthday))/365) AS age
                FROM users) AS detrive_tab WHERE orient = '${orient}'
                && age >= ${min_age} && age <= ${max_age}`
            let res = await pool.query(query)
            return res
        }
    }


    public async distanceFilter(userId : number, otherId : number, maxDistance:number): Promise< PaireDistance>{

        let query = `SELECT geo_loc FROM users WHERE users.id = ${userId} Or users.id = ${otherId}`;
        let res = await pool.query(query);
        //*MAX distance = 500km
        if(maxDistance === 500){
            //! potential problem with front, change over 500km to 500
            return new PaireDistance({userId, otherId, distance : maxDistance})
        }
        if(res.length > 0){
            const p1 = res[0].geo_loc;
            const p2 = res[1].geo_loc;
            const cc = new CalculeSphereDistance(p1, p2);
            const distance = cc.toDistance();
            if(distance < (maxDistance))
                return new PaireDistance({userId, otherId, distance})
            return new PaireDistance({userId:0, otherId:0, distance:0});
        }
        //if res has no resultm gestion
        else{
            return new PaireDistance({userId:0, otherId:0, distance:0});
        }

    }


    //! this function can only be used with mysql, dans marianDB, il ny pas de fonction st_distance_sphere
    public async distanceCalculator(userId : number, otherId : number, distance:number): Promise< PaireDistance>{

        let query = `SELECT ST_Distance_Sphere(
                        (SELECT geo_loc FROM users WHERE users.id = ${userId}),
                        (SELECT geo_loc FROM users WHERE users.id = ${otherId})
                    ) AS distance`
        let res = await pool.query(query)
        //*MAX distance = 500
        if(distance === 500){
            //! potential problem with front, change over 500km to 500
            return new PaireDistance({userId, otherId, distance})
        }
        //?what is the scale here, m or km??
        distance = Math.round(res[0].distance)
        console.log(distance);
        return new PaireDistance({userId, otherId, distance})
    }

    
    //funciions below to delete
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
