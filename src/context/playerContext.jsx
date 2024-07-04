import React, { createContext, useState } from 'react';

// Create a context for player data
export const PlayerContext = createContext();

/**
 * PlayerProvider Component
 * 
 * This component provides the PlayerContext to its child components.
 * It manages the state for the player's name and data, providing functions to update them.
 */
export const PlayerProvider = ({ children }) => {

    // State to hold the player's name
    const [playerName, setPlayerName] = useState('');
    
    // State to hold the player's data
    const [playerData, setPlayerData] = useState('');

    return (
        // Provide the playerName, setPlayerName, playerData, and setPlayerData to children
        <PlayerContext.Provider value={{ playerName, setPlayerName, playerData, setPlayerData }}>
            {children}
        </PlayerContext.Provider>
    );
};
