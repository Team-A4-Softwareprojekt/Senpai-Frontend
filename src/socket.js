// socket.js
import io from 'socket.io-client';

const URL = 'https://senpai-development.onrender.com/';
//const URL = 'http://localhost:3000/'; //für das lokale Testen

const socket = io(URL, {
    withCredentials: true,
    autoConnect: true// Dies ermöglicht das Senden von Cookies mit jeder Anfrage
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


// Handle custom event when a game is found
socket.on('Buzzer_GameFound', (data) => {
    console.log('Game found', data);
    // Implement logic to show the next screen when data is true
});

// Function to start the buzzer queue
const startBuzzerQueue = () => {
    console.log("Geh rein junge");
    socket.emit('Buzzer_Queue');
};

// Function to manually disconnect the socket
const disconnectSocket = () => {
    socket.disconnect();
};

// Export the socket instance, and control functions
export {startBuzzerQueue, disconnectSocket};