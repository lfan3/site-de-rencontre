const {pool} = require('../../config/pool')
import {BaseService} from './base.service'
import {PhotoModel} from '../models/photo.model'
import {CalculeSphereDistance} from './utility.service'
import {IFilterUsersRaw, ISexOrienAgeFilterResult, IPaireDistance, IUser, IPhoto} from './interfaces.service'


export class MatchService extends BaseService{

    public async fetchAllUsersPhotos(){
        try{
            let query = 'SELECT photo_path from photos'
            let res = await pool.query(query)
            let photo_path = []
            photo_path = res.map((photo:IPhoto)=> photo.photo_path)
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
  

    public async filterUsers(conditions : IFilterUsersRaw) : Promise< Array<IUser> | Error>{
     
        let promises = []
        let results : Array<IUser> = []
       
        try{
            let others = await this.sexOrienAgeFilter(conditions);
   
            if(Array.isArray(others)){
                if(others.length === 0){
                    return results;
                }
                for(let i= 0; i<others.length; i++){
                    promises.push(this.distanceFilter(conditions.userId, others[i].id, conditions.distance))
                }
                let matches = await Promise.all(promises);
                //if no matches the distance filter after the sex filter
                if(Array.isArray(matches)){
                    if(matches.length === 0){
                        return results
                    }
                    for(let matche of matches){
                        if('otherId' in matche){
                            const id = matche.otherId;
                            if( id!== 0){
                                const mf = others.filter(other => other.id === id)[0]
                                const user = Object.assign(mf, {distance : matche.distance})
                                results.push(user);
                            }
                        }
                    }
                }
            }
            return results
        }catch(e){
            return this.fail('Error in filterUsers Service '+ e);
        }
     
    }
    // //filter users
 
    private async sexOrienAgeFilter(condition : IFilterUsersRaw): Promise<Array<ISexOrienAgeFilterResult> | Error>{
        const userId = condition.userId
        const sex = condition.sex
        const orient = condition.orient
        const min_age = condition.ages[0]
        const max_age = condition.ages[1]
        
        try{
            if(sex !== 'all'){
                let query = `
                    SELECT tab.id, tab.name, tab.city, tab.sex, tab.orient, tab.age, tab.photo_path, tab.login, tab.email 
                    FROM(
                        SELECT photos.photo_path, users.id, users.name, users.city, users.sex, users.orient, users.login, users.email, FLOOR(DATEDIFF(CURRENT_DATE, (SELECT users.birthday))/365) AS age
                        FROM users 
                        LEFT JOIN photos on users.id = photos.user_id
                        WHERE photos.is_profile = 1 && users.id != '${userId}' && users.sex = '${sex}' && users.orient = '${orient}' 
                        ) AS tab 
                    WHERE tab.age >= ${min_age} && tab.age <= ${max_age}`
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
        }catch(e){
            return this.fail('Error in sexOrientAgeFilter '+ e.toString());
        }
  
    }


    private async distanceFilter(userId : number, otherId : number, maxDistance:number): Promise< IPaireDistance | Error>{

        try{
            let query = `SELECT geo_loc FROM users WHERE users.id = ${userId} Or users.id = ${otherId}`;
            let res = await pool.query(query);
            //*MAX distance = 500km
            if(maxDistance === 500){
                //! potential problem with front, change over 500km to 500
                return {userId, otherId, distance : maxDistance}
            }
            if(res.length > 0){
                const p1 = res[0].geo_loc;
                const p2 = res[1].geo_loc;
                const cc = new CalculeSphereDistance(p1, p2);
                const distance = cc.toDistance();
                if(distance < (maxDistance))
                    return {userId, otherId, distance}
                return {userId:0, otherId:0, distance:0};
            }
            //if res has no resultm gestion
            else{
                return {userId:0, otherId:0, distance:0};
            }
        }catch(e){
            return this.fail('Error in distanceFilter '+e.toString());
        }
    }


    //! This function is useless since I have changed from mysql to mariadb : this function can only be used with mysql, dans marianDB, il ny pas de fonction st_distance_sphere
    // public async distanceCalculator(userId : number, otherId : number, distance:number): Promise< IPaireDistance>{

    //     let query = `SELECT ST_Distance_Sphere(
    //                     (SELECT geo_loc FROM users WHERE users.id = ${userId}),
    //                     (SELECT geo_loc FROM users WHERE users.id = ${otherId})
    //                 ) AS distance`
    //     let res = await pool.query(query)
    //     //*MAX distance = 500
    //     if(distance === 500){
    //         return {userId, otherId, distance}
    //     }
    //     distance = Math.round(res[0].distance)
    //     console.log(distance);
    //     return {userId, otherId, distance}
    // }

}
