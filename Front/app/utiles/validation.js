export const valideEmailReg = RegExp("^[\\w.!#$%&'*+/=?^`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$")
export const valideUsernameReg = RegExp("^[0-9a-zA-Z][\\w\\d\\-]{1,8}[0-9a-zA-Z]$")
export const validePassReg = RegExp("^(?=.*[A-Z])(?=.*[0-9])(?=.*[$@£])(?!.*[\"\|&+=`%*~\\\\><?])\\S{6,20}$")
export const valideNumReg = RegExp("^\d+$")
export const valideTagReg = RegExp("^#[\\w@\\-(){}:\\^%,\\.]{1,10}$")
export const valideNameReg = RegExp("^[a-zA-Z]{1,20}([\\t]|[\\-]){0,3}[a-zA-Z]{0,20}")
//! Test Email
/*
* " !"#$%&'()*+,-./:;<=>?@[\]^_`{|}~" (the first one is espace) , these are allowed caracter for passwordfiles
*/
// ! TEST Username
/* 
* case insensible
* begin with letter or number
* _ , - can not be found at the begining or end
* max 10 min 3
*/

//! TEST PassReg
/*
* min 6 signs, max 20
* \w, \d, -, @, $, £, 
* at least 10 caracters: (?=.{10,}$)
* at lesat a lowercase (?=.*[a-z])
* must contain at least a uppercase letter, and a lowercase letter, a digit and a special caracters
*/

export function emptyInput(stats){
    for(let [key, value] of Object.entries(stats)){
        if(value === '')
            return true
    }
    return false
}

export function valideForm(errObj){
    let valide = 'true';
    for(let [key, value] of Object.entries(errObj)){
        if(value !== '')
            valide = false
    }
    return valide
}

export function valideUsername(username){
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

export function validePass(passwd){
    let reg = validePassReg.test(passwd)
    if(!reg)
        return('password must contain 6-20 caracters \
        one upperCase, one lowercase, one number,\
        one special caracter from $ @ £,\
        not allowed caracters are ""\|&+=``%*~><?'
        )
    return('')
}

export function valideEmail(email){
    let reg = valideEmailReg.test(email)
    if(!reg)
        return 'The email is not valide, try another email'
    else
        return ''
}

export function stringCompare(pass, confpass){
    let diff = pass.localeCompare(confpass)
    if(diff)
        return('The two passwords are not the same')
    return('')
}

export function formContentChecker(state){
    let {email, password} = state
    let error = {}
    error.email = valideEmailReg.test(email)?null:'It is not a valide email'
    error.password = validePass(password)===''?null:'This password is not correct'
    return error
}
