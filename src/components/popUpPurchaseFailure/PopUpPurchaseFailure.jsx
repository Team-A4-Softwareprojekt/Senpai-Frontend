import React from 'react';
import styles from './PopUpPurchaseFailure.module.css';

const PopUpPurchaseFailure = ({ closePopUp, isVisible, addCredit }) => {
    if (!isVisible) return null;

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
                        <button className={styles.addButton} onClick={addCredit}>5 Euro</button>
                    </div>
                    <button className={styles.closeButton} onClick={closePopUp}>Close</button>
                </div>
            </div>
        </>
    );
};

export default PopUpPurchaseFailure;
