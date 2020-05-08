let a = new Date().toISOString()
let b = a.slice(0,19).replace('T', ' ')
console.log(b)