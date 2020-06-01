require('dotenv').config()
const Errors = require('../errors')
const NodeGeocoder = require('node-geocoder');
var geocoder = NodeGeocoder({
    provider: 'opencage',
    apiKey: process.env.OCD_API_KEY
});



//! getFinalCity helpers

async function getCityFromNodeGeo(lat, lon) {
    try{
        const res = await geocoder.reverse({ lat: 48.8717739, lon: 2.3452563})
        let {city, zipcode} = res[0]
        if(!city)
            throw new Errors.NotFound('Not Found city from NodeGeo')
        if(city == 'Paris'){
            return('Paris' + zipcode.slice(3))
        }else{
            return city
        }
    }catch(e){
        console.log('getCItyFromNOdeGEO Error'+ e)
        if(e instanceof Errors.NotFound)
            throw new Errors.NotFound(e.message)
        throw new Error('Error from getCityFromNodeGeo')
    }
}  


async function getFinalCity(position, city, arronds){
    try{
        let cityData
        if(city == '' || city == 'no my city option')
            cityData = await getCityFromNodeGeo(position.lat, position.lon)
        else if(city === 'Paris'){
            let arrondNumber = parseInt(arronds)
            cityData = `Paris${arrondNumber}`
        }
        else
            cityData = city
        return cityData
    }catch(e){
        if(e instanceof Errors.NotFound)
            throw new Errors.NotFound(e.message)
        throw new Error('Error from getFinalCity: '+e)
    }
}

//! tags section helpers
//*index to indice wether the newtag are existed in tags db
function reducerTags(newArr, oldArr){
    return newArr.reduce((accu, curr)=>{
        let index = oldArr.indexOf(curr)
        return accu.concat([{[index]: curr}])
    }, [])
}

//* filterTag to seperated the already existed tag and new tags
function filterTags(reducerTags, newArr, oldTags, arg){
    let r1 = reducerTags(newArr, oldTags)
    if(arg === 1){
        let realNewTags = r1.filter((t)=>t['-1'])
        for(let i=0; i<realNewTags.length; i++)
            realNewTags[i] = realNewTags[i]['-1']
        return realNewTags
    }else{
        let oldTags = r1.filter((t)=>{
            if(!Object.keys(t).includes('-1'))
                return t
        })
        return oldTags
    }
}


function formDateFormat(year, month, day){
    if(day <10)
        day = '0'+day
    if(month < 10)
        month = '0'+month
    return (`${year}-${month}-${day}`)
}


exports.formDateFormat = formDateFormat
exports.reducerTags = reducerTags
exports.filterTags = filterTags
exports.formDateFormat = formDateFormat
exports.getFinalCity = getFinalCity