import React, { useContext } from 'react';
import styles from './PopUpSubscribedTrue.module.css';
import { PlayerContext } from "../../context/playerContext.jsx";
import {URL} from "../../../url.js";

/**
 * PopUpSubscribedTrue Component
 * 
 * This component renders a popup that informs the user they already have a premium subscription.
 * It displays the remaining time of the subscription and provides an option to cancel it.
 * 
 * Props:
 * - `closePopUp`: Function to close the popup.
 * - `isVisible`: Boolean indicating if the popup is visible or not.
 */
const PopUpSubscribedTrue = ({ closePopUp, isVisible }) => {
    const { playerData } = useContext(PlayerContext);
    const url = URL + '/cancelSubscription'

    // Return null if the popup is not visible
    if (!isVisible) return null;

    // Calculate the remaining time of the subscription in days
    const today = new Date();
    const subEndDate = new Date(playerData.subenddate);
    const remainingTime = Math.ceil((subEndDate - today) / (1000 * 60 * 60 * 24));

    // Handle confirmation of subscription cancellation
    const handleConfirmCancel = () => {
        let playerName = playerData.playername;

        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({playerName, playerData})
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                console.log(data.message);
                if(data.success === true) {
                    closePopUp();
                }
            });
    };

    return (
        <>
            <div className={styles.overlay}></div>
            <div className={styles.popupContainer}>
                <div className={styles.popupContent}>
                    <div className={styles.popupHeader}>Du hast bereits Premium {":-)"}</div>
                        <div className={styles.cancelBox}>  
                            <div className={styles.p}>Verbleibende Restlaufzeit: <strong>{remainingTime}</strong> {remainingTime === 1 ? 'Tag' : 'Tage'}</div>
                            <button className={styles.cancelButton} onClick={handleConfirmCancel}>Abo beenden</button>
                        </div> 
                    <button className={styles.closeButton} onClick={closePopUp}>Schließen</button>
                </div>
            </div>
        </>
    );
};

export default PopUpSubscribedTrue;
