import * as express from 'express'
import { BaseController } from './base.controller';

export class ProfileController extends BaseController {

  protected async executeImpl (req: express.Request, res: express.Response): Promise<void | any> {
    try {
        const { username, password } = req.body;
        console.log(username);
        console.log(password);
      // ... Handle request by creating objects
 
    } catch (err) {
      return this.fail(res, err.toString())
    }
  }

  public getUserById(req: express.Request, res: express.Response):Promise<void | Error> {
    try{
      
    }catch(e){

    }
  }
}