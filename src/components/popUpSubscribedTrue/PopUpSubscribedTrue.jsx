import React, { useContext } from 'react';
import styles from './PopUpSubscribedTrue.module.css';
import { PlayerContext } from "../../context/playerContext.jsx";

const PopUpSubscribedTrue = ({ closePopUp, isVisible }) => {
    const { playerData } = useContext(PlayerContext);

    if (!isVisible) return null;

    const today = new Date();
    const subEndDate = new Date(playerData.subenddate);
    const remainingTime = Math.ceil((subEndDate - today) / (1000 * 60 * 60 * 24));

    return (
        <>
            <div className={styles.overlay}></div>
            <div className={styles.popupContainer}>
                <div className={styles.popupContent}>
                    <h2 className={styles.popupHeader}>Du hast bereits Premium {":-)"}</h2>
                    <p>Verbleibende Restlaufzeit: <strong>{remainingTime}</strong> {remainingTime === 1 ? 'Tag' : 'Tage'}</p>
                    <button className={styles.closeButton} onClick={closePopUp}>Close</button>
                </div>
            </div>
        </>
    );
};

export default PopUpSubscribedTrue;
