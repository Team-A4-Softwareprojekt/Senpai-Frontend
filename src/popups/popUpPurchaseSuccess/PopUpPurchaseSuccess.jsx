import React, { useEffect } from 'react';
import styles from './PopUpPurchaseSuccess.module.css';

/**
 * PopUpPurchaseSuccess Component
 * 
 * This component renders a popup that informs the user their purchase was successful.
 * It automatically closes after 3 seconds.
 * 
 * Props:
 * - `closePopUp`: Function to close the popup.
 * - `isVisible`: Boolean indicating if the popup is visible or not.
 */
const PopUpPurchaseSuccess = ({ closePopUp, isVisible }) => {

    // UseEffect hook to set a timer that closes the popup after 3 seconds if it is visible
    useEffect(() => {
        if (isVisible) {
            const timer = setTimeout(() => {
                closePopUp();
            }, 3000);
            // Cleanup the timer when the component unmounts or dependencies change
            return () => clearTimeout(timer);
        }
    }, [isVisible, closePopUp]);

    // Return null if the popup is not visible
    if (!isVisible) return null;

    return (
        <>
            <div className={styles.overlay}></div>
            <div className={styles.popupContainer}>
                <div className={styles.popupContent}>
                    <div className={styles.popupHeader}>Vielen Dank für deinen Einkauf</div>
                    <p className={styles.p}>Wir wünschen dir viel Spaß mit der Premium-Mitgliedschaft!</p>
                </div>
            </div>
        </>
    );
};

export default PopUpPurchaseSuccess;
