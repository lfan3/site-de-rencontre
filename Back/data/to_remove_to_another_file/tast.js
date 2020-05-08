/*
const faker = require('faker/locale/fr')
let genders = [ 'female' , 'male' ];
let gender = faker.random.arrayElement(genders);
let name = faker.name.firstName(gender);
let avatar = faker.image.avatar(gender);
console.log(name)
console.log(gender)
console.log(avatar)
*/

const ids =  require('./idGender.js')
console.log(ids.men[0])