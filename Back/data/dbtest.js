let now = new Date()
let birth = new Date('1996-01-01')
let di = new Date(now - birth)
console.log(di.getUTCFullYear() -1970)
