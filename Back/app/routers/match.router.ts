import express from 'express'
import {matchController} from '../controllers/index.controllers'

const MatchRouter = express.Router();

MatchRouter.post('/', (req, res)=>{
    console.log(req.body.userId);
    matchController.fetchUsersPhotos(req, res);
});
//router.post('/authenticate', UserControler);


export {MatchRouter}
