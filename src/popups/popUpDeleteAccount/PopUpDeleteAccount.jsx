//DELETEACCOUNT

import React, {useContext} from 'react';
import styles from './PopUpDeleteAccount.module.css';
import {URL} from '../../../url.js';
import { useNavigate } from 'react-router-dom';
import {PlayerContext} from "../../context/playerContext.jsx";

const PopUpDeleteAccount = ({ closePopUp, isVisible }) => {
    if (!isVisible) return null;

    const url = URL + '/deleteAccount';
    const navigate = useNavigate();
    const { playerName} = useContext(PlayerContext);

    const handleConfirm = () => {

        return fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ playerName })
        })
            .then(response => {
                if (!response.ok) {
                    console.log(response)
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                console.log('Response from server:', data);
                navigate('/');
            })
            .catch(error => {
                console.error('There was a problem with the fetch operation:', error);
            });
    };

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
                        <button className={styles.confirmButton}  onClick={handleConfirm}>Bestätigen</button>
                    </div>
                    <button className={styles.closeButton} onClick={closePopUp}>Schließen</button>
                </div>
            </div>
        </>
    );
};

export default PopUpDeleteAccount;