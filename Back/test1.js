const bcrypt = require('bcrypt')

let a = 'a123-45'
let b = '$2b$10$6KQJlDNGNwsMvd6xSof2e.nnICG5ofLnfEBzHZn7T62gBKMXaE4dS'

let c = bcrypt.compareSync(a, b);
console.log(c)
