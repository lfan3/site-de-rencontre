//test
import express from 'express'
import {ProfileRouter} from './profile.router'
import {MatchRouter} from './match.router'

const RootRouter =express.Router();
/* collection of routes*/
//RootRouter.use('/match', MatchRouter);
RootRouter.use('/profile', ProfileRouter);
RootRouter.use('/match', MatchRouter);


export {RootRouter};