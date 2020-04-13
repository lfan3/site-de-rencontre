let a = {
    id : 1,
    sex : 'wman'
}

let b = {
    id : 2,
    sex : 'woman'
}

let c = [a, b]
let k = c.filter((each)=>each.id===1 && each.sex ==='woman')
console.log(k)