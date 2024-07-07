import {expect, test} from 'vitest';
import {socket} from "../src/socket.js";
import {URL} from "../url.js";

test('the URL should be the Render URL', () => {
    console.log(URL)
    expect(URL).toBe('https://senpai-server.onrender.com');
})


test('should establish socket connection and receive CONNECTION_TEST_SUCCESSFULLY', () => {
    socket.emit('CONNECTION_TEST');
    socket.on('CONNECTION_TEST_SUCCESSFULLY', (answer) => {
        console.log(answer);
        expect(answer).toBe(true);
    });
})

test('should return true for valid test data', async () => {
    const response = await fetch(URL + '/connection_test?data=TEST');
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data).toBe(true);
});

test('should return false for invalid test data', async () => {
    const response = await fetch(URL + '/connection_test?data=INVALID');
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data).toBe(false);
});


