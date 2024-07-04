import React from 'react';
import styles from './PopUpPasswordChangeSuccess.module.css';

/**
 * PopUpPasswordChangeSuccess Component
 * 
 * This component renders a popup that informs the user they have successfully changed their password.
 * 
 * Props:
 * - `isVisible`: Boolean indicating if the popup is visible or not.
 */
const PopUpPasswordChangeSuccess = ({ isVisible }) => {

  // Return null if the popup is not visible
  if (!isVisible) {
    return null;
  }

  return (
    <>
      <div className={styles.popup}>
        <p className={styles.p}>Du hast dein Passwort erfolgreich geändert!</p>
      </div>
    </>
  );
};

export default PopUpPasswordChangeSuccess;
