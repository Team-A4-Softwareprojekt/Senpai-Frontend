import React from 'react';
import styles from './PopUpRegistrationSuccess.module.css';

const PopUpRegistrationSuccess = ({ isVisible }) => {

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
