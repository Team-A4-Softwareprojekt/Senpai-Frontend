// socket.js
import io from 'socket.io-client';

const URL = 'https://senpai-development.onrender.com/';
const socket = io(URL, {
    autoConnect: false, // Delay connection until manually initiated
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
    socket.emit('Buzzer_Queue', () => {
        console.log('Buzzer queue started');
    });
};

// Function to manually connect the socket
const connectSocket = () => {
    socket.connect()
    console.log("test");
};

// Function to manually disconnect the socket
const disconnectSocket = () => {
    socket.disconnect();
};

// Export the socket instance, and control functions
export {connectSocket, startBuzzerQueue, disconnectSocket};