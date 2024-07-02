import React from 'react';
import styles from './PopUpPurchaseFailure.module.css';

const PopUpPurchaseFailure = ({ closePopUp, isVisible, addCredit }) => {
    if (!isVisible) return null;

    // Wrapper-Funktion für die Übergabe des Guthabens
    const addCreditHandler = (credit) => () => addCredit(credit);

    return (
        <>
            <div className={styles.overlay}></div>
            <div className={styles.popupContainer}>
                <div className={styles.popupContent}>
                    <h2 className={styles.popupHeader}>Leider reicht dein derzeitiges Guthaben nicht aus.</h2>
                    <div className={styles.chargeCreditBox}>
                        <div className={styles.chargeCreditText}>
                            Guthaben kaufen:
                        </div>
                        <button className={styles.addButton} onClick={addCreditHandler(5)}>5 Euro</button>
                        <button className={styles.addButton} onClick={addCreditHandler(10)}>10 Euro</button>
                        <button className={styles.addButton} onClick={addCreditHandler(20)}>20 Euro</button>
                        <button className={styles.addButton} onClick={addCreditHandler(50)}>50 Euro</button>
                    </div>
                    <button className={styles.closeButton} onClick={closePopUp}>Schließen</button>
                </div>
            </div>
        </>
    );
};

export default PopUpPurchaseFailure;
