import React, { useState, useEffect } from 'react';
import styles from './PopUpQueue.module.css';
import PopUpCountdown from '../../popups/popUpCountdown/PopUpCountdown.jsx';
import {socket} from '../../socket.js';

/**
 * PopUpQueue Component
 * 
 * This component renders a popup that indicates the user is in a queue waiting for an opponent.
 * It also handles the event when an opponent is found and starts a countdown.
 * 
 * Props:
 * - `isVisible`: Boolean indicating if the popup is visible or not.
 * - `selectedGameMode`: The selected game mode for which the user is waiting.
 * - `closePopUp`: Function to close the popup.
 */
const PopUpQueue = ({ isVisible, selectedGameMode, closePopUp }) => {
    const [opponentFound, setOpponentFound] = useState(false);
    const [countdown, setCountdown] = useState(null);

    // Set up the event listener for the countdown when the component mounts
    useEffect(() => {
        socket.on('BUZZER_COUNTDOWN', handleStartCountdown);

        // Clean up the event listener when the component unmounts
        return () => {
            socket.off('BUZZER_COUNTDOWN', handleStartCountdown);
        };
    }, []);

    // Handle the start of the countdown when an opponent is found
    const handleStartCountdown = (seconds) => {
        setCountdown(seconds);
        setOpponentFound(true);
    };

    // Return null if the popup is not visible
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
                            <button onClick={closePopUp}>Abbrechen</button>
                        </div>
                    </div>
                </>
            ) : (
                // Display the countdown popup when an opponent is found
                <PopUpCountdown 
                    isVisible={opponentFound} 
                    closePopUp={closePopUp} 
                    countdown={countdown} 
                />
            )}
        </>
    );
};

export default PopUpQueue;
