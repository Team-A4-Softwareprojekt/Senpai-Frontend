import React from 'react';
import styles from './PopUpManipulation.module.css';

const PopUpManipulationWordLimit = ({ isVisible, closePopup }) => {

    if (!isVisible) return null;

    return (
        <>
            <div className={styles.overlay} />
            <div className={styles.popup}>
                <div className={styles.popupContent}>
                    <h2>You have exceeded the permitted number of character changes.</h2>
                    <button onClick={closePopup}>Schließen</button>
                </div>
            </div>
        </>
    );
};

export default PopUpManipulationWordLimit;
