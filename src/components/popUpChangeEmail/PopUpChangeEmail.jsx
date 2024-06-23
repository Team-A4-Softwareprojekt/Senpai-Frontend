import React, {useContext, useState} from 'react';
import styles from './PopUpChangeEmail.module.css';
import {PlayerContext} from "../../context/playerContext.jsx";
import {URL} from "../../../url.js";

const PopUpChangeEmail = ({closePopUp, isVisible}) => {
    const {playerData, setPlayerData} = useContext(PlayerContext);
    const [newEmail, setNewEmail] = useState('');
    const [confirmEmail, setConfirmEmail] = useState('');
    const [error, setError] = useState('');
    const url = URL + '/changeEmail'

    if (!isVisible) return null;

    const handleConfirm = () => {
        if (!newEmail.includes('@')) {
            setError('Die E-Mail muss ein @-Zeichen beinhalten!');
            return;
        }

        if (newEmail !== confirmEmail) {
            setError('Die E-Mails stimmen nicht überein!');
            return;
        }

        let playerName = playerData.playername;

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

                if(data.success == true) {
                    // Update playerData email
                    setPlayerData({...playerData, email: newEmail});
                }
                console.log(data.message);
                //data.message kann als erfolgs meldung im popup verwendet werden 'email updated successfully'
            });

        closePopUp();
    };

    return (
        <>
            <div className={styles.overlay}></div>
            <div className={styles.popupContainer}>
                <div className={styles.popupContent}>
                    <h2 className={styles.popupHeader}>E-Mail ändern: </h2>
                    <div className={styles.changeEmailBox}>
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
                        <button className={styles.confirmButton} onClick={handleConfirm}>Confirm</button>
                    </div>
                    {error && <p className={styles.error}>{error}</p>}
                    <button className={styles.closeButton} onClick={closePopUp}>Close</button>
                </div>
            </div>
        </>
    );
};

export default PopUpChangeEmail;
