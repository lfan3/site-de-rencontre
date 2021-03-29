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
      //expresso the error inside the below service catched my its own catch
      // matchService.sexOrienAgeFilter(condition)
      // .then(res => console.log(res))
      // .catch(e => console.log('here' +e))
      //expresso: all the error that accumulated in the findMachedUser (distanceCalculator) will be catch here.
      // matchService.findMatchedUsers(condition)
      // .then(res => console.log(res))
      // .catch(e => console.log('findmacheduser' +e))

      matchService.filterUsers(condition)
      .then(res => console.log(res))
      .catch(e => console.log('filterUsers' +e))
      // matchService.distanceCalculatorManuel(1, 2, 100)
      // .then(res => console.log(res))
      // .catch(e =>console.log(e))

      // matchService.getPoint()
      // .then(res => console.log(res))
      // .catch(e =>console.log(e))
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