import React from 'react';
import styles from './PopUpDeleteAccount.module.css';

const PopUpDeleteAccount = ({ closePopUp, isVisible }) => {
    if (!isVisible) return null;

    return (
        <>
            <div className={styles.overlay}></div>
            <div className={styles.popupContainer}>
                <div className={styles.popupContent}>
                    <h2 className={styles.popupHeader}>Account löschen</h2>
                    <div className={styles.deleteAccountBox}>
                        <div className={styles.deleteAccountText}>
                            Bist du dir wirklich sicher?
                        </div>
                        <button className={styles.confirmButton}>Bestätigen</button>
                    </div>
                    <button className={styles.closeButton} onClick={closePopUp}>Schließen</button>
                </div>
            </div>
        </>
    );
};

export default PopUpDeleteAccount;
