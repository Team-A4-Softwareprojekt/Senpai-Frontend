import React from 'react';
import styles from './PopUpRoundWinner.module.css';

const PopUpRoundWinner = ({ winner, isVisible, solution }) => {
  if (!isVisible) {
    return null;
  }

  return (
    <>
      <div className={styles.overlay} />
      <div className={styles.popup}>
        {winner === 'unentschieden' ? (
          <>
            <p>Nobody has answered correctly!</p>
            <p>The correct answer was: <span className={styles.solution}>{solution}</span></p>
          </>
        ) : (
          <>
            <p><span className={styles.winner}>{winner}</span> has won this round!</p>
            <p>The correct answer was: <span className={styles.solution}>{solution}</span></p>
          </>
        )}
      </div>
    </>
  );
};

export default PopUpRoundWinner;
