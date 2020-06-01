const fs = require('fs')
const menAva = JSON.parse(fs.readFileSync('./dummy_avatars_men.json'))
const womenAva = JSON.parse(fs.readFileSync('./dummy_avatars_women.json'))

function avatar_generator(){
    let avatars = []
    let i = 0
    for(let j=0; j <menAva.length; j++){
        let img = {gender : 'man', photo_path : menAva[j].photo_path, is_profile: true, user_id : i}
        avatars[i] = img
        i++
    }
    for(let j=0; j <womenAva.length; j++){
        let img = {gender : 'woman', photo_path : womenAva[j].photo_path, is_profile: true, user_id : i}
        avatars[i] = img
        i++
    }
    let data = JSON.stringify(avatars)
    //console.log(data)
    fs.writeFileSync('./dummy_avatars_all.json', data)
}
//avatar_generator()