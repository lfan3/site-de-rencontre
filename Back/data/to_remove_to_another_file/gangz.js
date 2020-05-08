const cheerio = require('cheerio')
const axios = require('axios')
const site = 'https://gangz.io/profile/'
const siteUrl = 'https://gangz.io/profile/14849'
const profileurl = 'https://unsplash.com/s/photos/profile'
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

const r3l = ()=>{
    let r = Math.random().toString(36).substring(3,6)
    return r
}
const createLogin = (id, login)=>{
    let r = r3l()
    let email = `${login}${r}@gmail.com`
    let password = `${login}${r}123`
    let hash = bcypt.hashSync(password, 10)
    return ({
        id,
        login,
        email,
        password,
        hash,
        is_verified : true,
        tocken : 1,
        user_id : id
    })
}
//id and index is the same thing, but i seperated to be more clear

const createUsers = (id, index, name, city, gender)=>{
    let age
    if(id < 50)
        age = 18 + id
    else
        age = 18 + id - 50
    let sex = gender
    let sex_orient
    if(id % 8 === 0)
        sex_orient = 'gay'
    else if(id % 7 === 0)
        sex_orient = 'bi'
    else
        sex_orient = 'straight'
    let lat = lt[index].lat
    let lon = lt[index].lon
    return ({
        id,
        name,
        age,
        sex,
        sex_orient,
        lat,
        lon,
        city
    })
}
const getDatas = async (genderIds, gender)=>{
    let len = genderIds.length
    let i = 0
    let data = {}
    let images = []
    let logins = []
    let users = []
    while(i < len){
        try{
            console.log(genderIds[i])
            let url = site.concat(genderIds[i])
            let k = await axios.get(url)
            // let k = await axios.get(siteUrl)
             let $ = cheerio.load(k.data);
             let photo_path = $('.profile__image-container').find('img').attr('src')
             let login = $('.profile__infos-title').text()
             let city = $('.profile__infos-location').text()
             images[i] = createImages(i, photo_path)
             logins[i] = createLogin(i, login)
             //users are not exactly the same as in DB
             users[i] = createUsers(i, i,login, city, gender)
             i++
        } catch(error){
            console.log('error in getDatas '+ error)
        }
 
      
    }
    
    data.images = images
    data.logins = logins
    data.users = users
    let datas = JSON.stringify(data)
    fs.writeFile(`./dummy_${gender}.json`, datas, (err)=>{
        if(err)
            console.log(err)
        else
            return console.log('ok')
    })
}
//getDatas(ids.men, 'men')
//getDatas(ids.women, 'women')

/*

dataOutput(data)
*/
/*
axios.get(siteUrl).then((res)=>{
    const $ = cheerio.load(res.data)
    let src = ($('.profile__image-container').find('img').attr('src'))
    console.log(src)
    //data.id = 0
    //data.href = src
    //const img = JSON.stringify(data)
//
    //fs.writeFile('./profiles.json', img, {'flag' : 'a'}, err =>{
    //    if(err)
    //        console.log(err)
    //    else    
    //        console.log('ok')
    //})
})
*/