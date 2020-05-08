const cheerio = require('cheerio')
const axios = require('axios')
const site = 'https://gangz.io/profile/'
const fs = require('fs')
const ids =  require('./idGender.js')
const bcypt = require('bcrypt')
const lt = require('./latlon')

const createImages = (id, photo_path)=>{
    return ({
        id,
        photo_path,
        is_profile : true,
        user_id : id
    })
}

const getDatas = async (genderIds, gender)=>{
    let len = genderIds.length
    let i = 0
    let images = []
   // let users = []
    while(i < len){
        try{
            console.log(i)
            let url = site.concat(genderIds[i])
            let k = await axios.get(url)
             let $ = cheerio.load(k.data);
             let photo_path = $('.profile__image-container').find('img').attr('src')
             images[i] = createImages(i, photo_path)
            // users[i] = createUsers(i, i,login, city, gender)
             i++
        } catch(error){
            console.log('error in getDatas '+ error)
        }
    }

    let imagesD = JSON.stringify(images)
    fs.writeFile(`./dummy_avatars_${gender}1.json`, imagesD, (err)=>{
        if(err)
            console.log(err)
        else
            return console.log('ok')
    })

}

async function write_files(){
    await getDatas(ids.men, 'men')
    await getDatas(ids.women, 'women')
}

write_files()
