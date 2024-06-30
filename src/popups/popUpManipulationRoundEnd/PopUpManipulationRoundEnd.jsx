import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './PopUpManipulationRoundEnd.module.css';

const PopUpManipulationRoundEnd = ({ player1, player2, isVisible, hasFoundErrorP1, hasFoundErrorP2, onClose  }) => {
    const navigate = useNavigate();

    if (!isVisible) {
        return null;
    }

    const handleClose = () => {
        onClose();
        navigate('/codebattle/manipulation/player1');
    };

    return (
        <div className={styles.popup}>
            <div className={styles.content}>
                <p className={styles.infoText}>{hasFoundErrorP1 ? `Bei ${player1} hat der Code erfolgreich kompiliert.` : `Bei ${player1} war die Kompilierung des Codes fehlerhaft.`}</p>
                <p className={styles.infoText}>{hasFoundErrorP2 ? `Bei ${player2} hat der Code erfolgreich kompiliert.` : `Bei ${player2} war die Kompilierung des Codes fehlerhaft.`}</p>
                <div className={styles.buttonContainer}>
                    <button className={styles.confirmButton} onClick={handleClose}>Bestätigen</button>
                </div>
            </div>
        </div>
    );
};

export default PopUpManipulationRoundEnd;