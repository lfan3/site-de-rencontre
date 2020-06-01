let name = 'james -anna '
let c = name.trim()
let d = name.split('-')
let f = name.includes('-')

function reformName(name){

    let nameArr = name.split(' ')
    let names = nameArr.map((name)=>name.trim())
    console.log(names)
    let newName = names.join(' ')
    console.log(newName)
    return newName
}

let n = reformName(name)