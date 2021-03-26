"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
//test
var index_controllers_1 = require("../controllers/index.controllers");
var express_1 = __importDefault(require("express"));
var router = express_1.default.Router();
exports.router = router;
router.post('/test', function (req, res) {
    index_controllers_1.userController.execute(req, res);
});
router.post('/test', function (req, res) {
    index_controllers_1.userController.execute(req, res);
});
