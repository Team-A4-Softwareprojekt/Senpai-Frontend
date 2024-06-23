import React from 'react';
import styles from './PopUpManipulation.module.css';
import { socket } from '../../socket.js';

const PopUpManipulationCorrect = ({ isVisible , closePopup}) => {

    if (!isVisible) return null;

    return (
        <>
            <div className={styles.overlay} />
            <div className={styles.popup}>
                <div className={styles.popupContent}>
                    <h2>Well done! Output matches expected result.</h2>
                    <button onClick={closePopup}>Schließen</button>
                </div>
            </div>
        </>
    );
};

export default PopUpManipulationCorrect;
