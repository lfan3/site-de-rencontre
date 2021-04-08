const initalStateO = {
    dayRef : 1,
    monthRef : 1,
    yearRef : 2002,
    genderRef : 'woman',
    orientRef : 'straight',
    cityRef : 'paris',
    index : 0
}
const initalState = [1,2,3]
const existedInArray = (el, arr)=>{
    let judger = false
    for(let i=0; i<arr.length; i++){
        if(arr[i] === el)
            judger = true
    }
    return judger
}
const valideTagReg = RegExp("^#[\\w@\\-(){}:\\^%,\\.]{1,10}$")
const v = valideTagReg.test('#qdf-h' )
console.log(v)

