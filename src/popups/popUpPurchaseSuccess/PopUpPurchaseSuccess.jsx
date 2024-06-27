import React, { useEffect } from 'react';
import styles from './PopUpPurchaseSuccess.module.css';

const PopUpPurchaseSuccess = ({ closePopUp, isVisible }) => {
    useEffect(() => {
        if (isVisible) {
            const timer = setTimeout(() => {
                closePopUp();
            }, 5000);
            return () => clearTimeout(timer);
        }
    }, [isVisible, closePopUp]);

    if (!isVisible) return null;

    return (
        <>
            <div className={styles.overlay}></div>
            <div className={styles.popupContainer}>
                <div className={styles.popupContent}>
                    <h2 className={styles.popupHeader}>Vielen Dank für deinen Einkauf</h2>
                    <p>Wir wünschen dir viel Spaß mit der Premium-Mitgliedschaft!</p>
                </div>
            </div>
        </>
    );
};

export default PopUpPurchaseSuccess;
