import express from 'express'
import {userController} from '../controllers/index.controllers'

const UserRouter = express.Router();

UserRouter.post('/', (req, res)=>{
    userController.execute(req, res);
});

export {UserRouter};