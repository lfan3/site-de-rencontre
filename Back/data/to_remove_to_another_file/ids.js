const ids = [
    14849,
    33281,
    20738,
    27140,
    11781,
    33288,
    16394,
    18422,
    33291,
    35339,
    33293,
    18190,
    33294,
    25620,
    15382,
    26903,
    16665,
    13594,
    35610,
    26907,
    14367,
    20512,
    16673,
    19233,
    29217,
    34081,
    17442,
    17444,
    22052,
    16679,
    25383,
    16680
]
let gender_images = {}
let mens = [1, 2, 3, 4, 7, 15,18, 21, 26, 29, 30]
function createObj(){
    let men = ids.filter((ele, index)=> mens.includes(index))
    let women = ids.filter((ele, index)=> !mens.includes(index))
    gender_images.men = men
    gender_images.women = women
    return gender_images

}
let obj = createObj()
let Obj = JSON.stringify(obj)
const fs = require('fs')

fs.writeFileSync('../idGender.json', Obj)


module.exports = ids