import express from 'express'
import {matchController} from '../controllers/index.controllers'

const MatchRouter = express.Router();
//rout complete /match 


MatchRouter.get('/', (req, res)=>{
    matchController.fetchAllUsersPhotos(req, res);
});

//rout complete /match/filterUsers

MatchRouter.post('/filterUsers',(req, res)=>{
    matchController.filterUsers(req, res);
})


export {MatchRouter}
