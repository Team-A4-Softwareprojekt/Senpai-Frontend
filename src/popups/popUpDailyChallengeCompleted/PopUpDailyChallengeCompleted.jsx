import React, { useState, useEffect } from "react";
import styles from './PopUpDailyChallengeCompleted.module.css';

/**
 * PopUpDailyChallengeCompleted Component
 * 
 * This component renders a popup that notifies the user that they have already completed the daily challenge.
 * It displays a header and text message, and provides a button to close the popup.
 * 
 * Props:
 * - `isVisible`: Boolean indicating if the popup is visible or not.
 * - `header`: Optional header text for the popup.
 * - `text`: Optional text message for the popup.
 * - `closePopUp`: Function to close the popup.
 */
const PopUpDailyChallengeCompleted = ({ isVisible, header, text, closePopUp }) => {
    const [modal, setModal] = useState(false);

    // Effect to handle the visibility of the modal
    useEffect(() => {
        if (isVisible) {
            setModal(true);
        }
    }, [isVisible]);

    // Return null if the modal is not visible
    if (!modal) return null;

    // Function to toggle the modal visibility and close the popup
    const toggleModal = () => {
        setModal(false);
        closePopUp();
    }

    // Default text message if none is provided
    const defaultText = [
        "Du hast heute bereits die Daily Challenge abgeschlossen! ",
        "Komme morgen wieder um dein Wissen erneut zu testen :-)",
    ].join("");

    return (
        <div>
            <div className={styles.modal}>
                <div onClick={toggleModal} className={styles.overlay}></div>
                    <div className={styles.content}>
                        <div className={styles.header}>{header || "Daily Challenge abgeschlossen"}</div>
                        <div className={styles.text}>{text || defaultText}</div>
                    <div className={styles.buttonContainer}>
                        <button className={styles.button} onClick={toggleModal}>Schließen</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PopUpDailyChallengeCompleted;
