const photos = require('../photoPath').photos;
const fs = require('fs');

function avatar_generator_new(){
    let avatars = []
    for(let j=0; j <520; j++){
        let img = {photo_path : photos[j], is_profile: true, user_id : j+1};
        avatars[j] = img;
    }

    let data = JSON.stringify(avatars)
    //console.log(data)
    fs.writeFileSync('../dummy_datas/dummy_avatars.json', data)
}

avatar_generator_new();