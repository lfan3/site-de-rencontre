import * as express from 'express'

export abstract class BaseController{

    //design pattern, 
    //executeImpl takes care of the real controller logic, which will different from various of controllers
    protected abstract executeImpl (req: express.Request, res: express.Response): Promise<void | any>;

    public async execute (req: express.Request, res: express.Response):Promise<void> {
        try{
            await this.executeImpl(req, res);
        } catch(err){
            console.log("[baseController error]: " + err);
            this.fail(res, 'An unexepected error');
        }
    }

    //?is here any sens to declared in static?? do we need to call it even the object has not been constructed yet
    public static jsonResponse (res: express.Response, statusCode: number, message: string){
        return res.status(statusCode).json({ message })
    }

    public clientError(res: express.Response, message?: string) {
        return BaseController.jsonResponse(res, 401, message ? message : 'some Error from client side')
    }

    public unauthorized(res : express.Response, message?: string){
        return BaseController.jsonResponse(res, 401, message ? message : 'nauthorized')
    }
    
    public notFound (res: express.Response, message?: string) {
        return BaseController.jsonResponse(res, 404, message ? message : 'Not found');
    }

    public success<T> (res: express.Response, dto?: T){
        if(!!dto){
            res.type('application/json');
            return res.status(200).json(dto);
        } else {
            return res.sendStatus(200);
        }
    }

    public fail (res:express.Response, error: Error | string ){
        console.log(error);
        return res.status(500).json({
            message: error.toString()
        })
    }
}