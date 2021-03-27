import express from 'express'
import {matchController} from '../controllers/index.controllers'

const MatchRouter = express.Router();
//rout complete /match 
MatchRouter.post('/', (req, res)=>{
    console.log(req.body.userId);
    matchController.fetchUsersPhotos(req, res);
});

//rout complete /match/filterUsers

MatchRouter.post('/filterUsers',(req, res)=>{
    matchController.filterUsers(req);
})


export {MatchRouter}
