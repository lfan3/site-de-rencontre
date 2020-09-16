class NotFound extends Error{
    constructor(message){
        super(message)
        this.name = 'NotFound'
        Error.captureStackTrace(this, NotFound)
    }
}

class Existed extends Error{
    constructor(message){
        super(message)
        this.name='Existed'
        Error.captureStackTrace(this, Existed)
    }
}
module.exports = {
    NotFound,
    Existed
}