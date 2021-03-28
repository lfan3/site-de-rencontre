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

  public fetchUserPhotosByUserId(req: express.Request, res: express.Response){
    //todo adapte the success on basecontroller
    const {userId} = req.body;
    try{
        matchService.fetchUserPhotos(userId)
        .then(res =>{
            console.log(res);
        })
    }catch(err){
        return this.fail(res, err.toString());
    }
}

  public fetchUsersPhotos(req: express.Request, res: express.Response){
    try{
      //todo 
    }catch(err){
        return this.fail(res, err.toString());
    }
  }

  public filterUsers(req: express.Request, res: express.Response){
    try{
      if(Object.keys(req.body).length === 0)
        return this.notFound(res, 'empty request object, filter criterias not found')
      const condition = matchService.getCriterias(req.body);    
      //...todo...
      console.log('sex' in condition);
    }catch(err){
      return this.fail(res, err.toString());
    }
  }
//   //router.post('/authenticate', UserControler);
// router.post('/filterUsers', async(req, res)=>{
//   let conditions = getCriterias(req.body)
//   console.log('inside filterUsers')
//   let users = await filterUsers(conditions)
//   //let users = await fetchUserFromId(22)
//   //setTimeout(foo().then((res)=>res.send('ok')), 300)
//   res.send(users)
//   //filterUsers(conditions).then((result)=>{
//   //    console.log(result[0])
//   //    res.send(result)
//   //}).catch((error)=>{
//   //    console.log('error in post filterUsers '+error)
//   //})
// })



}