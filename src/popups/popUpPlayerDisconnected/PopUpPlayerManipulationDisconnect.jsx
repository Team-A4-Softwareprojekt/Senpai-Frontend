import React from 'react';
import styles from './PopUpPlayerDisconnected.module.css';

/**
 * PopUpPlayerManipulationDisconnect Component
 * 
 * This component renders a popup that informs the user their opponent has disconnected during a manipulation game.
 * The user automatically wins when this happens.
 * 
 * Props:
 * - `isVisible`: Boolean indicating if the popup is visible or not.
 */
const PopUpPlayerManipulationDisconnect = ({ isVisible}) => {

    // Return null if the popup is not visible
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
