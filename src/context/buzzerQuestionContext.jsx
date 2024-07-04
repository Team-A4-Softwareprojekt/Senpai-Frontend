import React, { createContext, useState } from 'react';

// Create a context for the buzzer question
export const BuzzerPlayerContext = createContext();

/**
 * BuzzerQuestionProvider Component
 * 
 * This component provides the BuzzerPlayerContext to its child components.
 * It manages the state for the buzzer question and provides a way to update it.
 */
export const BuzzerQuestionProvider = ({ children }) => {
    
    // State to hold the current buzzer question
    const [buzzerQuestion, setBuzzerQuestion] = useState(null);

    return (
        // Provide the buzzerQuestion state and setBuzzerQuestion function to children
        <BuzzerPlayerContext.Provider value={{ buzzerQuestion, setBuzzerQuestion }}>
            {children}
        </BuzzerPlayerContext.Provider>
    );
};