import React from 'react';
import styles from './PopUpPasswordChangeSuccess.module.css';

const PopUpPasswordChangeSuccess = ({ isVisible }) => {

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
