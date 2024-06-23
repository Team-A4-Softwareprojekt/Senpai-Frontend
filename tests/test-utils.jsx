// src/test-utils.jsx
import React from 'react';
import { PlayerContext } from "../src/context/playerContext.jsx"; // Pfad anpassen
import { vi } from 'vitest';
import {BuzzerPlayerContext} from "../src/context/buzzerQuestionContext.jsx";
import {ManipulationPlayerContext} from "../src/context/manipulationQuestionContext.jsx"; // Importieren von Vitest

export const MockPlayerProvider = ({ children }) => {
    const mockPlayerData = {
        playerName: "Test Player",
        setPlayerData: vi.fn()
    };

    return (
        <PlayerContext.Provider value={mockPlayerData}>
            {children}
        </PlayerContext.Provider>
    );
};

export const MockBuzzerQuestionProvider = ({ children }) => {
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

export const MockSetManipulationQuestionProvider = ({ children }) => {
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