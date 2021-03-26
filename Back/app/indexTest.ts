require('dotenv').config()

// const express = require('express')
// const app = express()
// const http = require('http')
// const server = http.createServer(app)
// const path = require('path')
// const bodyParser = require('body-parser')
// const router = require('./routers/index.routers.ts')
import express from 'express';
import bodyParser from "body-parser";
import http from 'http';
import {router} from "./routers/index.routers"

const app = express();
const server = http.createServer(app);

app.use(bodyParser.json({limit : '10mb'}))
app.use(bodyParser.urlencoded({extended : true, limit : '10mb'}));

app.use(router);


//at first i use app.listen(), but that does not work
server.listen(5000, ()=>{
    console.log('running on 5000');
})
