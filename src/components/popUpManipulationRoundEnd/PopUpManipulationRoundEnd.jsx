import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './PopUpManipulationRoundEnd.module.css';

const PopUpManipulationRoundEnd = ({ player1, player2, isVisible, hasFoundErrorP1, hasFoundErrorP2 }) => {
    const navigate = useNavigate();

    if (!isVisible) {
        return null;
    }

    const handleClose = () => {
        navigate('/codebattle/manipulation/player1');
    };

    return (
        <div className={styles.popup}>
            <div className={styles.content}>
                <div className={styles.players}>
                    <span className={styles.player}>{player1}</span>
                    <span className={styles.player}>{player2}</span>
                </div>
                <div className={styles.errors}>
                    <p>{hasFoundErrorP1 ? 'Player 1: Fehler gefunden' : 'Player 1: Fehler nicht gefunden'}</p>
                    <p>{hasFoundErrorP2 ? 'Player 2: Fehler gefunden' : 'Player 2: Fehler nicht gefunden'}</p>
                </div>
                <button className={styles.closeButton} onClick={handleClose}>Schließen</button>
            </div>
        </div>
    );
};

export default PopUpManipulationRoundEnd;