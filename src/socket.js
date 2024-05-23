const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
//const rest = require('./rest');
//const handleSocketEvents = require('./socket');

const PORT = process.env.PORT || 3000;
//const app = express();
const server = http.createServer(app);
const io = socketIO(server);
const URL = 'http://localhost:3000';
const socket = io.socket(URL);

socket.emit('connect', () => {
    console.log("Connected to server");
});

socket.on('Buzzer_GameFound', (data) => {
    console.log('Game found', data);
    // when data true then show next screen

});  

const startBuzzerQueue =  () => {
    socket.emit('Buzzer_Queue',() => {
        // Stay in Buzzer queue 
        console.log('Buzzer queue started');
    });
}
module.exports = {startBuzzerQueue, socket};
