import React from 'react';
import styles2 from './PopUpQueue.module.css';

const PopUpQueue = ({ isVisible, selectedGameMode, closePopup }) => {
    if (!isVisible) return null;

    return (
        <>
            <div className={styles2.overlay} />
            <div className={styles2.popup}>
                <div className={styles2.popupContent}>
                    <h2>Gamemode:&nbsp;<span className={styles2.highlighted}>{selectedGameMode}</span></h2>
                    <h2>Waiting for another player...</h2>
                    <button onClick={closePopup}>Cancel</button>
                </div>
            </div>
        </>
    );
};

export default PopUpQueue;
