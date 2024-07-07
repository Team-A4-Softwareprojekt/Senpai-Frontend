import React from 'react';
import styles from './PopUpRegistrationSuccess.module.css';

/**
 * PopUpRegistrationSuccess Component
 * 
 * This component renders a popup that informs the user their registration was successful.
 * 
 * Props:
 * - `isVisible`: Boolean indicating if the popup is visible or not.
 */
const PopUpRegistrationSuccess = ({ isVisible }) => {

  // Return null if the popup is not visible
  if (!isVisible) {
    return null;
  }

  return (
    <>
      <div className={styles.popup}>
        <p className={styles.p}>Deine Registrierung war erfolgreich!</p>
      </div>
    </>
  );
};

export default PopUpRegistrationSuccess;
