import * as express from 'express'
import { BaseController } from './base.controller';
import {profileService} from '../services/index.services';

export class ProfileController extends BaseController {

  protected async executeImpl (req: express.Request, res: express.Response):Promise<void | any> {
    try {
        const { username, password } = req.body;
        console.log(username);
        console.log(password);
      // ... Handle request by creating objects
 
    } catch (err) {
      return this.fail(res, err.toString())
    }
  }

  public fetchUserProfile(req: express.Request, res: express.Response) {
    let userA = req.body.userA
    let userId = req.params.userId
    try{
      //todo:empty case
      profileService.getBioFromUser(parseInt(userId))
      .then(result => console.log(result))
      .catch(e => 'error in profileService')
    }catch(e){
      return this.fail(res, e.toString())
    }
  }
}