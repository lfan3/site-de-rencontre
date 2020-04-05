/*
var ld = [
    {
        login : 'a',
        email : 'a',
        password : 'a',
        tocken : 'a',
    },
    {
        login : 'b',
        email : 'b',
        password : 'b',
        tocken : 'b',
    },
]

var us = [
    {
        age: 24,
        sex: 0,
        sex_orien: 1,
        location: {
            type : 'Point',
            coordinates: [39.807222,-76.984722]
        },
        intro :'I like dogs',
        race : 'asia'
    },
    {
        age: 24,
        sex: 0,
        sex_orien: 1,
        location: {
            type : 'Point',
            coordinates: [39.807222,-76.984722]
        },
        intro :'I like cat',
        race : 'asia'
    }
]

async function addUsers(){
    try{
        let users = await Users.bulkCreate(us);
        console.log('data insert done');
    } catch(err){
        console.log(err);
    }
}

//addUsers();
async function addUsersLogins(){
    try{
        let user = await Users.create(us[0]);
        let login = await Logins.create(ld[0]);
        await user.setLogin(login);
        console.log('data insert done');
    } catch(err){
        console.log(err);
    }
}

*/