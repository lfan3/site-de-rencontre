const cheerio = require('cheerio')
const axios = require('axios')
const site = 'https://gangz.io/profile/'
const siteUrl = 'https://gangz.io/profile/14849'
const profileurl = 'https://unsplash.com/s/photos/profile'
const fs = require('fs')
const ids =  require('./ids')
const hashpass = require('../utilites/hashpass').hashpass
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

const createLogin = (id, login)=>{
    let email = `${login}@gmail.com`
    let password = `${login}123`
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

const createUsers = (id, index, name, city)=>{
    let age = 18 + id
    let mens = [1, 2, 3, 4, 7, 15,18, 21, 26, 29, 30]
    let sex
    if(mens.includes(id))
        sex = 'man'
    else
        sex = 'woman'
    let gay = [1, 3,  18, 20, 29, 15, 31]
    let bi = [5, 7, 9, 11, 16, 2]
    let sex_orient
    if(gay.includes(id))
        sex_orient = 'straight'
    else if(bi.includes(id)) 
        sex_orient = 'bi'
    else
        sex_orient = 'gay'
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
const getDatas = async ()=>{
    let len = ids.length
    let i = 0
    let data = {}
    let images = []
    let logins = []
    let users = []
    while(i < len){
        let k = await axios.get(site.concat(ids[i]))
       // let k = await axios.get(siteUrl)
        let $ = cheerio.load(k.data);
        let photo_path = $('.profile__image-container').find('img').attr('src')
        let login = $('.profile__infos-title').text()
        let city = $('.profile__infos-location').text()
        images[i] = createImages(i, photo_path)
        console.log(login)
        logins[i] = createLogin(i, login)
        //users are not exactly the same as in DB
        users[i] = createUsers(i, i,login, city)
        i++
    }
    
    data.images = images
    data.logins = logins
    data.users = users
    let datas = JSON.stringify(data)
    fs.writeFile('./dummy.json', datas, (err)=>{
        if(err)
            console.log(err)
        else
            return console.log('ok')
    })
}
getDatas()

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