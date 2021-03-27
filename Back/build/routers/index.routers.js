"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RootRouter = void 0;
//test
var express_1 = __importDefault(require("express"));
var user_router_1 = require("./user.router");
var match_router_1 = require("./match.router");
var RootRouter = express_1.default.Router();
exports.RootRouter = RootRouter;
/* collection of routes*/
//RootRouter.use('/match', MatchRouter);
RootRouter.use('/users', user_router_1.UserRouter);
RootRouter.use('/match', match_router_1.MatchRouter);
