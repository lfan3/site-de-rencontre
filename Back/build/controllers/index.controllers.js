"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.matchController = exports.userController = void 0;
var user_controller_1 = require("./user.controller");
var match_controller_1 = require("./match.controller");
exports.userController = new user_controller_1.UserController();
exports.matchController = new match_controller_1.MatchController();
