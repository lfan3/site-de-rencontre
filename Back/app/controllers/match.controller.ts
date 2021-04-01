import * as express from 'express'
import { BaseController } from './base.controller';
import { matchService } from '../services/index.services'

export class MatchController extends BaseController {

  //??fonction need to delete later if no use of this design pattern from basecontroller
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
//! not useful here
//   public fetchUserPhotosByUserId(req: express.Request, res: express.Response){
//     const {userId} = req.body;
//     try{
//         matchService.fetchUserPhotos(userId)
//         .then(res =>{
//             console.log(res);
//         })
//     }catch(err){
//         return this.fail(res, err.toString());
//     }
// }
//result are an array of photo_path (string)
  public fetchAllUsersPhotos(req: express.Request, res: express.Response){
    try{
      matchService.fetchAllUsersPhotos()
      .then(result =>{
        this.success(res, result)
      })
    }catch(err){
        return this.fail(res, err.toString());
    }
  }

  public filterUsers(req: express.Request, res: express.Response){
    try{
      if(Object.keys(req.body).length === 0)
        return this.notFound(res, 'empty request object, filter criterias not found')

      const condition = matchService.getCriterias(req.body);  

      matchService.filterUsers(condition)
      .then(result => this.success(res, result))
    }catch(err){
      return this.fail(res, 'filterUsers error ' + err.toString());
    }
  }



}