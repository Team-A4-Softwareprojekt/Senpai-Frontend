import {describe, expect, it, test, vi} from 'vitest';
import {fireEvent, render, screen} from '@testing-library/react';
import {socket, URL} from "../src/socket.js";
import {io as Client} from 'socket.io-client';
import {response} from "express";

test('the URL should be the Render URL', () => {
    console.log(URL)
    expect(URL).toBe('http://localhost:3000/');
    //expect(URL).toBe('https://senpai-development.onrender.com/');
})


test('should establish socket connection and receive CONNECTION_TEST_SUCCESSFULLY', () => {
    //socket.connect();
    socket.emit('CONNECTION_TEST');
    socket.on('CONNECTION_TEST_SUCCESSFULLY', (answer) => {
        console.log(answer);
        expect(answer).toBe(true);
    });
    //socket.disconnect()
})

/*
describe('Connection testing', () => {
    beforeAll((done) => {
        socket.connect();
    })
    afterAll(() => {
        socket.disconnect();
    });
    test('should establish socket connection and receive CONNECTION_TEST_SUCCESSFULLY', (done) => {
        // Setze das Timeout auf 10 Sekunden
        const timeout = setTimeout(() => {
            done(new Error('Timeout: Keine Antwort vom Server erhalten'));
        }, 10000);

        socket.emit('CONNECTION_TEST');

        socket.on('CONNECTION_TEST_SUCCESSFULLY', (answer) => {
            clearTimeout(timeout); // Timeout abbrechen, wenn die Antwort eintrifft
            try {
                expect(answer).toBe(true);
                done();
            } catch (error) {
                done(error);
            }
        });
    });
});

 */

test('should return true for valid test data', async () => {
    const response = await fetch('http://localhost:3000/connection_test?data=TEST');
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data).toBe(true);
});

test('should return false for invalid test data', async () => {
    const response = await fetch('http://localhost:3000/connection_test?data=INVALID');
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data).toBe(false);
});
