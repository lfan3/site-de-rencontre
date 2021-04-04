const faker = require('faker')
const fs = require('fs')


const all_avatars = JSON.parse(fs.readFileSync('./dummy_avatars_new.json'))
const address = JSON.parse(fs.readFileSync('./dummy_location.json'))
const races = ["asian","black","latino","white"]


function user_generator(){
    let users = []
    let orient
    for(let i=0; i<520; i++){
        if(i%9 ===0)
            orient = 'gay'
        else if(i%8 ===0)
            orient = 'bi'
        else
            orient = 'straight'
        let date = faker.date.between('1970-01-01', '2003-01-01')
        let user = {
            id : i,
            name: faker.name.firstName(),
            birthday : date.toISOString().slice(0,10),
            sex : all_avatars[i].gender,
            orient,
            lat: address[i].lat,
            lon: address[i].lon,
            city:address[i].city,
            login_id : i
        }
        users[i] = user
        console.log(i)
    }
    return users
}


let e = user_generator()
let f = JSON.stringify(e)
fs.writeFile('./dummy_user.json', f, (error)=>{
    if(error){
        console.log(error)
    }
})


