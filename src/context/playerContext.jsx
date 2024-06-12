import React, { createContext, useState } from 'react';

export const PlayerContext = createContext();

export const PlayerProvider = ({ children }) => {
    const [playerName, setPlayerName] = useState('');
    const [playerData, setPlayerData] = useState(null);

    return (
        <PlayerContext.Provider value={{ playerName, setPlayerName, playerData, setPlayerData }}>
            {children}
        </PlayerContext.Provider>
    );
};
