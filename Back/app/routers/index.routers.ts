//test
import express from 'express'
import {UserRouter} from './user.router'
import {MatchRouter} from './match.router'

const RootRouter =express.Router();
/* collection of routes*/
//RootRouter.use('/match', MatchRouter);
RootRouter.use('/users', UserRouter);
RootRouter.use('/match', MatchRouter);


export {RootRouter};