const Errors = require('./errors')

function tryit(){
    throw new Errors.NotFound('not try')
}

tryit()