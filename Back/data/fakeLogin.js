const bcypt = require('bcrypt')
const {v4 : uuidv4} = require('uuid')
const fs = require('fs')
const faker = require('faker')


function login_generator(){
    let logins = []
    for(let i=0; i < 520; i++){
        let user = faker.helpers.userCard()
        let username = user.username
        let password = `${username}123`
        let hash = bcypt.hashSync(password, 10)
        let login = {
            id : i,
            login : username,
            email: user.email,
            password : hash,
            is_verified : true,
            tocken : uuidv4(),
            user_id : i
        }
        logins[i] = login
    }
    return logins
}

let c = login_generator()
let d = JSON.stringify(c)
fs.writeFile('./dummy_login.json', d, (error)=>{
    if(error){
        console.log(error)
    }
    console.log(c[0])
})