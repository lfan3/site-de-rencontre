//test
import {userController} from '../controllers/index.controllers'
import express from 'express'

const router =express.Router();

router.post('/test',(req, res)=>{
    userController.execute(req, res)
})

router.post('/test',(req, res)=>{
    userController.execute(req, res)
})

export {router} 