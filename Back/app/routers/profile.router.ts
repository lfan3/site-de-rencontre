import express from 'express'
import {profileController} from '../controllers/index.controllers'

const ProfileRouter = express.Router();



ProfileRouter.post('/profile/:userId', (req, res)=>{
    profileController.getUserById(req, res);
})



export {ProfileRouter};