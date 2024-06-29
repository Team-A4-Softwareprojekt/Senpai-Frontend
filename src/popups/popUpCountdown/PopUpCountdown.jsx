import React, { useState, useEffect } from 'react';
import styles from './PopUpCountdown.module.css';

const PopUpCountdown = ({ isVisible, closePopup, countdown }) => {
    const [timeLeft, setTimeLeft] = useState(countdown);

    useEffect(() => {
        if (!isVisible) return;

        setTimeLeft(countdown); // Setze den Countdown-Wert beim Sichtbarwerden der Komponente

        const timer = setInterval(() => {
            setTimeLeft((prevTimeLeft) => {
                if (prevTimeLeft <= 1) {
                    clearInterval(timer);
                    closePopup();
                    return 0;
                }
                return prevTimeLeft - 1;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, [isVisible, countdown, closePopup]);

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
