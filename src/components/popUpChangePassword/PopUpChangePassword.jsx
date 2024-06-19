import React, { useContext, useState } from 'react';
import styles from './PopUpChangePassword.module.css';
import { PlayerContext } from "../../context/playerContext.jsx";
import PasswordEyeClosed from '../../assets/passwordEyeClosed.png';
import PasswordEyeOpen from '../../assets/passwordEyeOpen.png';

const PopUpChangePassword = ({ closePopUp, isVisible }) => {
    const { playerData, setPlayerData } = useContext(PlayerContext);
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    if (!isVisible) return null;

    const handleConfirm = () => {
        const passwordRules = [
            { regex: /.{8,}/, message: 'Das Passwort muss mindestens 8 Zeichen lang sein!' },
            { regex: /[A-Z]/, message: 'Das Passwort muss mindestens einen Großbuchstaben enthalten!' },
            { regex: /[a-z]/, message: 'Das Passwort muss mindestens einen Kleinbuchstaben enthalten!' },
            { regex: /[0-9]/, message: 'Das Passwort muss mindestens eine Zahl enthalten!' },
            { regex: /[@$!%*?&]/, message: 'Das Passwort muss mindestens ein Sonderzeichen (@, $, !, %, *, ?, &) enthalten!' },
        ];

        for (const rule of passwordRules) {
            if (!rule.regex.test(newPassword)) {
                setMessage(rule.message);
                return;
            }
        }

        if (newPassword !== confirmPassword) {
            setMessage('Die Passwörter stimmen nicht überein!');
            return;
        }

        // Update playerData password
        setPlayerData({ ...playerData, playerpassword: newPassword });
        setMessage('Dein Passwort wurde erfolgreich geändert.');
    };

    const togglePasswordVisibility = () => {
        setIsPasswordVisible(!isPasswordVisible);
    };

    const handleClose = () => {
        setNewPassword('');
        setConfirmPassword('');
        setMessage('');
        setIsPasswordVisible(false);
        closePopUp();
    };

    return (
        <>
            <div className={styles.overlay}></div>
            <div className={styles.popupContainer}>
                <div className={styles.popupContent}>
                    <h2 className={styles.popupHeader}>Passwort ändern: </h2>
                    <div className={`${styles.changePasswordBox} ${message.includes('erfolgreich') ? styles.disabled : ''}`}>
                        <div className={styles.inputGroup}>
                            <div className={styles.labelText}>
                                Neues Passwort eingeben:
                            </div>
                            <div className={styles.passwordInputContainer}>
                                <input
                                    type={isPasswordVisible ? "text" : "password"}
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                    maxLength="70"
                                />
                                <img
                                    src={isPasswordVisible ? PasswordEyeOpen : PasswordEyeClosed}
                                    alt="Toggle visibility"
                                    className={isPasswordVisible ? styles.passwordOpenEyeIcon : styles.passwordClosedEyeIcon}
                                    onClick={togglePasswordVisibility}
                                />
                            </div>
                        </div>
                        <div className={styles.inputGroup}>
                            <div className={styles.labelText}>
                                Neues Passwort bestätigen:
                            </div>
                            <div className={styles.passwordInputContainer}>
                                <input
                                    type={isPasswordVisible ? "text" : "password"}
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    maxLength="70"
                                />
                                <img
                                    src={isPasswordVisible ? PasswordEyeOpen : PasswordEyeClosed}
                                    alt="Toggle visibility"
                                    className={isPasswordVisible ? styles.passwordOpenEyeIcon : styles.passwordClosedEyeIcon}
                                    onClick={togglePasswordVisibility}
                                />
                            </div>
                        </div>
                        <button className={styles.confirmButton} onClick={handleConfirm}>Confirm</button>
                    </div>
                    {message && <p className={message.includes('erfolgreich') ? styles.success : styles.error}>{message}</p>}
                    <button className={styles.closeButton} onClick={handleClose}>Close</button>
                </div>
            </div>
        </>
    );
};

export default PopUpChangePassword;
