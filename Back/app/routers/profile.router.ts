import express from 'express'
import {profileController} from '../controllers/index.controllers'

const ProfileRouter = express.Router();

ProfileRouter.post('/:userId', (req, res)=>{
    profileController.fetchUserProfile(req, res);
})

ProfileRouter.get('/', (req, res)=>{
    res.send('hello')
})



export {ProfileRouter};