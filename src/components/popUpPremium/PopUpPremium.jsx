import React from 'react';
import styles from './PopUpPremium.module.css';

const PopUpPremium = ({ closePopUp, isVisible }) => {
    if (!isVisible) return null;

    return (
    <div className={styles.popupContainer}>
      <div className={styles.popupContent}>
        <h2 className={styles.popupHeader}>Werde Premium-Mitglied!</h2>
        <div className={styles.popupBody}>
          Mit dem Erwerb der Premium-Mitgliedschaft profitierst du von exklusiven Vorteilen!
          <ul className={styles.benefitsList}>
            <li>Unbegrenzte Herzen: Nie wieder warten - erhalte unbeschränkten Zugang.</li>
            <li>Kostenloser Testzugang: Du darfst unser zukünftiges Feature "Exercise" für drei Monate kostenlos testen.</li>
          </ul>
        </div>
        <button className={styles.popupButton} onClick={closePopUp}>Schließen</button>
      </div>
    </div>
  );
};

export default PopUpPremium;
