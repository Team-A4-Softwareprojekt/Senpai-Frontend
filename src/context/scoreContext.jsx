import React, { createContext, useState } from 'react';

// Create a context for storing and updating scores
export const ScoreContext = createContext();

/**
 * ScoreProvider Component
 * 
 * This component provides the ScoreContext to its child components.
 * It manages the state for the player's own points and the opponent's points,
 * and provides functions to update these points.
 */
export const ScoreProvider = ({ children }) => {

    // State to hold the player's own points
    const [ownPoints, setOwnPoints] = useState(0);
    
    // State to hold the opponent's points
    const [opponentPoints, setOpponentPoints] = useState(0);

    return (
        // Provide the ownPoints, setOwnPoints, opponentPoints, and setOpponentPoints to children
        <ScoreContext.Provider value={{ ownPoints, setOwnPoints, opponentPoints, setOpponentPoints }}>
            {children}
        </ScoreContext.Provider>
    );
};
