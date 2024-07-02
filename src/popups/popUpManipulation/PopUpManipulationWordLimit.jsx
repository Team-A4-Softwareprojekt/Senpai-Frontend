import React from 'react';
import styles from './PopUpManipulation.module.css';

const PopUpManipulationWordLimit = ({ isVisible, closePopUp }) => {

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
