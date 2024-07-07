import React, { useEffect } from 'react';
import styles from './PopUpPlayerDisconnected.module.css';

/**
 * PopUpPlayerBuzzerDisconnect Component
 * 
 * This component renders a popup that informs the user their opponent has disconnected.
 * If the popup is visible, it also resets the round counter.
 * 
 * Props:
 * - `isVisible`: Boolean indicating if the popup is visible or not.
 * - `resetRoundCounter`: Function to reset the round counter.
 */
const PopUpPlayerBuzzerDisconnect = ({ isVisible, resetRoundCounter }) => {

  // UseEffect hook to reset the round counter when the popup becomes visible
  useEffect(() => {
    if (isVisible) {
      resetRoundCounter();
    }
  }, [isVisible, resetRoundCounter]);

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

export default PopUpPlayerBuzzerDisconnect;
