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

  public fetchUserProfileById(req: express.Request, res: express.Response) {
    let userA = req.body.userA
    let userId = req.params.userId
    console.log(userId)
    try{
      //todo:empty case
      profileService.getUserTagsIds(parseInt(userId))
      .then(result => {
        console.log(result)
        this.success(res, result);
      })
    }catch(e){
      return this.fail(res, e.toString())
    }
  }
}