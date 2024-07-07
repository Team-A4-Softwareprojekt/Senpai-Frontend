import React from 'react';
import styles from './PopUpPurchaseFailure.module.css';

/**
 * PopUpPurchaseFailure Component
 * 
 * This component renders a popup that informs the user they do not have enough credit to make a purchase.
 * It includes options to add credit and a button to close the popup.
 * 
 * Props:
 * - `closePopUp`: Function to close the popup.
 * - `isVisible`: Boolean indicating if the popup is visible or not.
 * - `addCredit`: Function to add credit to the user's account.
 */
const PopUpPurchaseFailure = ({ closePopUp, isVisible, addCredit }) => {

    // Return null if the popup is not visible
    if (!isVisible) return null;

    // Handler function to add specific amount of credit
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
