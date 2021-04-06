const {pool} = require('../../config/pool')
import {BaseService} from './base.service'



interface Point{
    x:number;
    y:number;
}

export class CalculeSphereDistance{
    private _point1 : Point;
    private _point2 : Point;
    private readonly _radius = 6372;

    constructor(p1:Point, p2:Point){
        this._point1 = p1;
        this._point2 = p2;
    }

    private toRadians(angle:number){
        return angle * Math.PI / 180;
    }

    public toDistance():number{
        const lon1 = this.toRadians(this._point1.x);
        const lat1 = this.toRadians(this._point1.y);

        const lon2 = this.toRadians(this._point2.x);
        const lat2 = this.toRadians(this._point2.y);
        const dlon = lon2 - lon1;
        const dlat = lat2 - lat1;

        const a = Math.pow(Math.sin(dlat / 2), 2) + Math.cos(lat1) * Math.cos(lat2) * Math.pow(Math.sin(dlon / 2), 2);
        const c = 2 * Math.asin(Math.sqrt(a));
        return c * this._radius;
    }
}
//test
// const p1 = { x: 3.11871, y: 48.474315 };
// const p2 = { x: 2.513212, y: 48.911669 };
// const k = new CalculeSphereDistance(p1, p2);
// const distance = k.toDistance();
// console.log(distance);

export class CityService extends BaseService{
    public async getCities(userId : number){
        
    }

    public async getFrenchCities(){
        try{
            let query = 'SELECT city_nom FROM franceCities \
                            WHERE population>30000\
                            ORDER BY city_nom'
            let cities = await pool.query(query)
            if(!cities.length)
                return this.notFound()
            return(cities)
        }catch(e){
            this.fail('Error from getFrenchCities' + e)
        }
    }

    public async getArrondParis(){
        try{
            let query = 'SELECT l_ar FROM arrondissements'
            let arronds = await pool.query(query)
            if(!arronds.length)
                throw new Errors.NotFound("l'arrondissements are not found")
            return (arronds)
        }catch(e){
            console.log('getArrondParis Error '+e)
            if(e instanceof Errors.NotFound)
                throw new Errors.NotFound(e.message)
            else
                throw new Error(e)
        }
    }
    
}

//! this part should putted in utilities and then consider to be puted in other place
// router.get('/cities', async(req, res)=>{
//     const promises = [getFrenchCities(), getArrondParis()]
//     try{
//         const [cities, arronds] = await Promise.all(promises).then()
//         res.json({cities, arronds})
//     }catch(e){
//         if(e instanceof Errors.NotFound)
//             return res.status(HttpStatus.NOT_FOUND).send({message : e.message})
//         else
//             return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({error: e, message: e.message})
//     }
// })