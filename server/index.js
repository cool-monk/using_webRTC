const express = require('express');
require('dotenv').config();
const cors = require('cors');
var socketio = require('socket.io');
const http = require('http');
var ss = require('socket.io-stream');
var path = require('path');
const route = require('./router');
const fs = require('fs');

const app = express();
const port = process.env.PORT || 8000;

const server = http.createServer(app);
const io = socketio(server);

app.use(cors());
app.use(express.json());
app.use('/', route);

// Secket codes here
io.on('connection', (socket) => {
  console.log('a user connected');

  // events
  socket.on('stream Sending', (data, callback) => {
    console.log('we have data here', data);
  });

  // Direct stream to data
  ss(socket).on('dataStream', function (stream) {
    console.log('connection received', stream);
    const dataBuffer = new Buffer(stream, ArrayBuffer);
    const fileStream = fs.createWriteStream('finalvideo.webm', { flags: 'a' });
    fileStream.write(dataBuffer);
    // const writeStream = fs.createWriteStream('abc.txt');
    // stream.pipe(writeStream);f
    // console.log(stream);
  });

  socket.on('disconnect', () => {
    console.log('user just got disconnected');
  });
});

server.listen(port, () => {
  console.log(`server has started on the port ${port}`);
});
