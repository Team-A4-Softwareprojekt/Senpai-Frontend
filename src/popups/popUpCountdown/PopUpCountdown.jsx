import React, { useState, useEffect } from 'react';
import styles from './PopUpCountdown.module.css';

/**
 * PopUpCountdown Component
 * 
 * This component renders a popup with a countdown timer. It is used to notify the user that a game is about to start.
 * The timer counts down from the initial `countdown` value and closes the popup when it reaches zero.
 * 
 * Props:
 * - `isVisible`: Boolean indicating if the popup is visible or not.
 * - `closePopUp`: Function to close the popup.
 * - `countdown`: Initial countdown value in seconds.
 */
const PopUpCountdown = ({ isVisible, closePopUp, countdown }) => {
    const [timeLeft, setTimeLeft] = useState(countdown);

    useEffect(() => {
        // If the popup is not visible, return early
        if (!isVisible) return;

        // Set the initial time left to the countdown value
        setTimeLeft(countdown);

        // Create a timer that updates the time left every second
        const timer = setInterval(() => {
            setTimeLeft((prevTimeLeft) => {
                // If the time left is 1 second or less, clear the timer and close the popup
                if (prevTimeLeft <= 1) {
                    clearInterval(timer);
                    closePopUp();
                    return 0;
                }
                // Decrease the time left by 1 second
                return prevTimeLeft - 1;
            });
        }, 1000);

        // Cleanup the timer when the component unmounts or dependencies change
        return () => clearInterval(timer);
    }, [isVisible, countdown, closePopUp]);

    // If the popup is not visible, return null
    if (!isVisible) return null;

    return (
        <>
            <div className={styles.overlay} />
            <div className={styles.popup}>
                <div className={styles.popupContent}>
                    <h2>Gegner gefunden!</h2>
                    <h2>Spiel startet in&nbsp; 
                        <span className={styles.timeleft}>{timeLeft}</span></h2>
                </div>
            </div>
        </>
    );
};

export default PopUpCountdown;
