"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MatchRouter = void 0;
var express_1 = __importDefault(require("express"));
var index_controllers_1 = require("../controllers/index.controllers");
var MatchRouter = express_1.default.Router();
exports.MatchRouter = MatchRouter;
MatchRouter.post('/', function (req, res) {
    console.log(req.body.userId);
    index_controllers_1.matchController.fetchUsersPhotos(req, res);
});
