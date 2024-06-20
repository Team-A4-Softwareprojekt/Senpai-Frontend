import React from 'react';
import styles from './PopUpManipulation.module.css';

const PopUpManipulationWrong = ({ isVisible, closePopup }) => {

    if (!isVisible) return null;

    return (
        <>
            <div className={styles.overlay} />
            <div className={styles.popup}>
                <div className={styles.popupContent}>
                    <h2>Output does not match the expected result.</h2>
                    <button onClick={closePopup}>Schließen</button>
                </div>
            </div>
        </>
    );
};

export default PopUpManipulationWrong;
