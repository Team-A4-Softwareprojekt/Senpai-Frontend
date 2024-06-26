import React, { createContext, useState } from 'react';

export const ScoreContext = createContext();

export const ScoreProvider = ({ children }) => {
    const [ownPoints, setOwnPoints] = useState(0);
    const [opponentPoints, setOpponentPoints] = useState(0);

    return (
        <ScoreContext.Provider value={{ ownPoints, setOwnPoints, opponentPoints, setOpponentPoints }}>
            {children}
        </ScoreContext.Provider>
    );
};
