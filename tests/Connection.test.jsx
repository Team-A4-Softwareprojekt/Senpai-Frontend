import {expect, test} from 'vitest';
import {socket, URL} from "../src/socket.js";

test('the URL should be the Render URL', () => {
    console.log(URL)
    //expect(URL).toBe('http://localhost:3000/');
    expect(URL).toBe('https://senpai-development.onrender.com/');
})

/*
test('should establish socket connection and receive CONNECTION_TEST_SUCCESSFULLY', () => {
    //socket.connect();
    socket.emit('CONNECTION_TEST');
    socket.on('CONNECTION_TEST_SUCCESSFULLY', (answer) => {
        console.log(answer);
        expect(answer).toBe(true);
    });
    //socket.disconnect()
})

test('should return true for valid test data', async () => {
    //const response = await fetch('http://localhost:3000/connection_test?data=TEST');
    const response = await fetch('https://senpai-development.onrender.com/connection_test?data=TEST');
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data).toBe(true);
});

test('should return false for invalid test data', async () => {
    //const response = await fetch('http://localhost:3000/connection_test?data=INVALID');
    const response = await fetch('https://senpai-development.onrender.com/connection_test?data=INVALID');
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data).toBe(false);
});
*/

