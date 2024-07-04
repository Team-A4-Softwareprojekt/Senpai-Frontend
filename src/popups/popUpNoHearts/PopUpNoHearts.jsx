import React, { useState, useEffect } from "react";
import styles from './PopUpNoHearts.module.css';

/**
 * PopUpNoHearts Component
 * 
 * This component renders a popup that informs the user that they have run out of hearts.
 * It includes a message and a button to close the popup.
 * 
 * Props:
 * - `isVisible`: Boolean indicating if the popup is visible or not.
 * - `header`: Optional header text for the popup.
 * - `text`: Optional text message for the popup.
 * - `closePopUp`: Function to close the popup.
 */
const PopUpNoHearts = ({ isVisible, header, text, closePopUp }) => {
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
        "Du hast nicht mehr genug Herzen um weiterzuspielen. ",
        "Deine Herzen werden nach 24 Stunden wieder automatisch aufgefüllt. ",
        "Wenn du Premium kaufst, dann sind deine Herzen unbegrenzt und ",
        "du kannst so viel spielen wie du möchtest :-)"
    ].join("");

    return (
        <div>
            <div className={styles.modal}>
                <div onClick={toggleModal} className={styles.overlay}></div>
                    <div className={styles.content}>
                        <div className={styles.header}>{header || "Herzen aufgebraucht"}</div>
                        <div className={styles.text}>{text || defaultText}</div>
                    <div className={styles.buttonContainer}>
                        <button className={styles.button} onClick={toggleModal}>Schließen</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PopUpNoHearts;
