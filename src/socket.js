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
    // Attempt reconnection logic if needed
});

// Handle timer updates
socket.on('TIMER', (timeLeft) => {
    console.log('Time left:', timeLeft);
    // Implement logic to update the timer on the UI
});

// Handle prompt to pick an answer
socket.on('PICK_ANSWER', () => {
    console.log('You buzzed! Pick an answer');
    // Implement logic to allow the player to pick an answer
});

// Handle waiting for opponent to answer
socket.on('WAIT_FOR_OPPONENT', () => {
    console.log('Waiting for opponent to answer');
    // Implement logic to display a waiting message or spinner on the UI
});

 // Handle game result
socket.on('RESULT', (result) => {
    console.log('Game result:', result);
    // Implement logic to display the result to the player
});

// Handle end game event
socket.on('END_GAME', () => {
    console.log('Game ended');
    // Implement logic to end the game and show final results or reset UI
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

// Function to send AWAIT_QUESTION event
const requestQuestion = () => {
    console.log("Requesting a question");
    socket.emit('AWAIT_QUESTION');
};

const requestDailyChallengeQuestion = () => {
    console.log("Requesting a daily question");
    socket.emit('REQUEST_DAILY_CHALLENGE_QUESTION');
};

// Function to send PLAYER_BUZZERED event
const playerBuzzed = () => {
    console.log("Player buzzed");
    socket.emit('PLAYER_BUZZERED');
};

// Function to send COMPARE_ANSWER event
const compareAnswer = (answer) => {
    console.log("Comparing answer:", answer);
    socket.emit('COMPARE_ANSWER', answer);
};

// Function to manually disconnect the socket
const disconnectSocket = () => {
    socket.disconnect();
};

// Export the socket instance, and control functions
export {socket, startBuzzerQueue, startManipulationQueue, leaveBuzzerQueue, leaveManipulationQueue, requestQuestion, playerBuzzed, compareAnswer, disconnectSocket, requestDailyChallengeQuestion};