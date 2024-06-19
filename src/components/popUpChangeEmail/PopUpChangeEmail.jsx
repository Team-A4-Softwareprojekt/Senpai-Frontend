import React, { useContext, useState } from 'react';
import styles from './PopUpChangeEmail.module.css';
import { PlayerContext } from "../../context/playerContext.jsx";

const PopUpChangeEmail = ({ closePopUp, isVisible }) => {
    const { playerData, setPlayerData } = useContext(PlayerContext);
    const [newEmail, setNewEmail] = useState('');
    const [confirmEmail, setConfirmEmail] = useState('');
    const [error, setError] = useState('');

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

        // Update playerData email
        setPlayerData({ ...playerData, email: newEmail });
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
