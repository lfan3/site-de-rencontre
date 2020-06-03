class NotFound extends Error{
    constructor(message){
        super(message)
        this.name = 'NotFound'
        Error.captureStackTrace(this, NotFound)
    }
}

module.exports = {
    NotFound
}