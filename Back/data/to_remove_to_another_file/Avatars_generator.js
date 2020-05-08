const cheerio = require('cheerio')
const axios = require('axios')
const site = 'https://gangz.io/profile/'
const fs = require('fs')
const ids =  require('./idGender.js')
const bcypt = require('bcrypt')
const lt = require('./latlon')

const createImages = (id, photo_path, gender)=>{
    return ({
        id,
        gender,
        photo_path,
        is_profile : true,
        user_id : id
    })
}

const getDatas = async (ids)=>{
    let menIds = ids.men
    let womenIds = ids.women
    let menLen = menIds.length
    let womenLen = womenIds.length
    let i = 0
    let j = 0
    let images = []
   // let users = []
    while(i < menLen){
        try{
            console.log(i)
            let url = site.concat(menIds[i])
            let k = await axios.get(url)
             let $ = cheerio.load(k.data);
             let photo_path = $('.profile__image-container').find('img').attr('src')
             images[i] = createImages(i, photo_path, 'man')
            // users[i] = createUsers(i, i,login, city, gender)
             i++
             console.log(i)
        } catch(error){
            console.log('error in men counting '+ error)
        }
    }
    while(j<womenLen){
        try{
            let url = site.concat(womenIds[j])
            let k = await axios.get(url)
            let $ = cheerio.load(k.data)
            let photo_path = $('.profile__image-container').find('img').attr('src')
            images[i] = createImages(i, photo_path, 'woman')
            i++
            j++
            console.log(i)
        } catch(e){
            console.log('error in women counting')
        }
    }

    let imagesD = JSON.stringify(images)
    fs.writeFile(`./dummy_avatars_new.json`, imagesD, (err)=>{
        if(err)
            console.log(err)
        else
            return console.log('ok')
    })

}

getDatas(ids)
