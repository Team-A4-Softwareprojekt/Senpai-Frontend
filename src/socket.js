// socket.js
import io from 'socket.io-client';

const URL = 'http://localhost:3000';
const socket = io(URL);


socket.on('connect', () => {
    console.log("Connected to server");
});

socket.on('Buzzer_GameFound', (data) => {
    console.log('Game found', data);
    // when data true then show next screen

});  

const startBuzzerQueue = () => {
    socket.emit('Buzzer_Queue',() => {
        // Stay in Buzzer queue 
        console.log('Buzzer queue started');
    });
};
export default startBuzzerQueue;


