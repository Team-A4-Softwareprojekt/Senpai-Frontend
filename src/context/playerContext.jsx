import React, { createContext, useState } from 'react';

export const PlayerContext = createContext();

export const PlayerProvider = ({ children }) => {
    const [playerName, setPlayerName] = useState('');
    const [playerData, setPlayerData] = useState({ subscribed: false, lives: 0 });

    return (
        <PlayerContext.Provider value={{ playerName, setPlayerName, playerData, setPlayerData }}>
            {children}
        </PlayerContext.Provider>
    );
};
