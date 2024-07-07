// socket.js
import io from 'socket.io-client';
import {URL} from '../url.js';

const socket = io(URL, {
    withCredentials: true,
    autoConnect: true // Dies ermöglicht das Senden von Cookies mit jeder Anfrage
});

// Handle successful connection
socket.on('connect', () => {
    console.log("Connected to server");
});

// Handle disconnection
socket.on('disconnect', (reason) => {
    console.log(`Disconnected from server: ${reason}`);
});

// Function to start the buzzer queue
const startBuzzerQueue = (playerName) => {
    console.log("Starting buzzer queue");
    socket.emit('Buzzer_Queue', playerName);
};

const startManipulationQueue = (playerName) => {
    console.log("Starting manipulation queue");
    console.log(playerName);
    socket.emit('Manipulation_Queue', playerName);
};

const leaveBuzzerQueue = () => {
    console.log("Leaving buzzer queue");
    socket.emit('Leave_Buzzer_Queue');
};

const leaveManipulationQueue = () => {
    console.log("Leaving manipulation queue");
    socket.emit('Leave_Manipulation_Queue');
};

// Function to request a question
const requestDailyChallengeQuestion = () => {
    console.log("Requesting a daily question");
    socket.emit('REQUEST_DAILY_CHALLENGE_QUESTION');
};

// Export the socket instance, and control functions
export {socket, startBuzzerQueue, startManipulationQueue, leaveBuzzerQueue, leaveManipulationQueue, requestDailyChallengeQuestion};