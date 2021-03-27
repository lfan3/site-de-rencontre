import * as express from 'express'
import { BaseController } from './base.controller';
import { matchService } from '../services/index.services'

export class MatchController extends BaseController {

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

  public fetchUsersPhotos(req: express.Request, res: express.Response){
      //todo the api is called on main, need to change that from front part
      //make fetchuserphotos to service
      //adapte the success on basecontroller
      //fetchUser is a test, need to get fetchusersphoto
    try{
        const {userId} = req.body;
        matchService.fetchUserPhotos(userId)
        .then(res =>{
            console.log(res);
        })
    }catch(err){
        return this.fail(res, err.toString());
    }
  }



}