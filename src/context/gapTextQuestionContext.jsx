import React, { createContext, useState } from 'react';

export const GapTextContext = createContext();

export const GapTextProvider = ({ children }) => {
    const [questionGT, setQuestionGT] = useState(null);
    const [blankIndices, setBlankIndices] = useState(null);

    return (
        <GapTextContext.Provider value={{ questionGT, setQuestionGT, blankIndices, setBlankIndices}}>
            {children}
        </GapTextContext.Provider>
    );
};