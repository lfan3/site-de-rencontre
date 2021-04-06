import * as express from 'express'

export abstract class BaseService{

    //there is no use of express response in service
    //?is here any sens to declared in static?? do we need to call it even the object has not been constructed yet
    // public static jsonResponse (res: express.Response, statusCode: number, message: string){
    //     return res.status(statusCode).json({ message })
    // }

    // public clientError(res: express.Response, message?: string) {
    //     return BaseService.jsonResponse(res, 401, message ? message : 'some Error from client side')
    // }

    // public unauthorized(res : express.Response, message?: string){
    //     return BaseService.jsonResponse(res, 401, message ? message : 'nauthorized')
    // }
    
    // public notFound (res: express.Response, message?: string) {
    //     return BaseService.jsonResponse(res, 404, message ? message : 'Not found');
    // }

    public success<T> (model: T){
       return model;
    }

    public fail (error: string ) : Error{
        throw new Error(error);
    }

    public notFound(){
        return [];
    }
}

