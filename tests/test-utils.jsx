// src/test-utils.jsx
import React from 'react';
import {PlayerContext} from "../src/context/playerContext.jsx"; // Pfad anpassen
import {vi} from 'vitest';
import {BuzzerPlayerContext} from "../src/context/buzzerQuestionContext.jsx";
import {ManipulationPlayerContext} from "../src/context/manipulationQuestionContext.jsx"; // Importieren von Vitest

export const MockPlayerProvider = ({children}) => {

    const mockPlayerName = {
        playerName: "Test Player",
        setPlayerName: vi.fn()
    };

    const mockPlayerData = {
        setPlayerData: vi.fn()
    };

    const playerData = {
        credit: 5,
        email:
            "changed@mail.de",
        lives:
            1,
        missedstreak:
            "2024-06-30T22:00:00.000Z",
        playerid:
            59,
        playername:
            "Peter",
        playerpassword:
            "$2b$10$3NJT7yGHn9Kg21yR/TUeDOBksiGXAtWxkRON1iAxXLKUVETW6HDrO",
        playersecurityquestion:
            "Wie hieß Ihr Klassenlehrer in der Grundschule?",
        rank:
            0,
        securityquestionresponse:
            "Peter",
        streaktoday:
            true,
        subenddate:
            null,
        subscribed:
            false
    }

    return (
        <PlayerContext.Provider value={{mockPlayerData, mockPlayerName, playerData}}>
            {children}
        </PlayerContext.Provider>
    );
};

export const MockBuzzerQuestionProvider = ({children}) => {
    const mockBuzzerQuestionData = {
        BuzzerQuestion: "Dies ist eine sehr lange Frage zum testen",
        setPlayerData: vi.fn()
    };

    return (
        <BuzzerPlayerContext.Provider value={mockBuzzerQuestionData}>
            {children}
        </BuzzerPlayerContext.Provider>
    );
};

export const MockSetManipulationQuestionProvider = ({children}) => {
    const mockManipulationQuestionData = {
        manipulationQuestion: "Dies ist die Manipulation question",
        setManipulationQuestion: vi.fn()
    };

    return (
        <ManipulationPlayerContext.Provider value={mockManipulationQuestionData}>
            {children}
        </ManipulationPlayerContext.Provider>
    );
};