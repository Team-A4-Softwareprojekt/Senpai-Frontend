import React, { useState, useEffect } from 'react';
import styles from './PopUpQueue.module.css';
import PopUpCountdown from '../../popups/popUpCountdown/PopUpCountdown.jsx';
import {socket} from '../../socket.js';

const PopUpQueue = ({ isVisible, selectedGameMode, closePopup }) => {
    const [opponentFound, setOpponentFound] = useState(false);
    const [countdown, setCountdown] = useState(null);

    useEffect(() => {
        socket.on('BUZZER_COUNTDOWN', handleStartCountdown);

        return () => {
            socket.off('BUZZER_COUNTDOWN', handleStartCountdown);
        };
    }, []);

    const handleStartCountdown = (seconds) => {
        setCountdown(seconds);
        setOpponentFound(true);
    };

    if (!isVisible) return null;

    return (
        <>
            {!opponentFound ? (
                <>
                    <div className={styles.overlay} />
                    <div className={styles.popup}>
                        <div className={styles.popupContent}>
                            <h2>Spielmodus:&nbsp;<span className={styles.highlighted}>{selectedGameMode}</span></h2>
                            <h2>Suche nach Gegner 
                                <span className={styles.dots}>
                                    <span className={styles.dot}>.</span>
                                    <span className={styles.dot}>.</span>
                                    <span className={styles.dot}>.</span>
                                </span>
                            </h2>
                            <button onClick={closePopup}>Abbrechen</button>
                        </div>
                    </div>
                </>
            ) : (
                <PopUpCountdown 
                    isVisible={opponentFound} 
                    closePopup={closePopup} 
                    countdown={countdown} 
                />
            )}
        </>
    );
};

export default PopUpQueue;
