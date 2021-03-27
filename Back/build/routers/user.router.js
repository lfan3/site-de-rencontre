"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRouter = void 0;
var express_1 = __importDefault(require("express"));
var index_controllers_1 = require("../controllers/index.controllers");
var UserRouter = express_1.default.Router();
exports.UserRouter = UserRouter;
UserRouter.post('/', function (req, res) {
    index_controllers_1.userController.execute(req, res);
});
