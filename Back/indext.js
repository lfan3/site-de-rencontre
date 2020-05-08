const http = require('http');
const express = require('express');
const socketio = require('socket.io');
const cors = require('cors');



const router = require('./router');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

app.use(cors());
app.use(router);

io.on('connect', (socket) => {
  console.log('regdsq')
  });

  server.listen(process.env.PORT || 5001, () => console.log(`Server has started.`));
