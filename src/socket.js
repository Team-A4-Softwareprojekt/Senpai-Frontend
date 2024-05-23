const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
//const rest = require('./rest');
//const handleSocketEvents = require('./socket');

const PORT = process.env.PORT || 3000;
//const app = express();
const server = http.createServer(app);
const io = socketIO(server);

