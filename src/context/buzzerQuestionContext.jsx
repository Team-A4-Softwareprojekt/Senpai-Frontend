import React, { createContext, useState } from 'react';

// Erstellen Sie den Kontext
export const BuzzerPlayerContext = createContext();

// Erstellen Sie den Provider
export const BuzzerQuestionProvider = ({ children }) => {
    const [buzzerQuestion, setBuzzerQuestion] = useState(null);

    return (
        <BuzzerPlayerContext.Provider value={{ buzzerQuestion, setBuzzerQuestion }}>
            {children}
        </BuzzerPlayerContext.Provider>
    );
};