"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require('dotenv').config();
// const express = require('express')
// const app = express()
// const http = require('http')
// const server = http.createServer(app)
// const path = require('path')
// const bodyParser = require('body-parser')
// const router = require('./routers/index.routers.ts')
var express_1 = __importDefault(require("express"));
var body_parser_1 = __importDefault(require("body-parser"));
var http_1 = __importDefault(require("http"));
var index_routers_1 = require("./routers/index.routers");
var app = express_1.default();
var server = http_1.default.createServer(app);
app.use(body_parser_1.default.json({ limit: '10mb' }));
app.use(body_parser_1.default.urlencoded({ extended: true, limit: '10mb' }));
app.use(index_routers_1.router);
//at first i use app.listen(), but that does not work
server.listen(5000, function () {
    console.log('running on 5000');
});
