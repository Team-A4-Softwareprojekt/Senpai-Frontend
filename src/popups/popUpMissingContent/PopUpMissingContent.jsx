import React from 'react';
import styles from './PopUpMissingContent.module.css';
import missingContentImg from '../../assets/missingContent.png';

/**
 * PopUpMissingContent Component
 * 
 * This component renders a popup that informs the user that the content is currently being developed.
 * It includes an image and a button to close the popup.
 * 
 * Props:
 * - `closePopUp`: Function to close the popup.
 * - `isVisible`: Boolean indicating if the popup is visible or not.
 */
const PopUpMissingContent = ({ closePopUp, isVisible }) => {

    // Return null if the popup is not visible
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
