import React, { createContext, useState } from 'react';

// Create a context for gap text questions
export const GapTextContext = createContext();

/**
 * GapTextProvider Component
 * 
 * This component provides the GapTextContext to its child components.
 * It manages the state for the gap text question and the indices of blanks within the question.
 */
export const GapTextProvider = ({ children }) => {

    // State to hold the current gap text question
    const [questionGT, setQuestionGT] = useState(null);
    
    // State to hold the indices of the blanks within the gap text question
    const [blankIndices, setBlankIndices] = useState(null);

    return (
        // Provide the questionGT, setQuestionGT, blankIndices, and setBlankIndices to children
        <GapTextContext.Provider value={{ questionGT, setQuestionGT, blankIndices, setBlankIndices }}>
            {children}
        </GapTextContext.Provider>
    );
};
