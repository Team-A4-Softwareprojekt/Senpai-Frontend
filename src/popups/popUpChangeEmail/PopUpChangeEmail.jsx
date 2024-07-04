import React, {useContext, useState} from 'react';
import styles from './PopUpChangeEmail.module.css';
import {PlayerContext} from "../../context/playerContext.jsx";
import {URL} from "../../../url.js";

/**
 * PopUpChangeEmail Component
 * 
 * This component renders a popup that allows the user to change their email address.
 * It includes input fields for the new email and its confirmation, and displays messages based on the success or error of the operation.
 * 
 * Props:
 * - `closePopUp`: Function to close the popup.
 * - `isVisible`: Boolean indicating if the popup is visible or not.
 */
const PopUpChangeEmail = ({closePopUp, isVisible}) => {
    const {playerData, setPlayerData} = useContext(PlayerContext);
    const [newEmail, setNewEmail] = useState('');
    const [confirmEmail, setConfirmEmail] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const url = URL + '/changeEmail'

    // Return null if the popup is not visible
    if (!isVisible) return null;

    // Handle confirmation of email change
    const handleConfirm = () => {
        setMessage('');
        setError('');
        
        // Validate email format
        if (!newEmail.includes('@')) {
            setError('Die E-Mail muss ein @-Zeichen beinhalten!');
            return;
        }

        // Check if the emails match
        if (newEmail !== confirmEmail) {
            setError('Die E-Mails stimmen nicht überein!');
            return;
        }

        let playerName = playerData.playername;

        // Send request to change the email
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({playerName, newEmail})
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                console.log('Response from server after Email change:', data);

                // Handle successful email change
                if(data.success == true) {
                    setPlayerData({...playerData, email: newEmail});
                    setMessage('Deine E-Mail wurde erfolgreich geändert.');
                }
                console.log(data.message);
            });
    };

    // Handle closing of the popup
    const handleClose = () => {
        setNewEmail('');
        setConfirmEmail('');
        setMessage('');
        setError('');
        closePopUp();
    };

    return (
        <>
            <div className={styles.overlay}></div>
            <div className={styles.popupContainer}>
                <div className={styles.popupContent}>
                    <h2 className={styles.popupHeader}>E-Mail ändern: </h2>
                    <div className={`${styles.changeEmailBox} ${message.includes('erfolgreich') ? styles.disabled : ''}`}>
                        <div className={styles.inputGroup}>
                            <div className={styles.labelText}>
                                Neue E-Mail eingeben:
                            </div>
                            <input
                                type="email"
                                value={newEmail}
                                onChange={(e) => setNewEmail(e.target.value)}
                                maxLength="100"
                            />
                        </div>
                        <div className={styles.inputGroup}>
                            <div className={styles.labelText}>
                                Neue E-Mail bestätigen:
                            </div>
                            <input
                                type="email"
                                value={confirmEmail}
                                onChange={(e) => setConfirmEmail(e.target.value)}
                                maxLength="100"
                            />
                        </div>
                        <button className={styles.confirmButton} onClick={handleConfirm}>Bestätigen</button>
                    </div>
                    {message && <p className={styles.success}>{message}</p>}
                    {error && <p className={styles.error}>{error}</p>}
                    <button className={styles.closeButton} onClick={handleClose}>Schließen</button>
                </div>
            </div>
        </>
    );
};

export default PopUpChangeEmail;
