import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './PopUpManipulationRoundEnd.module.css';

/**
 * PopUpManipulationRoundEnd Component
 * 
 * This component renders a popup that displays the results of a manipulation round, indicating whether the code compiled successfully for each player.
 * It includes a button to confirm and close the popup, navigating to the next page.
 * 
 * Props:
 * - `player1`: The name of the first player.
 * - `player2`: The name of the second player.
 * - `isVisible`: Boolean indicating if the popup is visible or not.
 * - `hasFoundErrorP1`: Boolean indicating if player1's code compiled successfully.
 * - `hasFoundErrorP2`: Boolean indicating if player2's code compiled successfully.
 * - `onClose`: Function to close the popup.
 */
const PopUpManipulationRoundEnd = ({ player1, player2, isVisible, hasFoundErrorP1, hasFoundErrorP2, onClose  }) => {
    const navigate = useNavigate();

    // Return null if the popup is not visible
    if (!isVisible) {
        return null;
    }

    // Handle closing of the popup and navigate to the next page
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