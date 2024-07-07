import React from 'react';
import styles from './PopUpRoundWinner.module.css';

/**
 * PopUpRoundWinner Component
 * 
 * This component renders a popup that displays the winner of the round and the correct solution.
 * It handles both the cases when there is a winner and when the round ends in a tie.
 * 
 * Props:
 * - `winner`: The name of the round winner or 'unentschieden' if it's a tie.
 * - `isVisible`: Boolean indicating if the popup is visible or not.
 * - `solution`: The correct solution for the round.
 */
const PopUpRoundWinner = ({ winner, isVisible, solution }) => {

  // Return null if the popup is not visible
  if (!isVisible) {
    return null;
  }

  return (
    <>   
      <div className={styles.popup}>
        {winner === 'unentschieden' ? (
          <>
            <p className={styles.p}>Keiner hat richtig geantwortet!</p>
            <p className={styles.p}>Die richtige Antwort war: <span className={styles.solution}>{solution}</span></p>
          </>
        ) : (
          <>
            <p className={styles.p}><span className={styles.winner}>{winner}</span> hat die Runde gewonnen!</p>
            <p className={styles.p}>Die richtige Antwort war: <span className={styles.solution}>{solution}</span></p>
          </>
        )}
      </div>
    </>
  );
};

export default PopUpRoundWinner;
