import React from 'react';
import styles from './PopUpManipulation.module.css';

/**
 * PopUpManipulationWordLimit Component
 * 
 * This component renders a popup that displays a message indicating that the word limit has been exceeded.
 * It includes a button to confirm and close the popup.
 * 
 * Props:
 * - `isVisible`: Boolean indicating if the popup is visible or not.
 * - `closePopUp`: Function to close the popup.
 */
const PopUpManipulationWordLimit = ({ isVisible, closePopUp }) => {

    // Return null if the popup is not visible
    if (!isVisible) return null;

    return (
        <>
            <div className={styles.popup}>
                <div className={styles.infoText}>
                    Du hast die zulässige Anzahl von Zeichenänderungen überschritten.
                </div>
                <div className={styles.buttonContainer}>
                    <button className={styles.confirmButton} onClick={closePopUp}>Bestätigen</button>
                </div>
            </div>
        </>
    );
};

export default PopUpManipulationWordLimit;
