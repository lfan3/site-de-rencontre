function emptyInput(stats){
    for(let [key, value] of Object.entries(stats)){
        if(value === '')
            return true
    }
    return false
}

function valideUsername(username){
    let reg = valideUsernameReg.test(username)
    if(!reg)
        return([
            'username begins with a letter or a number,',
            'special caracter _ and - can be used to link the letters or numbers,',
            'except the - and _, others specials caracters are not allowed,',
            'username contains from 3 to 10 caracters.'
        ])
    return([])
}
/*
function validePass(passwd){
    let reg = validePassReg.test(passwd)
    if(!reg)
        return('password must contain 6-20 caracters \
        one upperCase, one lowercase, one number,\
        one special caracter from $ @ £,\
        not allowed caracters are ""\|&+=``%*~><?'
        )
    return('')
}
function valideEmail(email){
    let reg = valideEmailReg.test(email)
    if(!reg)
        return 'The email is not valide, try another email'
    else
        return ''
}
*/
function stringCompare(pass, confpass){
    let diff = pass.localeCompare(confpass)
    if(diff)
        return('The two passwords are not the same')
    return('')
}

function formContentChecker(state){
    let {email, password} = state
    let error = {}
    error.email = valideEmailReg.test(email)?null:'It is not a valide email'
    error.password = validePass(password)===''?null:'This password is not correct'
    return error
}

exports.valideEmailReg = RegExp("^[\\w.!#$%&'*+/=?^`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$")
exports.valideUsernameReg = RegExp("^[0-9a-zA-Z][\\w\\d\\-]{1,8}[0-9a-zA-Z]$")
exports.validePassReg = RegExp("^(?=.*[A-Z])(?=.*[0-9])(?=.*[$@£])(?!.*[\"\|&+=`%*~\\\\><?])\\S{6,20}$")
exports.valideNumReg = RegExp("^\d+$")
exports.valideTagReg = RegExp("^#[\\w@\\-(){}:\\^%,\\.]{1,10}$")
exports.valideNameReg = RegExp("^[a-zA-Z]{1,20}([\\t]|[\\-]){0,3}[a-zA-Z]{0,20}")

