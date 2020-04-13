const bcrypt = require('bcrypt')

var hashpass = async (pass) => {
    try{
        let hash = await bcrypt.hash(pass, 10);
        return hash;
    }catch(err){
        console.log(`Error in hashpass ${err}`)
    }
}

exports.hashpass = hashpass
//or module.export = hashpass