import React from 'react';
import styles from './PopUpMissingContent.module.css';
import missingContentImg from '../../assets/missingContent.png';

const PopUpMissingContent = ({ closePopUp, isVisible }) => {

    if (!isVisible) return null;

    return (
        <>
            <div className={styles.overlay}></div>
            <div className={styles.popupContainer}>
                <div className={styles.popupContent}>
                    <div className={styles.popupHeader}>Wir arbeiten zurzeit fleißig an diesem Inhalt. Bitte sei geduldig wie ein Zen-Meister {":-)"}</div>
                    <img className={styles.img}src={missingContentImg} alt="Missing Content" />
                    <button className={styles.closeButton} onClick={closePopUp}>Schließen</button>
                </div>
            </div>
        </>
    );
};

export default PopUpMissingContent;
