const fs = require('fs')
const data = fs.readFileSync('dummy.json')
const tables = JSON.parse(data)
const axios = require('axios')
const pool = require('../config/pool')

//all the funcitons to get the data from DB

let query = `SELECT users.id, users.name, users.city
            FROM users WHERE users.sex = 'woman'  && users.sex_orient = 'gay'`
let res = pool.query(query)
//res.then((r)=>console.log(r))

const sexOrienAgeFilter = async (sex, orient, ages)=>{
    try{
        let min_age = ages[0]
        let max_age = ages[1]
        if(sex !== ''){
            let query = `SELECT users.id, users.name, users.city, users.sex, users.sex_orient, users.age
            FROM users WHERE users.sex = '${sex}' && users.sex_orient = '${orient}'
            && users.age >= ${min_age} && users.age <= ${max_age}`
            let res = await pool.query(query)
        return res
        }else{
            let query = `SELECT users.id, users.name, users.city, users.sex, users.sex_orient, users.age
            FROM users WHERE users.sex_orient = '${orient}'
            && users.age >= ${min_age} && users.age <= ${max_age}`
            let res = await pool.query(query)
        return res
        }


    }catch(e){
        return('Error in sexOrienAgeFilter '+ e)
    }
}
const distanceCalculator = async(userId, otherId, distance)=>{
    try{
        let query = `SELECT ST_Distance_Sphere(
                        (SELECT geo_loc FROM users WHERE users.id = ${userId}),
                        (SELECT geo_loc FROM users WHERE users.id = ${otherId})
                    ) AS distance`
        let res = await pool.query(query)
        console.log(res)
        if (res[0].distance < distance * 1000)
            return {
                userId,
                otherId,
                distance : Math.round(res[0].distance)
            }
    }catch(e){
        return('Error in distanceCalculator ' + e)
    }
}

const findMatchedUsers = async ({userId, sex, orient, ages, distance})=>{
    try{
        let results = []
        let others = await sexOrienAgeFilter(sex, orient, ages)
        if(distance !== 500){
            for(let i= 0; i<others.length; i++){
                let result = await distanceCalculator(userId,others[i].id, distance )
                if(result)
                    results.push(result)
            }
            console.log(results)
            return results
        }else{
            
            return others
        }
        //console.log(results)
    }catch(e){
        return('Error in findMatchedUsers ' + e)
    }
}

const filterUsers = async(conditions)=>{
    let matches = await findMatchedUsers(conditions)
    console.log('machtes number '+ matches[0])
    console.log( matches[0])
    
    let filters = []
    for(let i=0; i<matches.length; i++){
        console.log('inside luoop')
        let info_res = await fetchFilter(matches[i].id)
        let info = info_res[0]
        filters[i] = Object.assign(matches[i], info)
        //console.log(`filters ${i}`)
        //console.log(filters[i])
    }

    return filters
}
//sexOrienAgeFilter('', 'gay', [21, 45])
const con = {
    userId : 66,
    sex: 'woman',
    orient:'gay',
    ages:[21,45],
    distance : 243
}
findMatchedUsers(con)