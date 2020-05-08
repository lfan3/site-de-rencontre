require('dotenv').config()
const NodeGeocoder = require('node-geocoder');
const randomLocation = require('random-location')
const fs = require('fs')

var geocoder = NodeGeocoder({
  provider: 'opencage',
  apiKey: process.env.OCD_API_KEY
});

let NotreDame = {latitude : 48.8529, longitude : 2.3499}


async function randomLoco(){
  let obj = {}
  let R = Math.random() * 700 * 1000
  const randomL = randomLocation.randomCirclePoint(NotreDame, R)
  try{
    let res = await geocoder.geocode(`${randomL.latitude}, ${randomL.longitude}`)
    if(res[0].city !== undefined){
      obj.lat = res[0].latitude
      obj.lon = res[0].longitude
      obj.city = res[0].city
      return obj
    }
  }catch(e){
    console.log('error inside randomLoco '+e)
  }
}
//recursive
async function getAdress(){
  let add = await randomLoco()
  let loco = add === undefined ? getAdress() : add
  return loco
}

async function addloco(){
  let array = []
  for(let i=0; i<520; i++){
    console.log(i)
    let loco = await getAdress()
    array[i] = loco
  }
  return array
}

async function writeFile(){
  let res = await addloco()
  let address = JSON.stringify(res)
  fs.writeFileSync('./dummy_address.json', address)
}
writeFile()
/*
addloco().then((res)=>{
  console.log(res)
  let address = JSON.stringify(res)
  console.log('add')
  console.log(address)
})
*/
/* this is wrong code, but i do not know why it is wrong!!!
async function randomLoco(){
  let obj = {}
  let aray = []
  let j = 0
  for(let i= 0; i<5; i++){
    let R = Math.random() * 700 * 1000
    const randomL = randomLocation.randomCirclePoint(NotreDame, R)
    let res = await geocoder.geocode(`${randomL.latitude}, ${randomL.longitude}`)
    if(res[0].city !== undefined){
      obj.lat = res[0].latitude
      obj.lon = res[0].longitude
      obj.city = res[0].city
      aray[j] = obj
    console.log(aray[j])
      j++;
    }
  }
  return aray
}

randomLoco().then(res=>console.log(res))
*/
module.exports = randomLoco

