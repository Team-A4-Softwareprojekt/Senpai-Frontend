import React from 'react';
import styles from './PopUpRoundWinner.module.css';

const PopUpRoundWinner = ({ winner, isVisible, solution }) => {
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
