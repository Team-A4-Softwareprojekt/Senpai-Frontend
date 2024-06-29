import React, { useEffect } from 'react';
import styles from './PopUpPurchaseSuccess.module.css';

const PopUpPurchaseSuccess = ({ closePopUp, isVisible }) => {
    useEffect(() => {
        if (isVisible) {
            const timer = setTimeout(() => {
                closePopUp();
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [isVisible, closePopUp]);

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
