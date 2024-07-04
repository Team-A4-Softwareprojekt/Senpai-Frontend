import React, { useEffect } from 'react';
import styles from './PopUpPlayerDisconnected.module.css';

const PopUpPlayerManipulationDisconnect = ({ isVisible}) => {

    if (!isVisible) {
        return null;
    }

    return (
        <>
            <div className={styles.popup}>
                <p className={styles.p}>Dein Gegner hat das Spiel verlassen!</p>
                <p className={styles.p}>Dadurch gewinnst du automatisch.</p>
            </div>
        </>
    );
};

export default PopUpPlayerManipulationDisconnect;
