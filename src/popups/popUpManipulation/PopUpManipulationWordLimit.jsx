import React from 'react';
import styles from './PopUpManipulation.module.css';

const PopUpManipulationWordLimit = ({ isVisible, closePopup }) => {

    if (!isVisible) return null;

    return (
        <>
            <div className={styles.popup}>
                You have exceeded the permitted number of character changes.
                <button onClick={closePopup}>Schließen</button>
            </div>
        </>
    );
};

export default PopUpManipulationWordLimit;
