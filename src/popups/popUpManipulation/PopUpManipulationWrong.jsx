import React from 'react';
import styles from './PopUpManipulation.module.css';

/**
 * PopUpManipulationWrong Component
 * 
 * This component renders a popup that displays a message indicating that the manipulation output does not match the expected result.
 * It includes a close button to dismiss the popup.
 * 
 * Props:
 * - `isVisible`: Boolean indicating if the popup is visible or not.
 * - `closePopup`: Function to close the popup.
 */
const PopUpManipulationWrong = ({ isVisible, closePopup}) => {

    // Return null if the popup is not visible
    if (!isVisible) return null;

    return (
        <>
            <div className={styles.overlay} />
            <div className={styles.popup}>
                <div className={styles.popupContent}>
                    <h2>Das Ergebnis entspricht nicht der erwarteten Konsolenausgabe.</h2>
                    <button onClick={closePopup}>Schließen</button>
                </div>
            </div>
        </>
    );
};

export default PopUpManipulationWrong;
